const API_URL = '/api' // Prefixează cererile cu /api

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

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) {
    const errorMessage = await res.text() // Obține mesajul de eroare de la server
    throw new Error(errorMessage || 'Invalid credentials')
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
      Authorization: `Bearer ${token}` // Trimite token-ul în format Bearer
    }
  })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(errorMessage || 'Failed to fetch languages')
  }

  return res.json()
}

export async function fetchLanguageById(id: string, token: string) {
  const res = await fetch(`${API_URL}/programming-languages/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch language details')
  }

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
      Authorization: `Bearer ${token}` // Trimite token-ul în format Bearer
    },
    body: JSON.stringify(language)
  })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(errorMessage || 'Failed to create language')
  }

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
      Authorization: `Bearer ${token}` // Trimite token-ul în format Bearer
    },
    body: JSON.stringify(language)
  })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(errorMessage || 'Failed to update language')
  }

  return res.json()
}

export async function deleteLanguage(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/programming-languages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` // Trimite token-ul în format Bearer
    }
  })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(errorMessage || 'Failed to delete language')
  }
}
