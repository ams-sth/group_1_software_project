import { Link } from 'react-router-dom'

function GroupsPage() {
  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-(--text-h)">Your spending groups</h1>
        <div className="flex gap-4 text-sm">
          <Link to="/home" className="text-(--accent) hover:underline">
            Home
          </Link>
          <Link to="/profile" className="text-(--accent) hover:underline">
            Profile
          </Link>
        </div>
      </div>
      <p className="mt-1 text-(--text)">Placeholder — the groups list screen isn't built yet.</p>
    </main>
  )
}

export default GroupsPage
