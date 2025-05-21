# BPA Net

O BPA NET é uma plataforma digital oferecida pelo Banco de Poupança Angolano (BPA) que permite aos seus clientes realizar diversas operações bancárias de forma rápida, segura e conveniente. Através do BPA NET, os clientes podem realizar consultas de saldo e extrato, efectuar transferências entre contas BPA e para outros bancos, pagar contas, além de ter accesso a diversos outros serviços bancários, tudo isso de forma online, 24 horas por dia, 7 dias por semana.

## Funcionalidades

- **Abertura de Conta:** Processo guiado para cadastro de novos clientes, incluindo verificação de dados pessoais, upload de documentos e geração de credenciais seguras.
- **Transferências:**
  - **Transferência Intrabancária:** Permite transferir valores entre contas do próprio Banco BPA de forma rápida e segura.
  - **Transferência Interbancária:** Possibilita transferências para contas de outros bancos, com autenticação reforçada e comprovativo digital.
- **Depósitos a Prazo:** Lista modalidades de depósitos, permite simulação de rendimentos, aplicação direta e visualização de detalhes como TANB, prazo e montante mínimo.
  - **Simulação de Depósitos a Prazo:** Cálculo de rendimentos líquidos, retenções e outros para depósitos, com feedback em tempo real.
- **Levantamentos sem Cartão:** Solicitação de levantamentos em ATMs sem a necessidade de ter o cartão físico, utilizando autenticação via OTP.
- **Histórico de Transações:** Visualização do extrato e histórico completo das movimentações, com geração de comprovativos em PDF.
- **Perfil do Usuário:** Edição de informações pessoais, upload de foto e visualização de dados do cliente.
- **Cartões:** Exibição de informações dos cartões associados à conta, com dados como validade e status.
- **Mapa de ATMs:** Visualização e busca de ATMs próximos, com rotas traçadas no mapa (usando Leaflet).
- **Onboarding Guiado:** Tour interativo para orientar novos usuários nas principais telas do sistema.
- **Alerta de Segurança:** Utiliza FingerprintJS para identificar dispositivos utilizados para acessar a conta. Caso um acesso seja feito de um dispositivo desconhecido ou não habitual, o sistema emite um alerta de segurança e pode bloquear ou solicitar validação adicional, impedindo tentativas não autorizadas de acesso à conta do cliente.

## Tecnologias Utilizadas

- **Front-end:** React, Next.js, TypeScript
- **Mapas:** Leaflet, leaflet-routing-machine
- **Autenticação:** FingerprintJS, OTP (One Time Password)
- **Estilização:** Tailwind CSS, NextUI, shadcnUI
- **APIs:** Integração com serviços REST para operações bancárias
- **Outros:** Axios, Sonner (notificações), React Hook Form, Zod (validação)

## Estrutura Principal

- `/src/paginas`: Telas principais do sistema (`deposito`, `levantamentos`, `transferencias`, `conta`, `perfil`,`inicio` etc.)
- `/src/components`: Componentes reutilizáveis (mapa, listas, modais, cabeçalho, etc.)
- `/src/contexts`: Gerenciamento de estado global (conta, etapas de registro)
- `/src/app`: Fluxo de autenticação, registro e contratos

## Como Executar

1. Clone este repositório
2. Instale as dependências com `pnpm install`
3. Configure as variáveis de ambiente conforme necessário
4. Inicie o servidor de desenvolvimento com `pnpm dev`

## Contribuição

Pull requests são bem-vindos! Para grandes mudanças, por favor abra uma issue antes para discutir o que você gostaria de modificar.

## Licença

Este projecto é privado ou protegido. Caso queira utilizá-lo, entre em contato com o autor.

---

Desenvolvido por [SabaloZua](https://github.com/SabaloZua)
