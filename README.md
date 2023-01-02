# Descrição

Projeto avaliativo de Servidor Web com Docker do meu "Curso Técnico em Informática" do IFES 🌐 🐳

---

# Sumário
- [Descrição](#descrição)
- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)

---

# Habilidades Requeridas
  * Usar comandos dockers no CLI - Interface de linha de comando;
  * Criar um contêiner Docker para uma aplicação de front-end;
  * Criar um contêiner Docker para uma aplicação de back-end;
  * Criar um contêiner Docker para um banco de dados MySQL;
  * Criar um contêiner Docker para uma aplicação de testes;
  * Orquestrar os contêineres utilizando o Docker compose dev e prod.

---

## O que foi desenvolvido

Foi criada e implementada uma aplicação "Todo-List" que contém: frontend, backend, banco de dados e testes. Criando uma conexão entre essas partes e orquestrando seu funcionamento. Para tal foi criado imagens das mesmas a partir de Dockerfile's e o ambiente de execução e desenvolvimento da aplicação configurada com o docker-compose.

---

## Tecnologias usadas

- Na aplicação "Todo-List" (Diretório `todo-app`):
  * `JavaScript`, `JSX`, `React`, `ContextAPI`, `CSS`, `Node`, `MySQL` e `Jest`.

- Na estruturação do ambiente de execução e desenvolvimento da aplicação (Diretório `docker`):
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
    * Entre na pasta `docker` via terminal --> `cd docker`.
    * Copie e cole TUDO do arquivo `linux-compressed-commands.txt` se estiver usando Linux, ou `windows-compressed-commands.txt` se estiver usando o Windows que está dentro da pasta `docker`, no terminal, lembrando que os passos anteriores feitos no terminal devem ter sido concluídos, em seguida aperte a tecla "ENTER".
    * Acesse http://localhost:3000 e pronto, agora é só usar a aplicação.
