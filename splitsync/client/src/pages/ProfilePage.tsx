import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearSession, getCurrentUser } from '../lib/session'

function ProfilePage() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  // Notification preference isn't persisted to the backend yet — local-only for now.
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  function handleSignOut() {
    clearSession()
    navigate('/')
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-90 flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-(--text-h)">Profile</h1>
          <Link to="/home" className="text-sm text-(--accent) hover:underline">
            Back to home
          </Link>
        </div>

        <div className="flex flex-col gap-1 rounded-lg border p-4 border-(--border) bg-(--surface)">
          <span className="text-xs text-(--text)">Username</span>
          <span className="text-sm text-(--text-h)">{user?.username ?? 'Not signed in'}</span>
          <span className="mt-3 text-xs text-(--text)">Email</span>
          <span className="text-sm text-(--text-h)">{user?.email ?? '—'}</span>
        </div>

        <label className="flex items-center justify-between rounded-lg border p-4 border-(--border) bg-(--surface)">
          <div className="flex flex-col">
            <span className="text-sm text-(--text-h)">Email reminders</span>
            <span className="text-xs text-(--text)">
              Sent once daily while you have an unpaid balance.
            </span>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(event) => setNotificationsEnabled(event.target.checked)}
            className="h-5 w-5 accent-(--accent)"
          />
        </label>

        <button
          type="button"
          onClick={handleSignOut}
          className="cursor-pointer rounded-lg border py-2.5 text-sm font-semibold border-(--border) text-(--text-h) hover:border-(--accent-border)"
        >
          Sign out
        </button>
      </div>
    </main>
  )
}

export default ProfilePage
