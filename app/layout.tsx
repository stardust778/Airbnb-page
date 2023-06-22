import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Modal 
            isOpen
            title='Hello world'
            actionLabel='Submit'
          />
          <Navbar />
        </ClientOnly>
        { children }
      </body>
    </html>
  )
}
