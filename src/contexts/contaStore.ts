import {create} from "zustand"

/*type Conta = {
    iban:string,
    saldo:number,
    estado:string,
    nba:string,
    dataAbertura:string,
    numeroConta:string,
    idTipoConta:number,
}*/

type Cartao ={
    idCartao:number,
    descricao:string,
    dataValidade:string,
    estado:string,
    numero:string
}

type Cliente = {
    nome:string,
    bi:string,
    email:string
}

type State = {
    id:number;
    iban:string,
    saldo:number,
    estado:string,
    nba:string,
    dataAbertura:string,
    numeroConta:string,
    idTipoConta:number,
    cartao: Cartao,
    cliente: Cliente,
}

type Actions = {
    setId: (id: number) => void;
    setIban: (iban: string) => void;
    setSaldo: (saldo: number) => void;
    setEstado: (estado: string) => void;
    setNba: (nba: string) => void;
    setDataAbertura: (dataAbertura: string) => void;
    setNumeroConta: (numeroConta: string) => void;
    setIdTipoConta: (idTipoConta: number) => void;
    setCartao: (cartao: Cartao) => void;
    setCliente: (cliente: Cliente) => void;
};

const useContaStore = create<State & Actions>((set) => ({
    id:0,
    iban: '',
    saldo: 0,
    estado: '',
    nba: '',
    dataAbertura: '',
    numeroConta: '',
    idTipoConta: 0,
    cartao: {
        idCartao: 0,
        descricao: '',
        dataValidade: '',
        estado: '',
        numero: ''
    },
    cliente: {
        nome: '',
        bi: '',
        email: ''
    },
    
    setId: (id: number): void => set((state) => ({ ...state, id })),
    setIban: (iban: string): void => set((state) => ({ ...state, iban })),
    setSaldo: (saldo: number): void => set((state) => ({ ...state, saldo })),
    setEstado: (estado: string): void => set((state) => ({ ...state, estado })),
    setNba: (nba: string): void => set((state) => ({ ...state, nba })),
    setDataAbertura: (dataAbertura: string): void => set((state) => ({ ...state, dataAbertura })),
    setNumeroConta: (numeroConta: string): void => set((state) => ({ ...state, numeroConta })),
    setIdTipoConta: (idTipoConta: number): void => set((state) => ({ ...state, idTipoConta })),
    setCartao: (cartao: Cartao): void => set((state) => ({ ...state, cartao })),
    setCliente: (cliente: Cliente): void => set((state) => ({ ...state, cliente })),
}));

export default useContaStore;