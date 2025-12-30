"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { CreateTaskDialog } from "./create-task-dialog"
import { TaskCard } from "./task-card"
import { TaskDetailDialog } from "./task-detail-dialog"
import { getInitials } from "@/lib/utils"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DraggableTaskCard } from "./draggable-task-card"
import { DroppableColumn } from "./droppable-column"

interface TaskBoardProps {
  teams: any[]
  userId: string
}

const statusColumns = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-100" },
  { id: "review", title: "Review", color: "bg-yellow-100" },
  { id: "done", title: "Done", color: "bg-green-100" },
]

export function TaskBoard({ teams, userId }: TaskBoardProps) {
  const router = useRouter()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [activeTask, setActiveTask] = useState<any | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Get all tasks grouped by status
  const allTasks = teams.flatMap((team) =>
    team.projects.flatMap((project: any) =>
      project.tasks.map((task: any) => ({
        ...task,
        projectName: project.name,
        projectColor: project.color,
      }))
    )
  )

  const tasksByStatus = statusColumns.map((column) => ({
    ...column,
    tasks: allTasks.filter((task: any) => task.status === column.id),
  }))

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = allTasks.find((t: any) => t.id === active.id)
    setActiveTask(task)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id as string
    let newStatus = over.id as string

    // Check if dropped on a column or another task
    const task = allTasks.find((t: any) => t.id === taskId)
    if (!task) return

    // If dropped on another task, get that task's status
    const overTask = allTasks.find((t: any) => t.id === over.id)
    if (overTask) {
      newStatus = overTask.status
    }

    // Check if it's a valid status column
    const validStatuses = statusColumns.map((c) => c.id)
    if (!validStatuses.includes(newStatus)) return

    if (task.status === newStatus) return

    // Optimistically update UI
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update task status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Board</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop tasks to update their status
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tasksByStatus.map((column) => (
            <DroppableColumn key={column.id} id={column.id} className={`dark:bg-card ${column.color} border-t-4`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <span>{column.title}</span>
                  <Badge variant="secondary" className="font-bold">
                    {column.tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 min-h-[300px]">
                <SortableContext
                  items={column.tasks.map((t: any) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.tasks.map((task: any) => (
                    <DraggableTaskCard
                      key={task.id}
                      task={task}
                      onClick={() => {
                        setSelectedTask(task)
                        setIsTaskDetailOpen(true)
                      }}
                    />
                  ))}
                  {column.tasks.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      Drop tasks here
                    </p>
                  )}
                </SortableContext>
              </CardContent>
            </DroppableColumn>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        teams={teams}
        userId={userId}
      />

      {selectedTask && (
        <TaskDetailDialog
          open={isTaskDetailOpen}
          onOpenChange={setIsTaskDetailOpen}
          task={selectedTask}
          userId={userId}
        />
      )}
    </div>
  )
}
