type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const {
    headers,
    skipAuth = false,
    ...rest
  } = options

  /* ---------------- Request Interceptor ---------------- */
  const finalHeaders = new Headers(headers)

  finalHeaders.set("Content-Type", "application/json")

  if (!skipAuth) {
    // Client-side token
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        finalHeaders.set("Authorization", `Bearer ${token}`)
      }
    }
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}${endpoint}`

  return await fetch(url, {
    ...rest,
    headers: finalHeaders,
  })
}
