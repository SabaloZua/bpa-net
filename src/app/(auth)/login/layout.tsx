
import styels from "../../../styles/bg_login.module.css";
import Link from "next/link";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="auth-asset">
        <div
          className={` flex-col ${styels.bg} bg-cover  w-full h-full rounded-e-2xl  bg-no-repeat `}
        >
          <div className={`${styels.particulares}`}>Particulares</div>

          <div className={`${styels.titulo}`}>Login</div>
          <div className={`${styels.descricao}`}>Tenha acesso às suas finanças</div>

          <button
            className={`rounded-lg bg-blue-500 w-full py-2 hover:bg-blue-400   ${styels.botao}`}
          >
            <Link href={"/inicio"}>Saiba Mais</Link>
          </button>
        </div>
      </div>
      {children}
    </main>
  );
}
