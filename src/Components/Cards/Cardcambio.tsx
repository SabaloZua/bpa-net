import style from "@/styles/cardcambio.module.css"
export default function Cardcambio (){
    return(
        <div className={`${style.exchange}`}>
            <div className={`${style.exchangeText}`}>
                <h1>Dolar</h1>
                <p>USD- AOA</p>
                <p>912,00 KZ</p>
            </div>
        </div>
    )
}