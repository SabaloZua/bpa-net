"use client";
import { Toaster } from "sonner";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="description" content="Internet Banking Plataform" />
        <title>BPA NET</title>
        <meta name="theme-color" content="#fff" />
        <link rel="shortcut icon" href="/icons/logo_favicon.svg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icons/logo_favicon.svg" />
      </head>
      <body>
        <NextTopLoader
          color="#1A82FF"
          initialPosition={0.08}
          crawlSpeed={1500}
          height={3}
          crawl={false}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #1A82FF,0 0 5px #1A82FF"
        />
        <NextUIProvider>{children}</NextUIProvider>
        <Toaster
          toastOptions={{
            className: "toaster_error",
          }}
          position="top-right"
          closeButton
          duration={5000}
          richColors
          expand={false}
        />
      </body>
    </html>
  );
}
