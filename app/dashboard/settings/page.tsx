import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { SettingsForm } from "@/components/dashboard/settings-form"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <SettingsForm user={session.user} />
    </div>
  )
}
