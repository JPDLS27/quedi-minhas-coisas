# quedi minhas coisas

**Perdeu ou achou alguma coisa?** O quedi minhas coisas junta os achados e perdidos de Blumenau num só lugar e avisa quem pode ajudar.

Projeto de **Maria Clara** e **Luara**, desenvolvido na disciplina de Metodologia do Design, com o professor Renato Valderramas, no curso de Design da FURB (2º semestre, 2026).

## O problema

Todo mundo já esqueceu um guarda-chuva, um fone ou uma carteira em algum lugar. Na nossa pesquisa com 25 pessoas:

- **64%** já perderam guarda-chuva, o item mais esquecido;
- **76%** perdem coisas na escola ou na faculdade;
- **92%** têm dificuldade para encontrar o dono de um objeto que acharam;
- **92%** nunca usaram rede social ou site para procurar ou devolver algo.

Quem perde não sabe onde procurar. Quem acha quer devolver, mas não sabe para quem, e tem medo de entregar para a pessoa errada.

## A solução

Um site acolhedor e fácil de usar, pensado para quem está aflito procurando alguma coisa. Ele une três ideias:

1. **Encontrar perto de você.** A pessoa marca onde e em que período perdeu o item. O site mostra os achados parecidos, com a porcentagem de semelhança, e avisa quem passou por perto naquele horário. O mapa reúne os achados e perdidos de instituições como a FURB, o Shopping Neumarkt, a Rodoviária e a Biblioteca Fritz Müller.
2. **Devolver com segurança.** Quem perdeu guarda um detalhe secreto do item, e só leva quem acertar. A conversa acontece por chat anônimo, e o item pode ficar numa Estação quedi, um ponto de coleta onde o dono retira com um código, sem precisar encontrar ninguém.
3. **Devolver vale a pena.** Cada devolução rende pontos que viram Pix ou vale-presente, selos de agradecimento no perfil e café na cantina de instituições parceiras. Quem entrega numa Estação pode pedir uma recompensa opcional de até R$ 10.

## O que tem aqui

- **`index.html`**: página de apresentação do produto.
- **`app.html`**: protótipo navegável, com login de demonstração, "Perdi algo", "Achei algo", itens parecidos, chat anônimo, mapa da cidade e perfil com pontos e selos.

> Este é um projeto acadêmico. O serviço não existe de verdade: itens, avaliações e números das instituições são exemplos, e nenhum dado digitado no site é enviado.

## Como ver

Abra o `index.html` no navegador, ou rode `npx serve .` na pasta do projeto. O site é estático (HTML, CSS e JavaScript), sem etapa de build. No Vercel, basta importar o repositório com o *Framework Preset* em **Other**.

## Feito com

- HTML, CSS e JavaScript, sem framework.
- [GSAP](https://gsap.com) e ScrollTrigger para as animações. Quem ativa "reduzir movimento" no sistema vê a página sem animação.
- Fonte [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/), criada pelo Braille Institute para ser fácil de ler por pessoas com baixa visão.
