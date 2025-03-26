
import { redirect } from "next/navigation";

export default function Principal(){

    redirect('/login');
    return ( 
        <div className="text-center flex flex-col justify-center">
            <h1 className="text-2xl font-semibold">BPA</h1>
            <p>Banco de Poupança Angolano</p>
        </div>
    );
}