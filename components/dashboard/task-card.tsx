"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, AlertCircle } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"

interface TaskCardProps {
  task: any
  onClick?: () => void
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card 
      className="cursor-pointer bg-card p-4 transition-all hover:shadow-lg hover:scale-[1.02] border-l-4"
      style={{ borderLeftColor: task.projectColor || "#3B82F6" }}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium">{task.title}</h4>
            {task.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={priorityColors[task.priority as keyof typeof priorityColors]}
          >
            {task.priority}
          </Badge>
          {task.projectName && (
            <Badge
              variant="outline"
              style={{ borderColor: task.projectColor }}
            >
              {task.projectName}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees?.slice(0, 3).map((assignee: any) => (
              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white">
                <AvatarFallback className="text-xs">
                  {getInitials(assignee.user.name || assignee.user.email)}
                </AvatarFallback>
              </Avatar>
            ))}
            {task.assignees?.length > 3 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>

          {task.dueDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
