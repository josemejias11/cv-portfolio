import localFont from 'next/font/local';
import './globals.css';

const motoSans = localFont({
  src: [
    {
      path: './fonts/MotoSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MotoSans-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={motoSans.className}>{children}</body>
    </html>
  );
}
