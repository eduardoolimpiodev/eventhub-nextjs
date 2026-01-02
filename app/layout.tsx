import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'EventHub - Descubra eventos incríveis',
  description: 'Descubra eventos incríveis perto de você. Shows, festivais, esportes e muito mais.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-[70px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
