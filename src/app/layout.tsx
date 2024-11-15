import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { AppSidebar } from '@/components/app-sidebar'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['vietnamese'], // choose subsets according to your need
  weight: ['400', '500', '700'], // define font weights
})
export const metadata: Metadata = {
  title: 'Shop Thời Trang 6AE',
  description: 'Shop Thời Trang 6AE.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={jetBrainsMono.className}>
        <SidebarProvider>
          <AppSidebar />
          <main className="mx-auto">
            <SidebarTrigger />
            {children}
            <Toaster />
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
