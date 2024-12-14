import Sidebar from "@/Components/Sidebar";
import Image from "next/image";
import NavMoblie from '@/Components/NavMoblie'

/**
 * Mudei também a Logo, converti para png, depois recortei, converti para svg e mudei a cor
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo_favicon.svg" width={30} height={30} alt="logo" />
          <div>
            <NavMoblie />
          </div>
        </div>
        
        {children}
      </div>
    </main>
  );
}
