import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { TeamDetail } from "@/components/dashboard/team-detail"

interface TeamPageProps {
  params: {
    teamId: string
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch team details
  const team = await prisma.team.findUnique({
    where: {
      id: params.teamId,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
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
          },
        },
      },
    },
  })

  if (!team) {
    notFound()
  }

  // Check if user is a member of this team
  const isMember = team.members.some(
    (member) => member.userId === session.user.id
  )

  if (!isMember) {
    notFound()
  }

  return <TeamDetail team={team} userId={session.user.id} />
}
