import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BackgroundEffect from "@/components/ui/background-effect"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Sparsh Hospital - Specialized Gynecology Care",
  description:
    "Leading gynecology hospital providing comprehensive women's healthcare services for all ages & stages of women",
  icons: {
    icon: "favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} relative`}>
        <BackgroundEffect />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
