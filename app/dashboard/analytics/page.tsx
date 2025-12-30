import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts"

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch analytics data
  const teams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      projects: {
        include: {
          tasks: {
            include: {
              assignees: true,
            },
          },
        },
      },
    },
  })

  const allTasks = teams.flatMap((team) =>
    team.projects.flatMap((project) => project.tasks)
  )

  // Calculate analytics
  const tasksByStatus = {
    todo: allTasks.filter((t) => t.status === "todo").length,
    in_progress: allTasks.filter((t) => t.status === "in_progress").length,
    review: allTasks.filter((t) => t.status === "review").length,
    done: allTasks.filter((t) => t.status === "done").length,
  }

  const tasksByPriority = {
    low: allTasks.filter((t) => t.priority === "low").length,
    medium: allTasks.filter((t) => t.priority === "medium").length,
    high: allTasks.filter((t) => t.priority === "high").length,
    urgent: allTasks.filter((t) => t.priority === "urgent").length,
  }

  // Tasks completed over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  const completionTrend = last7Days.map((date) => ({
    date,
    completed: allTasks.filter((t) => {
      if (t.status !== "done" || !t.updatedAt) return false
      const taskDate = new Date(t.updatedAt).toISOString().split("T")[0]
      return taskDate === date
    }).length,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Track your team&apos;s productivity and progress
        </p>
      </div>

      <AnalyticsCharts
        tasksByStatus={tasksByStatus}
        tasksByPriority={tasksByPriority}
        completionTrend={completionTrend}
      />
    </div>
  )
}
