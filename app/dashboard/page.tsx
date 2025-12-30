import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TaskBoard } from "@/components/dashboard/task-board"
import { StatsCards } from "@/components/dashboard/stats-cards"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch user's teams and projects
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
              assignees: {
                include: {
                  user: true,
                },
              },
              creator: true,
            },
          },
        },
      },
    },
  })

  // Get all tasks for the user
  const allTasks = teams.flatMap((team) =>
    team.projects.flatMap((project) => project.tasks)
  )

  // Calculate stats
  const stats = {
    total: allTasks.length,
    todo: allTasks.filter((t) => t.status === "todo").length,
    inProgress: allTasks.filter((t) => t.status === "in_progress").length,
    completed: allTasks.filter((t) => t.status === "done").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}!
        </p>
      </div>

      <StatsCards stats={stats} />

      <TaskBoard teams={teams} userId={session.user.id} />
    </div>
  )
}
