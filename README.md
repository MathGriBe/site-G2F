# G2F Transportes — Site institucional

Site responsivo da **G2F Transportes**, empresa de transporte rodoviário de contêineres com frota bitrem e atuação em operações portuárias de importação e exportação.

O projeto foi desenvolvido a partir de um design no **Figma** e convertido para **HTML, CSS e JavaScript puro**, sem frameworks.

> Coloque aqui um print do site (desktop e celular). Exemplo:
> `![Prévia do site](docs/preview.png)`

---

## Seções

- **Início (Hero):** chamada principal "Conectando caminhos, acelerando conquistas"
- **Valores e Missão:** os três pilares da empresa em cards
- **Atendimento nacional:** presença no Brasil, frota bitrem e operação portuária
- **Atuação:** fluxos de importação e exportação (Porto → Cliente → Depot do Armador)
- **Sobre a nossa frota:** rastreamento, manutenção preventiva e controle logístico
- **Carrossel:** galeria de fotos (espaço reservado para as imagens do cliente)
- **Rodapé:** links institucionais e informações de contato

## Funcionalidades

- Layout **responsivo** para desktop, tablet e celular
- **Menu hambúrguer** no celular
- Cabeçalho fixo que fica mais compacto ao rolar a página
- Destaque automático no menu da seção visível na tela
- Animações de entrada ao rolar (respeitando a preferência de "reduzir movimento" do sistema)
- **Carrossel** com setas, indicadores, troca automática e arrastar com o dedo
- Fluxos de importação e exportação reorganizados em etapas verticais no celular
- Imagens com carregamento sob demanda (`loading="lazy"`)

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica da página |
| CSS3 | Layout com Grid e Flexbox, variáveis CSS e media queries |
| JavaScript | Menu mobile, `IntersectionObserver` para animações e carrossel |
| Figma | Design original da interface |
| Google Fonts | Roboto Condensed, Oswald, Poppins, Rubik, Inter, Fira Sans e Krub |

## Estrutura de pastas

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    └── (imagens e ícones do site)
```

## Como rodar

Não precisa instalar nada.

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   ```
2. Abra o arquivo `index.html` no navegador.

Se usar o VS Code, a extensão **Live Server** atualiza a página automaticamente a cada alteração.

## Como adicionar as fotos do carrossel

1. Salve as fotos na pasta `img/` (exemplo: `img/carrossel-1.jpg`).
2. No `index.html`, procure o comentário **"ESPAÇO PARA AS FOTOS DO CLIENTE"**.
3. Em cada slide, troque o bloco `<div class="carrossel__vazio">...</div>` por:
   ```html
   <img src="img/carrossel-1.jpg" alt="Descrição da foto">
   ```
4. Para ter mais ou menos fotos, copie ou apague um `<figure>` inteiro. Os indicadores se ajustam sozinhos.

## Cores

| Nome | Código |
|---|---|
| Amarelo G2F | `#EFCC18` |
| Azul do cabeçalho | `#141A27` |
| Fundo escuro | `#0B0F17` |
| Fundo dos cards | `#081420` |
| Texto secundário | `#D1D5DB` |

## Status

🚧 Em desenvolvimento: aguardando as fotos do carrossel e os links das redes sociais.

## Autor

**Matheus Grisostomo Bevilaqua**
Estudante de Sistemas de Informação

---

Design e marca © G2F Transportes. Todos os direitos reservados.