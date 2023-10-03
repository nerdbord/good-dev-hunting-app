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

      if (response.ok) {
        return (await response.json()) as Promise<ResponseData>
      } else {
        const errorData = await response.json()
        return Promise.reject(errorData)
      }
    } catch (error) {
      console.error(error)
    }
  },
  get: async <ResponseData>(url: string) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        return (await response.json()) as Promise<ResponseData>
      } else {
        const errorData = await response.json()
        return Promise.reject(errorData)
      }
    } catch (error) {
      console.error(error)
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

      if (response.ok) {
        return (await response.json()) as Promise<ResponseData>
      } else {
        const errorData = await response.json()
        return Promise.reject(errorData)
      }
    } catch (error) {
      console.error(error)
    }
  },
}
