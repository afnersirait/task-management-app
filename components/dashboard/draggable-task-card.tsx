"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskCard } from "./task-card"
import { useDroppable } from "@dnd-kit/core"

interface DraggableTaskCardProps {
  task: any
  onClick?: () => void
}

export function DraggableTaskCard({ task, onClick }: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: task.status,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Only trigger onClick if not dragging
        if (!isDragging && onClick) {
          onClick()
        }
      }}
    >
      <TaskCard task={task} />
    </div>
  )
}
