import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

type Mode = 'signin' | 'create'

function AuthenticationPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Auth isn't wired up yet — stub navigation to the next screen.
    navigate('/home')
  }

  function handleGoogleContinue() {
    navigate('/home')
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

        <button
          type="button"
          onClick={handleGoogleContinue}
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border py-2.5 text-sm bg-(--surface) border-(--border) text-(--text-h) hover:border-(--accent-border)"
        >
          <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62Z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z"
            />
            <path
              fill="#FBBC05"
              d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-[13px] text-(--text) before:h-px before:flex-1 before:content-[''] before:bg-(--border) after:h-px after:flex-1 after:content-[''] after:bg-(--border)">
          <span>or</span>
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

          <button
            type="submit"
            className="mt-3.5 cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white bg-(--accent) hover:opacity-90"
          >
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-xs text-(--text)">
          SplitSync never stores your password directly — sign-in is handled by your
          chosen provider.
        </p>
      </div>
    </main>
  )
}

export default AuthenticationPage
