import type { Metadata } from "next"
import { Providers } from "./components/providers"

import "./globals.css"

import { NavDrawer } from "./components/navigation/nav-drawer"
import { NavBar } from "./components/navigation/nav-bar"

export const metadata: Metadata = {
  title: "Crypto Manager",
  description: "Manage your clients' cryptocurrency portfolios",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="h-full w-full bg-base-200">
        <div className="drawer">
          <input title="Navigation" id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <NavBar />

            {/* Main content */}
            <main className="flex-1 p-6 container mx-auto">
              <Providers>{children}</Providers>
            </main>

            {/* Footer */}
            <footer className="footer footer-center p-4 bg-base-100 text-base-content">
              <div>
                <p>Copyright © 2025 - All rights reserved</p>
              </div>
            </footer>
          </div>

          {/* Drawer side */}
          <NavDrawer />
        </div>
      </body>
    </html>
  )
}
