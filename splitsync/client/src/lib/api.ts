import { getToken } from './session'

const API_BASE = '/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const message = body?.message ?? body?.errors?.[0] ?? 'Something went wrong. Please try again.'
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<T>
}

export interface AuthResponse {
  token: string
  username: string
  email: string
}

export function register(email: string, password: string) {
  return request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function login(identifier: string, password: string) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  })
}

export interface GroupResponse {
  id: string
  name: string
  creatorUsername: string
  memberUsernames: string[]
}

export function listGroups() {
  return request<GroupResponse[]>('/groups')
}

export function createGroup(name: string) {
  return request<GroupResponse>('/groups', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}

export function addMember(groupId: string, username: string) {
  return request<GroupResponse>(`/groups/${groupId}/members`, {
    method: 'POST',
    body: JSON.stringify({ username }),
  })
}

export function joinGroup(groupId: string) {
  return request<GroupResponse>(`/groups/${groupId}/join`, {
    method: 'POST',
  })
}
