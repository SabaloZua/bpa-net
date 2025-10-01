import { Toaster } from "sonner";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NextTopLoader from "nextjs-toploader";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import type { Metadata } from 'next'; // 👈 Import necessário

// --- Componente auxiliar para injetar o JSON-LD (Schema.org) ---
// Colocar scripts diretamente no layout não é o padrão. 
// A solução mais simples é definir a estrutura como string e injetar no head.
const JsonLdScript = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Banco de Poupança Angolano BPA",
    "url": "https://bpa-net.vercel.app/",
    "logo": "https://bpa-net.vercel.app/icons/logo_favicon.svg",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};


export const metadata: Metadata = {
  // Title
  title: 'BPA NET',

  // Description
  description: 'O BPA NET é uma plataforma digital oferecida pelo Banco de Poupança Angolano (BPA) que permite aos seus clientes realizar diversas operações bancárias de forma rápida, segura e conveniente.',

  keywords: [
    'BPA Net', 'banco digital', 'internet banking BPA', 'Angola', 
    'Banco de Poupança Angolano', 'Poupança', 'Banco'
  ],

  // Theme Color
  themeColor: '#fff',

  // Icons (para favicon e apple-touch-icon)
  icons: {
    icon: '/icons/logo_favicon.svg',
    apple: '/icons/logo_favicon.svg',
  },

  // Open Graph (SEO para partilha em redes sociais)
  openGraph: {
    title: 'Banco de Poupança Angolano BPA',
    description: 'O BPA NET é uma plataforma digital oferecida pelo Banco de Poupança Angolano (BPA) que permite aos seus clientes realizar diversas operações bancárias de forma rápida, segura e conveniente.',
    url: 'https://bpa-net.vercel.app/',
    type: 'website',
  },
};


// --- 2. LAYOUT PRINCIPAL (Com o JSX Corrigido) ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
     
      <JsonLdScript /> 
      
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
        <NextUIProvider>
          <NextAuthSessionProvider >
            {children}
          </NextAuthSessionProvider>
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