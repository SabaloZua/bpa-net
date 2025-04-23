export function formataSaldo(value:number|undefined) {
  if (typeof value !== 'string' && typeof value !== 'number') return 'Valor inválido';

  if(isNaN(value)) return "0";
  
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatarKz(valor: number|undefined): string {
  if (typeof valor !== 'string' && typeof valor !== 'number') return 'Valor inválido';
  // Converte para string com duas casas decimais, troca ponto por vírgula

  if(isNaN(valor)) return "0,00 Kz";

  const comDecimais = valor.toFixed(2).replace('.', ',');

  // Separa a parte inteira e decimal
  const [inteiro, decimal] = comDecimais.split(',');

  // Adiciona espaços a cada três dígitos da parte inteira
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


  return `${inteiroFormatado},${decimal} Kz`;
}

export function formatarData(isoString: string): string {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const data = new Date(isoString);
  const dia = data.getUTCDate();
  const mes = meses[data.getUTCMonth()];
  const ano = data.getUTCFullYear();

  return `${dia} ${mes} ${ano}`;
}


export function formataNome(nomeCompleto:string|undefined):string {

    if(!nomeCompleto){
      return "";
    }
    
    // Converter para minúsculas e separar os nomes
    const names = nomeCompleto.toLowerCase().split(" ");

    // Capturar o primeiro e o último nome
    let firstName = names[0];
    let lastName = names[names.length - 1];

    // Capitalizar a primeira letra
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    // Retornar o nome formatado
    return `${firstName} ${lastName}`;
}

export function abrevia(nome:string|undefined){
    const newNome= formataNome(nome).split(" ");
    const firstLetter = newNome[0][0];
    const lastLetter = newNome[1][0];

    return `${firstLetter}${lastLetter}`;


}


