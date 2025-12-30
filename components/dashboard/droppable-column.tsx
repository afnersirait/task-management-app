"use client"

import { useDroppable } from "@dnd-kit/core"
import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

interface DroppableColumnProps {
  id: string
  children: ReactNode
  className?: string
}

export function DroppableColumn({ id, children, className }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <Card
      ref={setNodeRef}
      className={`${className} transition-all ${
        isOver ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-[1.02]" : ""
      }`}
    >
      {children}
    </Card>
  )
}
