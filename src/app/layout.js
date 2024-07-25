import SessionWrapper from '@/components/SessionWrapper';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionWrapper>
  );
}
