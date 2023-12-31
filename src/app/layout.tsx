import './globals.scss'
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import {Barlow, Inter} from 'next/font/google';

const avantGarde = localFont( { src : '../../public/fonts/AvantGarde LT Medium Regular.ttf' } );
const inter = Inter({ subsets: ['latin'] });
const barlow = Barlow({
  weight : [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ],
  style : [ "normal" ],
  subsets : [ "latin" ]
});

export const metadata: Metadata = {
  title: 'ChatApp',
  description: 'Simple chat app UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={barlow.className}>
      <body id='root-layout' >{children}</body>
    </html>
  )
}
