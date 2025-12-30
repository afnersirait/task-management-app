import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/dashboard/project-detail"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Fetch project details
  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      team: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
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
  })

  if (!project) {
    notFound()
  }

  // Check if user is a member of the team
  const isMember = project.team.members.some(
    (member) => member.userId === session.user.id
  )

  if (!isMember) {
    notFound()
  }

  return <ProjectDetail project={project} userId={session.user.id} />
}
