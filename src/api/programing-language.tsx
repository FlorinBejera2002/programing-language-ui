import { IProgrammingLanguage, IProgrammingParadigm } from '../types'

const API_URL = 'http://164.90.166.249:3001'

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
  token: string
}

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch('http://164.90.166.249:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  const data = await res.json()
  console.log('Raw response:', data)
  return data
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
): Promise<IProgrammingLanguage[]> {
  const res = await fetch(`${API_URL}/programming-languages`, {
    headers: {
      Authorization: `Bearer ${token}`
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

export async function fetchLanguagesByKeyword(
  token: string,
  keyword: string,
  sortOrder?: string,
  sortBy?: string
) {
  console.log('Sending request with:', {
    search_keyword: keyword,
    sortBy: sortBy,
    sortOrder: sortOrder
  })

  const res = await fetch(`${API_URL}/programming-languages/search-sort`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      search_keyword: keyword,
      sortBy,
      sortOrder
    })
  })

  const data = await res.json()
  console.log('Filtered languages:', data)
  return data
}

export async function fetchNewLanguage(
  language: IProgrammingLanguage,
  token: string
): Promise<IProgrammingLanguage> {
  const res = await fetch(`${API_URL}/programming-languages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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
  language: {
    name: string
    creator: string
    releaseYear: number
    paradigm: IProgrammingParadigm
    popularity: number
  },

  token: string
): Promise<IProgrammingLanguage> {
  const res = await fetch(`${API_URL}/programming-languages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(errorMessage || 'Failed to delete language')
  }
}

// export async function fetchLanguagesWithPagination(
//   page: number,
//   pageSize: number,
//   token: string
// ) {
//   const res = await fetch(
//     `${API_URL}/programming-languages?page=${page}&pageSize=${pageSize}`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     }
//   )

//   if (!res.ok) {
//     throw new Error(`Error fetching data: ${res.statusText}`)
//   }

//   const data = await res.json()
//   return {
//     items: data.items,
//     totalPages: data.totalPages
//   }
// }
