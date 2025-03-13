import Sidebar from "@/components/sidebar/Sidebar";
import { Bell, ChevronDown, Search } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import nextAuthOptions  from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";

// import NavMoblie from '@/Components/NavMoblie'
// import styles from '@/styles/dasbodrd.module.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className=" grid lg:grid-cols-4  h-screen ">
      <Sidebar />

      <div className="lg:col-span-3 flex flex-col overflow-hidden bg-white ">
        {/* Header */}
        <header className="  z-10">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Pesquisar BPA NET"
              />
            </div>
            <div className="flex items-center">
              <Link
                href={""}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Bell className="h-6 w-6" />
              </Link>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      AS
                    </div>
                  </button>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 border-t  flex items-center">
            <div className="mr-4">
              Olá <span className="font-medium text-blue-500">Sablo Zua</span>👋
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-white no-scrollbar xl:overflow-y-scroll">
          {children}
        </main>
      </div>
    </main>
  );
}
