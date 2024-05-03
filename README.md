# Gestão de Profissionais

```
COMO: um adminstrador do sistema,
QUERO: poder registrar, atualizar e listar profissionais,
PARA: que eu possa gerenciar quem pode oferecer serviços através da plataforma
```

## Contexto Geral

```
DADO: que estou autenticado como administrador
```

### Cenário: Registrar um novo profissional

```
DADOS: que nenhum profissional está atualmente registrado com o email "joao@exemplo.com"
QUANDO: eu registro um profissional com os seguintes detalhes:
| nome | email | qualificações |
| João Silva | joao@exemplo.com | Dentista, MSc |
ENTÃO: um novo profissional deve ser criado
E: ele deve estar associado às qualificações "Dentista" e "MSc"
```

### Cenário: Atualizar qualificações de um profissional

```
DADO: que o profissional "Carlos Mendes" está registrado com a qualificação "Pediatra"
QUANDO: eu atualizo as qualificações de Carlos para "Pediatra, PhD em Medicina"
ENTÃO: as qualificações de Carlos no sistema devem ser "Pediatra, PhD em Medicina"
```

### Cenário: Listar profissionais

```
QUANDO: eu solicito a lista de todos os profissionais
ENTÃO: eu devo receber uma lista contendo todos os profissionais registrados
E: cada profissional deve ter detalhes de suas qualificações associadas
```

## Pré requisitos do projeto

### Tecnologias

1. Next - react
2. Zod
3. React-Hook-Forms
4. React-Query
5. Material-UI
6. Prisma

### Coneceitos
1. SOLID
2. Clean Archtecture

### Estrutura a ser seguida

```
|-- /src
|   |-- /backend
|   |   |-- /app
|   |   |   |-- /interfaces
|   |   |   |-- /use_cases
|   |   |-- /domain
|   |   |   |-- /entities
|   |   |   |-- /value_objects
|   |   |-- /infrastructure
|   |   |   |-- /db
|   |   |   |   | -- /prisma
|   |   |   |-- /web
|   |   |-- /interfaces
|   |       |-- /adapters
|   |       |-- /web
|   |           |-- /controllers
|   |           |-- /validators
|   |-- /frontend
|       |-- /public
|       |-- /src
|       |   |-- /components
|       |   |-- /services
|       |   |-- /hooks
|       |   |-- /pages
|       |   |-- /utils
|       |-- /styles
|-- /tests
|   |-- /backend
|   |   |-- /unit
|   |   |-- /integration
|   |-- /frontend
|       |-- /unit
|       |-- /component
|-- /config
```
## Telas de modelo

### Listagem de todos os profissionais
![list-all-professional](https://github.com/DATAWER/desafio/assets/68328330/e2c7bcc4-1c2a-43d5-8ae9-c3bf1ed8155a)

### Tela de criação e edição de novos profissionais
![save-professional](https://github.com/DATAWER/desafio/assets/68328330/65500688-8843-4af8-9b75-6e14d3244f80)


# Caso de uso 1: Registrar Profissional

```
ID: UC01
Ator Principal: Administrador
```
## Pré condições

1. O usuário deve estar autenticado e autorizado como administrador.

## Fluxo Principal

1. O administrador acessa a página de registro de profissionais.
2. O administrador preenche o formulário com nome, email e qualificações do profissional.
3. O sistema valida os dados para garantir que não há registros duplicados.
4. O sistema registra o profissional no banco de dados.
5. O sistema exibe uma mensagem de sucesso ao administrador.

## Fluxo Alternativo: Registro duplicado

1. No passo 3 do fluxo principal, se o email já estiver registrado, o sistema interrompe o fluxo principal.
2. O sistema exibe uma mensagem de erro indicando que o email já está em uso.

## Pós condições

1. Um novo profissional é adicionado ao sistema, ou uma mensagem de erro é exibida.

# Caso de uso 2: Atualizar Qualificações do Profissional

```
ID: UC02
Ator Principal: Administrador
```

## Pré condições

1. O usuário deve estar autenticado e autorizado como administrador.

## Fluxo Principal

1. O administrador acessa a lista de profissionais.
2. O administrador seleciona um profissional para atualizar.
3. O administrador altera as qualificações do profissional no formulário de edição.
4. O sistema valida as alterações.
5. O sistema atualiza as informações do profissional no banco de  dados.
6. O sistema exibe uma mensagem de sucesso ao administrador.

## Pós condições

1. As qualificações do profissional são atualizadas no sistema.

# Caso de uso 1: Listar Profissional

```
ID: UC03
Ator Principal: Administrador
```
## Pré condições

1. O usuário deve estar autenticado e autorizado como administrador.

## Fluxo Principal

1. O administrador acessa a página de listagem de profissionais.
2. O sistema recupera todos os profissionais do banco de dados.
3. O sistema exibe os profissionais com seus detalhes, incluindo qualificações.

## Pós condições

1. Os profissionais são listados para o administrador.
