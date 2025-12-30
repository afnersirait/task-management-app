import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  teamId: z.string(),
  color: z.string().default("#3B82F6"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const data = projectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        teamId: data.teamId,
        color: data.color,
      },
      include: {
        team: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Project creation error:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const teamId = searchParams.get("teamId")

    const projects = await prisma.project.findMany({
      where: teamId ? { teamId } : undefined,
      include: {
        team: true,
        tasks: {
          include: {
            assignees: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Project fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}
