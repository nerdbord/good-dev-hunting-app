export const httpClient = {
  post: async <Payload, ResponseData>(url: string, payload?: Payload) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      return handleResponse<ResponseData>(response)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  get: async <ResponseData>(url: string) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return handleResponse<ResponseData>(response)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  put: async <Payload, ResponseData>(url: string, payload?: Payload) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      return handleResponse<ResponseData>(response)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
}

async function handleResponse<ResponseData>(response: Response) {
  if (response.ok) {
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return (await response.json()) as Promise<ResponseData>
    } else {
      return Promise.reject(await response.text())
    }
  } else {
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const errorData = await response.json()
      return Promise.reject(errorData)
    } else {
      return Promise.reject(await response.text())
    }
  }
}
