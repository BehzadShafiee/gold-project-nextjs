
import localFont from 'next/font/local';
import '@/assets/styles/common/common.css';

const yekan = localFont({
  src: '../assets/fonts/Yekan.woff',
  variable: '--font-yekan'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fa">
      <body dir="rtl" className={`${yekan.className} back-white`}>
        {children}
      </body>
    </html>
  );
}
