import styles from '@/styles/dasbodrd.module.css'
interface cabecalhoProps{
    titulo:string,
    subtext:string,
   
}

export default  function cabecalho({titulo,subtext}:cabecalhoProps){
    return(
        <>
            <div className="header-box">
                <div></div>
                <div>
                    <h1 className={`${styles.dastitle}`}>
                        {titulo}
                    </h1>
                    <p className="header-box-subtext font-extralight">{subtext}</p>
                </div>
                
            </div>
        </>
    )
} 