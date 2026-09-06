import type { AuthResponse } from './api'

const TOKEN_KEY = 'splitsync.token'
const USERNAME_KEY = 'splitsync.username'
const EMAIL_KEY = 'splitsync.email'

export function saveSession(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.token)
  localStorage.setItem(USERNAME_KEY, auth.username)
  localStorage.setItem(EMAIL_KEY, auth.email)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getCurrentUser() {
  const username = localStorage.getItem(USERNAME_KEY)
  const email = localStorage.getItem(EMAIL_KEY)
  if (!username || !email) return null
  return { username, email }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(EMAIL_KEY)
}
