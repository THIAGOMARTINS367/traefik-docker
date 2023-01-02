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

- Na estruturação do ambiente de execução e desenvolvimento da aplicação:
  * `Docker`

---

## ANTES DE INICIALIZAR A APLICAÇÃO:

**⚠️ Certifique-se de que possui o Docker instalado e configurado na sua máquina.**

1. Clone o repositório
  * `git clone git@github.com:THIAGOMARTINS367/traefik-docker.git`

  * Entre na pasta do repositório que você acabou de clonar pelo Terminal:
    * `cd traefik-docker`

3.  Inicialize o projeto
    * Entre na pasta `docker` via terminal --> `cd docker`.
    * Copie cada arquivo ".env.development.local.example" nas pastas `back-end/`,
    `database/`, `front-end/` e `tests/` no caminho `docker/todo-app/` e cole cada
    um deles com o mesmo nome removendo o sufixo ".example" nas suas respectivas pastas.
    * Volte para a raiz do projeto e execute ``
