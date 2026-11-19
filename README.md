# quedi minhas coisas

Site de produto de um serviço de achados e perdidos da cidade. Projeto acadêmico de design.

- `index.html`: página de apresentação do produto, para o público
- `app.html`: protótipo navegável (Perdi algo, Achei algo, itens parecidos, chat anônimo, mapa e perfil)

É um site estático (HTML, CSS e JavaScript puro), sem build e sem dependências.

## Estrutura

```
index.html      página de apresentação
app.html        protótipo navegável
css/style.css   cores, tipografia e componentes
css/landing.css seções da página de apresentação
js/shared.js    ícones, logo e mapa da cidade
js/app.js       telas e interações do protótipo
js/motion.js    animações e interações da página de apresentação
assets/vendor/  GSAP e ScrollTrigger (biblioteca de animação, arquivos locais)
assets/img/     fotos dos itens achados
favicon.svg     ícone da aba
```

## Rodar no computador

Abra o `index.html` no navegador. Ou, numa pasta com o projeto:

```
npx serve .
```

## Publicar no GitHub

1. Crie um repositório novo em github.com (por exemplo, `quedi-minhas-coisas`).
2. Na página do repositório, clique em **uploading an existing file** e arraste todos os arquivos e pastas deste projeto.
3. Clique em **Commit changes**.

## Publicar no Vercel

1. Entre em vercel.com com a conta do GitHub.
2. Clique em **Add New… → Project** e escolha o repositório.
3. Em *Framework Preset*, deixe **Other**. Não precisa de comando de build.
4. Clique em **Deploy**. Cada novo commit no GitHub atualiza o site sozinho.

## Personalizar

- **Nome:** procure por `quedi minhas coisas` nos arquivos `index.html` e `app.html`.
- **Cores:** as variáveis ficam no começo de `css/style.css` (`--lago`, `--sol` etc.).
- **Fotos:** ficam em `assets/img/`. Para trocar, mantenha o mesmo nome de arquivo.
- **Animações:** ficam em `js/motion.js`, feitas com GSAP. Quem ativa "reduzir movimento" no sistema vê a página sem animação.
- **Fonte:** Atkinson Hyperlegible, feita pelo Braille Institute para ser fácil de ler por pessoas com baixa visão.
