import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { addMember, ApiError, createGroup, joinGroup, listGroups, type GroupResponse } from '../lib/api'
import { getCurrentUser } from '../lib/session'

function GroupsPage() {
  const currentUsername = getCurrentUser()?.username

  const [groups, setGroups] = useState<GroupResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [newGroupName, setNewGroupName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const [joinGroupId, setJoinGroupId] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  useEffect(() => {
    listGroups()
      .then(setGroups)
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : 'Could not load groups.'))
      .finally(() => setIsLoading(false))
  }, [])

  function upsertGroup(group: GroupResponse) {
    setGroups((current) => {
      const exists = current.some((g) => g.id === group.id)
      return exists ? current.map((g) => (g.id === group.id ? group : g)) : [...current, group]
    })
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCreateError(null)
    setIsCreating(true)
    try {
      const group = await createGroup(newGroupName)
      upsertGroup(group)
      setNewGroupName('')
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : 'Could not create group.')
    } finally {
      setIsCreating(false)
    }
  }

  async function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setJoinError(null)
    setIsJoining(true)
    try {
      const group = await joinGroup(joinGroupId.trim())
      upsertGroup(group)
      setJoinGroupId('')
    } catch (err) {
      setJoinError(err instanceof ApiError ? err.message : 'Could not join group.')
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
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

      <form onSubmit={handleCreate} className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="e.g. Flat 4B"
          required
          value={newGroupName}
          onChange={(event) => setNewGroupName(event.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm bg-(--surface) border-(--border) text-(--text-h)"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white bg-(--accent) hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCreating ? 'Creating…' : 'Create group'}
        </button>
      </form>
      {createError && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {createError}
        </p>
      )}

      <form onSubmit={handleJoin} className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Have a group ID? Paste it here to join"
          required
          value={joinGroupId}
          onChange={(event) => setJoinGroupId(event.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm bg-(--surface) border-(--border) text-(--text-h)"
        />
        <button
          type="submit"
          disabled={isJoining}
          className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold border-(--border) text-(--text-h) hover:border-(--accent-border) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isJoining ? 'Joining…' : 'Join group'}
        </button>
      </form>
      {joinError && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {joinError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {isLoading && <p className="text-sm text-(--text)">Loading groups…</p>}
        {loadError && <p className="text-sm text-red-500">{loadError}</p>}
        {!isLoading && !loadError && groups.length === 0 && (
          <p className="text-sm text-(--text)">
            You're not in any groups yet — create one above to get started.
          </p>
        )}
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isCreator={group.creatorUsername === currentUsername}
            onMemberAdded={upsertGroup}
          />
        ))}
      </div>
    </main>
  )
}

function GroupCard({
  group,
  isCreator,
  onMemberAdded,
}: {
  group: GroupResponse
  isCreator: boolean
  onMemberAdded: (group: GroupResponse) => void
}) {
  const [username, setUsername] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  async function handleAddMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAddError(null)
    setIsAdding(true)
    try {
      const updated = await addMember(group.id, username)
      onMemberAdded(updated)
      setUsername('')
    } catch (err) {
      setAddError(err instanceof ApiError ? err.message : 'Could not add that member.')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="rounded-lg border p-4 border-(--border) bg-(--surface)">
      <p className="font-semibold text-(--text-h)">{group.name}</p>
      <p className="text-xs text-(--text)">
        {group.memberUsernames.length} member{group.memberUsernames.length === 1 ? '' : 's'}:{' '}
        {group.memberUsernames.join(', ')}
      </p>
      <p className="mt-1 text-xs text-(--text)">
        Group ID (share to invite): <span className="font-mono">{group.id}</span>
      </p>

      {isCreator && (
        <form onSubmit={handleAddMember} className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Add member by username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="flex-1 rounded-lg border px-2 py-1.5 text-xs bg-(--bg) border-(--border) text-(--text-h)"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-(--accent) hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAdding ? 'Adding…' : 'Add'}
          </button>
        </form>
      )}
      {addError && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {addError}
        </p>
      )}
    </div>
  )
}

export default GroupsPage
