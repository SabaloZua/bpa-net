import Image from "next/image";

export default function Page(){
    return(
        <div className="flex flex-col gap-5 items-center h-full py-7">
            <h1 className="py-4 text-gray-600 text-2xl">Minhas Transferências</h1>
            <div>
            <Image 
                src={"/icons/transfer.svg"} 
                    alt="" 
                    width={600} 
                    height={50}
                    />
            </div>
        </div>
    )
}