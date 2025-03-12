export interface ICurrency {
    taxa: number;
    descricaoTipoCambio: string;
    tipoCambio: string;
    data: string;
    designacaoMoeda: string;
    codigoMoeda: string;
}


export type Cliente = {
    nome: string;
    email: string;
    numeroBi: string;

};
  
export type Conta = {
    iban: string,
    nbi: string,
    role: number,
    number: string,
    authorized_balance: number,
    bic: string,
    available_balance: number,
    up_balance: number,
    created_at: string,
    currency: string,
    state: string,
};