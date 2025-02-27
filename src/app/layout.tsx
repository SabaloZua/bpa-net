'use client';
import { Toaster } from "sonner";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";

export default function RootLayout({
  children
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
        <NextUIProvider>
        {children}
        </NextUIProvider>
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
