import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const taskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "review", "done"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  dueDate: z.string().nullable().optional(),
})

export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId },
      include: {
        creator: true,
        project: true,
        assignees: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Task fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const data = taskUpdateSchema.parse(body)

    const task = await prisma.task.update({
      where: { id: params.taskId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.priority && { priority: data.priority }),
        ...(data.dueDate !== undefined && {
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        }),
      },
      include: {
        creator: true,
        project: true,
        assignees: {
          include: {
            user: true,
          },
        },
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: "updated",
        content: `Updated task "${task.title}"`,
        userId: session.user.id,
        taskId: task.id,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error("Task update error:", error)
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete related records first
    await prisma.taskAssignment.deleteMany({
      where: { taskId: params.taskId },
    })

    await prisma.comment.deleteMany({
      where: { taskId: params.taskId },
    })

    await prisma.activity.deleteMany({
      where: { taskId: params.taskId },
    })

    // Delete the task
    await prisma.task.delete({
      where: { id: params.taskId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Task delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
}
