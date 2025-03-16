import type { AppRouter } from "@/server"
import { createClient } from "jstack"

export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
})

function getBaseUrl() {
  // 👇 In production, use the production worker
  if (process.env.NODE_ENV === "production") {
    return "https://app-name.crypto-manager-react.workers.dev"
  }

  // 👇 Locally, use wrangler backend
  return `http://localhost:8080`
}