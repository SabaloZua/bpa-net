

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
export interface DadoAdmin{
    valorTotalTransacoes:    string;
    totalClientes:           number;
    totalTransacoes:         number;
    percentagemContasAtivas: number;
    trasacoes:trasacoes,
    cliente:cliente
}
export interface cliente {
    nome:        string;
    email:       string;
    numeroConta: string;
    iban:        string;
}
export interface trasacoes {
    n_Idtrasacao:            number;
    n_contaorigem:           number;
    t_contadestino:          null | string;
    t_debito:                null | string;
    t_credito:               null | string;
    t_benefeciario:          null | string;
    t_descricao:             string
    t_datatrasacao:          Date;
    t_saldoactual:           string;
    valorTransacaoFormatada: string;
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
    email:string,
}

export interface Email {
    t_email_address: string;
}

export type LevantamentoType={
    data:string,
    valor:number,
    referencia:string,
    idLevantamento:number,
    estado:string
}

export type EntidadeType = {
    id:number,
    nome:string,
    referencia:string,
    logo:string,
    campos:string[]
}

export type SubProdutoType ={
    id: number,
    descricao:string,
    preco:string,
    idProduto: number,
}

export type ProdutoType = {
    id:number,
    idEntidade:number,
    descricao:string,
    preco:string,

}
  
  