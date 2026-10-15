import './globals.css';
import AppNavigation from '../components/AppNavigation';
import SupabaseSession from '../components/SupabaseSession';

export const metadata = { title: 'Kannada Companion', description: 'Useful Kannada phrases for everyday life.' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SupabaseSession>
          <AppNavigation />
          <main className="app-main">{children}</main>
        </SupabaseSession>
      </body>
    </html>
  );
}
