
import Image from "next/image";


export default async function Page() {




  return (
    <div className="flex flex-col gap-5 items-center h-full py-7 px-4">
      <h1 className="py-4 text-gray-600 text-2xl text-center">Meus Pagamentos</h1>
      <div>
        <Image 
            src={"/icons/pagamentos1.svg"} 
             alt="" 
             width={400} 
             height={50}
            />
      </div>
    </div>

    
  );
}
