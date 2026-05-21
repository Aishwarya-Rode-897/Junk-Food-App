import './globals.css';

export const metadata = {
  title: 'Junk or Not',
  description: 'A beginner-friendly app that checks whether a food is junk food.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
