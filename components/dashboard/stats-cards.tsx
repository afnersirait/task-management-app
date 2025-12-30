import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"

interface StatsCardsProps {
  stats: {
    total: number
    todo: number
    inProgress: number
    completed: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
            <ListTodo className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">To Do</CardTitle>
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
            <Circle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.todo}</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <div className="rounded-full bg-orange-100 dark:bg-orange-950 p-2">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.inProgress}</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <div className="rounded-full bg-green-100 dark:bg-green-950 p-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.total > 0
              ? Math.round((stats.completed / stats.total) * 100)
              : 0}
            % completion rate
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
