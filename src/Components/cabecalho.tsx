interface cabecalhoProps{
    tipo?:"titulo" | "saudacao", 
    titulo:string,
    subtext:string,
    nomeUser?:string
}

export default  function cabecalho({tipo,titulo,subtext,nomeUser}:cabecalhoProps){
    return(
        <>
            <div className="header-box">
                <div></div>
                <div>
                    <h1 className="header-box-title">
                        {titulo}
                        {tipo==="saudacao" &&
                          <span className="text-sky-500">
                            &nbsp;{nomeUser}
                            </span>
                        }
                    </h1>
                    <p className="header-box-subtext">{subtext}</p>
                </div>
                
            </div>
        </>
    )
} 