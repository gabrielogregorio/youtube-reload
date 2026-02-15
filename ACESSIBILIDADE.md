# Links

- [Extensão WAVE](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)    
- [Extensão Axe](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)    
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)    
- [NVDA - Leitor do windows](https://www.nvaccess.org/download/)    
- [ORCA - Linux](https://help.ubuntu.com/stable/ubuntu-help/a11y-screen-reader.html.pt-BR)    

# Dicas

- Ter um link ser o ir para o conteudo principal
```html
<body>
  <a href="#main" class="skip-link">Ir para conteúdo principal</a>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background-color: #ffffff;
      color: #000000;
      padding: 10px;
      z-index: 100;
    }

    .skip-link:focus {
      top: 0;
    }
  </style>
</body
```

2. Navegação baseada em marcos

- Conheça mais link
- Serviços link

3. Atalhos de navegação
- `shift + tab`    volta
- `tab` proximo
- Baixo e cima move o cursor virtual de leitura de textos

4. `ctrl + alt + n` Abre opções do nvda

5. `tecla do leitor + q` Encerra nvda

6. [nvda] `insert + f7` - Abre painel com marcos, links, etc.

7. No painel, veja links inuteis que podem ser removidas

8. Em links de empresas, dizer Gráfico sbt por exemplo


9. Imagem com `role="presentation"` e `alt=""` para dizer que é só apresentação visual

10. Marcos delimitadores (footer, navbar, sections, etc) eles podem navegador pela paǵina sabendo onde estão

11. Sections podem ter `aria-labels` é até recomendado
