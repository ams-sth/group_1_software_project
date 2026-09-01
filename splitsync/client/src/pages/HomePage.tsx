import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-(--text-h)">Welcome back</h1>
        <p className="text-sm text-(--text)">Here's where you left off.</p>
      </div>

      <div className="grid w-full max-w-90 grid-cols-2 gap-3">
        <Link
          to="/groups"
          className="flex flex-col gap-1 rounded-lg border p-4 border-(--border) bg-(--surface) hover:border-(--accent-border)"
        >
          <span className="text-sm font-semibold text-(--text-h)">Groups</span>
          <span className="text-xs text-(--text)">View your spending groups</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col gap-1 rounded-lg border p-4 border-(--border) bg-(--surface) hover:border-(--accent-border)"
        >
          <span className="text-sm font-semibold text-(--text-h)">Profile</span>
          <span className="text-xs text-(--text)">Account and notifications</span>
        </Link>
      </div>
    </main>
  )
}

export default HomePage
