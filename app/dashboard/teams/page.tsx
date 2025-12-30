import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TeamsList } from "@/components/dashboard/teams-list"

export default async function TeamsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch user's teams
  const teams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      projects: {
        include: {
          tasks: true,
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teams</h1>
        <p className="text-muted-foreground">
          Manage your teams and collaborate with members
        </p>
      </div>

      <TeamsList teams={teams} userId={session.user.id} />
    </div>
  )
}
