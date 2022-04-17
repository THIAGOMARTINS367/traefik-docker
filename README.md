# Descrição

Este projeto foi desenvolvido durante o período de Curso da Trybe 🚀

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados pela mesma.

---

# Sumário
- [Descrição](#descrição)
- [Habilidades](#habilidades-requeridas)
- [Informações - Estrutura do Projeto](#informações-da-estrutura-do-projeto)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)

---

# Habilidades Requeridas
  * Usar comandos dockers no CLI - Interface de linha de comando;
  * Criar um contêiner Docker para uma aplicação de front-end;
  * Criar um contêiner Docker para uma aplicação de back-end;
  * Criar um contêiner Docker para uma aplicação de testes;
  * Orquestrar os três contêineres utilizando o Docker compose.

---

# Informações da estrutura do Projeto

Os arquivos principais do projeto estão na pasta `docker`, na raiz do projeto, nele estão contidos:
- Pasta `docker-commands`: Onde fica os comandos exigidos pelos requisitos; 
  - **⚠️ Importante: você deve assumir que essa é a pasta raiz para os comandos.**
  - Por exemplo, se você precisa referenciar um caminho em um comando, você deve assumir que sua pasta raiz esta partindo de `./docker`
- Pasta `todo-app`: Onde fica nossa **pseudo-aplicação**, que servirá como base para nossos `Dockerfile`s e `Compose`;
  - **⚠️ Essa aplicação conta com um [**README.md**](./docker/todo-app/README.md) próprio, que deve ser usado como referência na criação dos scripts!**
- A pasta `docker` deve possuir o arquivo `docker-compose.yml` para orquestração do ambiente de execução.

---

## O que foi desenvolvido

Foi implementado a "conteinerização" da aplicação "Todo-List" que contém: frontend, backend e testes. Criando uma conexão entre essas partes e orquestrando seu funcionamento. Para tal foi criado imagens das mesmas a partir de Dockerfile's e o ambiente de execução da aplicação configurada com o docker-compose.

---

## Tecnologias usadas

- Na aplicação "Todo-List" (Diretório `todo-app`):
  * `JavaScript`, `JSX`, `React`, `ContextAPI`, `CSS`, `Node` e `Jest`.

- Na estruturação do ambiente de execução da aplicação (Diretório `docker`):
  * `Docker`

---

## ANTES DE INICIALIZAR A APLICAÇÃO:

**⚠️ Certifique-se de que possui o Docker instalado e configurado na sua máquina.**

1. Clone o repositório
  * `git clone git@github.com:THIAGOMARTINS367/Trybe-project-docker-todo-list.git`

  * Entre na pasta do repositório que você acabou de clonar pelo Terminal:
    * `cd Trybe-project-docker-todo-list`

2. Instale as dependências
    * `npm install`

  * Verifique se os testes estão executando:
    * `npm test` (os testes devem rodar e falhar)

3.  Inicialize o projeto
    * Entre na pasta `docker` via terminal.
    * Copie e cole TUDO do arquivo `linux-compressed-commands.txt` no terminal, lembrando que os passos anteriores feitos no terminal devem ter sido concluídos, em seguida aperte a tecla "ENTER".
    * Acesse http://localhost:3000 e pronto, agora é só usar a aplicação.

---

## Desmontração de Uso

### *Em produção*...
