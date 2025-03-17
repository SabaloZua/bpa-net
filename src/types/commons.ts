
export interface DadosConta{
    dados:Dados;
}


export interface Dados {
    iban:string,
    saldo:number,
    estado:string,
    nba:string,
    dataAbertura:string,
    numeroConta:string,
    idTipoConta:number,
    cartao: Cartao
    cliente: Cliente
}

export interface Conta{
    iban:string,
    saldo:number,
    estado:string,
    nba:string,
    dataAbertura:string,
    numeroConta:string,
    idTipoConta:number,
}


export interface Cartao{
    idCartao:number,
    descricao:string,
    dataValidade:string,
    estado:string,
    numero:string
}

export interface Cliente{
    nome:string,
    bi:string,
    email:string
}
  