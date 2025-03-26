export function formataSaldo(value:number|undefined) {
  if (typeof value !== 'string' && typeof value !== 'number') return 'Valor inválido';
  
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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