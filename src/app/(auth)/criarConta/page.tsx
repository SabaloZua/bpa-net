import Link from "next/link";
import Image from "next/image";
import { Header } from "@/Components/Header";
const CriarContaPage = () => {
  return (
    <div>
        <Header/>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Estamos Trabalhando para te atender</h1>
          <Link href="/aderir" className="text-blue-500">Voltar para o inicio</Link>
          <Image src="/banners/contrato.svg" alt="BPA NET" width={500} height={100} />
        </div>
    </div>
  );    
};

export default CriarContaPage;
