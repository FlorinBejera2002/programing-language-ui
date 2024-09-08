const API_URL = 'http://164.90.166.249:3001'

export interface ProgrammingLanguage {
  id: string
  name: string
  creator: string
  releaseYear: number
  paradigm: 'object-oriented' | 'functional' | 'procedural' | 'declarative'
  popularity: number
}

export interface User {
  id: number
  username: string
  token: string
}

export interface LoginInput {
  username: string
  password: string
}

export interface LoginResponse {
  user: User
  message: string
}

export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error('Invalid credentials')
  }

  return res.json()
}

export async function logoutUser(token: string): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function fetchLanguages(
  token: string
): Promise<ProgrammingLanguage[]> {
  const res = await fetch(`${API_URL}/programming-languages`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

export async function createLanguage(
  language: ProgrammingLanguage,
  token: string
): Promise<ProgrammingLanguage> {
  const res = await fetch(`${API_URL}/programming-languages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(language)
  })
  return res.json()
}

export async function updateLanguage(
  id: string,
  language: ProgrammingLanguage,
  token: string
): Promise<ProgrammingLanguage> {
  const res = await fetch(`${API_URL}/programming-languages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(language)
  })
  return res.json()
}

export async function deleteLanguage(id: string, token: string): Promise<void> {
  await fetch(`${API_URL}/programming-languages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
