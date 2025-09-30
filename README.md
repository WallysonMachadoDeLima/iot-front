# IOT

IOT

## ▶️ Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento ou teste.

### 📋 Pré-requisitos

Para rodar o projeto você deve ter no mínimo os seguintes requisitos

```
Node: 16.14.2 ou verão mais atual LTS
npm: 8.5.0 ou verão mais atual LTS
```

### 🔧 Instalação

Para ter um ambiente de trabalho pronto para execução, siga o apasso-a-passo informado.

Node e yarn:

- Consulte [Alura](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?gclid=Cj0KCQjw_r6hBhDdARIsAMIDhV_pMPCXNRN4UTTcWJP5YBBN8R556nLzUG6-3cSIjvxOj07RtU8-gWUaArTnEALw_wcB) para instalar os pacostes independentemente de seu sistema operacional

## 📦 Implantação

Para finalizar a implantação, realize este último passoa passo

Node e yarn:

- Vá até raiz do projeto e digite os seguintes comando

```
yarn install && yarn dev
```

Este comando ira installar todas as dependências do Node e iniciar o projeto, a porta padrão é 8084.

## 🚀 Build

Está etapa é feita apenas caso você queira buildar e testar em modo de procução a aplicação

Yarn :

- Crie uma nova pasta e dentro dela coloque os seguintes arquivos do projeto de Implantação

  - package.json \*arquivo
  - public \*diretório
  - yarn.lock \*arquivo

- Depois execute este comando

```
yarn install --production && yarn cache clean && yarn build && yarn start
```

Este comando ira installar todas as dependências do Node e iniciar o projeto em modo de produção
