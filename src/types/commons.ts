

export interface DadosContaType {
    id:number,
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
    email:Email[]
}

export interface Email {
    t_email_address: string;
}

export type EntidadeType = {
    id:number,
    nome:string,
    referencia:string,
    logo:string
}

export type ProdutoType = {
    id:number,
    idEntidade:number,
    descricao:string,
    preco:string
}
  
  