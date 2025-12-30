import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TaskBoard } from "@/components/dashboard/task-board"

export default async function TasksPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch user's teams with projects and tasks
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
              creator: true,
              assignees: {
                include: {
                  user: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <p className="text-muted-foreground">
          Manage and organize your tasks across all projects
        </p>
      </div>

      <TaskBoard teams={teams} userId={session.user.id} />
    </div>
  )
}
