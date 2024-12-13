import type { Metadata } from "next";
import "./globals.css";
import {Inter,IBM_Plex_Serif} from "next/font/google"

const inter=Inter({subsets:["latin"], variable:'--font-inter'})

const ibmPlexSerif=IBM_Plex_Serif({
  subsets:['latin'],
  weight:["400","700"],
  variable:"--font-ibm-plex-serif"
})
export const metadata: Metadata = {
  title: "BPA NET",
  description: "Banco de Poupança Angolano",
  icons:{
    icon:"/icons/logo_favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${ibmPlexSerif} `}
      >
        {children}
      </body>
    </html>
  );
}
