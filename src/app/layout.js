import SessionWrapper from '@/components/SessionWrapper';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <title>Tio&apos;s Trivia</title>
        <body>{children}</body>
      </html>
    </SessionWrapper>
  );
}
