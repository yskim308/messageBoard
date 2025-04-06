import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Murakami Message</title>
      <body className="flex justify-center">{children}</body>
    </html>
  );
}
