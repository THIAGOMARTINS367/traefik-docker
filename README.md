# Descrição

Este projeto foi desenvolvido durante o período de Curso da Trybe 🚀

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados pela mesma.

---

# Sumário

- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Execução de testes unitários](#execução-de-testes-unitários)

---

# Habilidades Requeridas
  * Usar comandos dockers no CLI - Interface de linha de comando;
  * Criar um contêiner Docker para uma aplicação de front-end;
  * Criar um contêiner Docker para uma aplicação de back-end;
  * Criar um contêiner Docker para uma aplicação de testes;
  * Orquestrar os três contêineres utilizando o Docker compose.

---

# Entregáveis


Temos, neste projeto, uma série de comandos com diferentes níveis de complexidade que devem ser resolvidos cada um em seu arquivo próprio.

1. Leia o requisito e crie um arquivo chamado `commandN.dc` no diretório `docker-commands`, em que N é o número do desafio.

2. O arquivo deve conter apenas o comando do CLI *(Interface de Linha de Comando)* do Docker do requisito resolvido. Um exemplo de como vai ficar seu arquivo:
```dc
docker network inspect bridge
```

3. Faça isso até finalizar todos os requisitos e depois siga as instruções de como entregar o projeto em [**Instruções para entregar seu projeto**](#instruções-para-entregar-seu-projeto).

4. Os arquivos principais do projeto estão na pasta `docker`, na raiz do projeto, nele estão contidos:
- Pasta `docker-commands`: Onde ficarão os comandos exigidos pelos requisitos; 
  - **⚠️ Importante: você deve assumir que essa é a pasta raiz para os comandos.**
  - Por exemplo, se você precisa referenciar um caminho em um comando, você deve assumir que sua pasta raiz esta partindo de `./docker`
- Pasta `todo-app`: Onde fica nossa **pseudo-aplicação**, que servirá como base para nossos `Dockerfile`s e `Compose`;
  - **⚠️ Essa aplicação conta com um [**README.md**](./docker/todo-app/README.md) próprio, que deve ser usado como referência na criação dos scripts!**
- A pasta `docker` deve receber o arquivo `docker-compose.yml` para orquestração de aplicações

5. Para entregar o seu projeto você deverá criar um _Pull Request_ neste repositório. Este _Pull Request_ deverá conter no diretório `docker-commands` os arquivos `command01.dc`, `command02.dc` e assim por diante até o `command12.dc`, que conterão seu comando `docker` de cada requisito, respectivamente.

**⚠️ É importante que seus arquivos tenham exatamente estes nomes! ⚠️**

### Sobre o avaliador

O avaliador cria um **container especial** para executar a avaliação de `comandos`, `Dockerfiles` e `docker-compose`. 

Esse container é temporário, por tanto, ao começar ou terminar os testes locais, o avaliador remove automaticamente esse mesmo container, assim como seu volume associado.

O volume desse container, mapeia a pasta `./docker/` do seu projeto, para dentro dele, ou seja, a raiz desse container vai conter as pastas `./docker-commands/`, `./todo-app/` e seu arquivo `./docker-compose.yml`, quando estiver pronto.

Isso significa, que se pudessemos olhar para dentro do container de avaliação, veriamos a seguinte estrutura:

```bash
.
├── docker-commands
└── todo-app
    ├── back-end
    │   └── *
    ├── front-end
    │   └── *
    └── tests
        └── *
```

Por tanto, é importante entender que os comandos docker escritos em `command*.dc` estarão rodando dentro desse container especial (e não a partir da raiz do projeto, como em projetos anteriores).

---


## O que foi desenvolvido

Foi implementado a "conteinerização" da aplicação "Todo-List" que contém: frontend, backend e testes. Criando uma conexão entre essas partes e orquestrando seu funcionamento. Para tal foi criado imagens das mesmas a partir de Dockerfile's e a estrutura de execução da aplicação configurada com o docker-compose.

---

## Tecnologias usadas

- `javascript`, `jsx`, `React`, `Redux` e `css`.

---

# Instruções para entregar seu projeto

## ANTES DE INICIALIZAR A APLICAÇÃO:

1. Clone o repositório
  * `git clone git@github.com:tryber/sd-017-project-docker-todo-list.git`

  * Entre na pasta do repositório que você acabou de clonar:
    * `cd Trybe-project-docker-todo-list`

2. Instale as dependências
    * `npm install`

  * Verifique se os testes estão executando:
    * `npm test` (os testes devem rodar e falhar)

3.  Inicialize o projeto
    * Utilize o comando `npm start` dentro da pasta `Trybe-project-docker-todo-list` para rodar o projeto em sua máquina.

---

## Execução de testes unitários

⚠ **É necessário ter o Docker instalado corretamente na sua máquina para rodar os testes locais**

Todos os requisitos do projeto serão testados automaticamente por meio do Jest. Basta executar o comando abaixo:

```bash
npm test
```

Você pode rodar um arquivo de `test` por vez, exemplo:

```bash
npm test 01container
```
⚠ **Atenção:** ⚠
Não  utilize a função `.only` ou `.skip` após o describe. Os testes precisam rodar por completo para que seja avaliado localmente.

---

## Desmontração de Uso

### *Em produção*...
