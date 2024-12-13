"use client";
import CountUp from "react-countup"
export default function AnimacaoSaldo ({amount}:{amount:number}){
            
    return(
        <>
        {/* Countup é uma biblioteca para fazer a animação de contagem  */}
        <CountUp 
        suffix=" KZS"
        end={amount}/>
        </>
    )
}