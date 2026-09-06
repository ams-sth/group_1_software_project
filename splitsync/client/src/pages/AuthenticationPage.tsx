import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError, login, register } from '../lib/api'
import { saveSession } from '../lib/session'

type Mode = 'signin' | 'create'

function AuthenticationPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const auth = mode === 'signin'
        ? await login(identifier, password)
        : await register(identifier, password)
      saveSession(auth)
      navigate('/home')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-90 flex-col gap-5">
        <h1 className="text-center text-[28px] font-semibold text-(--text-h)">
          SplitSync
        </h1>

        <div
          className="flex gap-0.75 rounded-lg border p-0.75 border-(--border)"
          role="tablist"
          aria-label="Sign in or create an account"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signin'}
            onClick={() => setMode('signin')}
            className={`flex-1 rounded-md py-2 text-sm cursor-pointer ${mode === 'signin'
                ? 'bg-(--accent) text-white'
                : 'bg-transparent text-(--text)'
              }`}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'create'}
            onClick={() => setMode('create')}
            className={`flex-1 rounded-md py-2 text-sm cursor-pointer ${mode === 'create'
                ? 'bg-(--accent) text-white'
                : 'bg-transparent text-(--text)'
              }`}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
          <label htmlFor="identifier" className="text-[13px] text-(--text-h)">
            {mode === 'signin' ? 'Email or username' : 'Email'}
          </label>
          <input
            id="identifier"
            name="identifier"
            type={mode === 'signin' ? 'text' : 'email'}
            placeholder={mode === 'signin' ? 'you@example.com or username' : 'you@example.com'}
            autoComplete={mode === 'signin' ? 'username' : 'email'}
            required
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            className="rounded-lg border px-3 py-2.5 text-sm bg-(--surface) border-(--border) text-(--text-h) focus:outline-2 focus:outline-offset-1 focus:outline-(--accent-border)"
          />
          {mode === 'create' && (
            <p className="mt-1 text-xs text-(--text)">
              We'll generate a username for you automatically — after that, you can sign
              in with either your email or your username.
            </p>
          )}

          <label htmlFor="password" className="mt-2.5 text-[13px] text-(--text-h)">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border px-3 py-2.5 text-sm bg-(--surface) border-(--border) text-(--text-h) focus:outline-2 focus:outline-offset-1 focus:outline-(--accent-border)"
          />

          {error && (
            <p role="alert" className="mt-1 text-xs text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3.5 cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white bg-(--accent) hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-xs text-(--text)">
          Your password is hashed and never stored in plain text.
        </p>
      </div>
    </main>
  )
}

export default AuthenticationPage
