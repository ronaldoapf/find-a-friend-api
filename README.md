# Find a Friend

### Sobre o Projeto

Esta API foi desenvolvida com a intenção de reforçar os conceitos que foram aprendidos na trilha de Node da Rocketseat onde conhecemos os conceitos de SOLID. No caso, desenvolvemos uma API para a adoção de animas, utilizando SOLID e testes (unitários e end-to-end).

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Estrutura de pastas

```shell
├── @types
├── env
├── http
│   ├── controllers
│   │   ├── orgs
│   │   └── pets
│   └── middlewares
├── lib
├── repositories
│   ├── in-memory
│   └── prisma
├── use-cases
│   ├── errors
│   └── factories
└── utils
```

## Funcionalidades

### Org

- **Criar uma organização**: Permite a criação de uma organização.
- **Autenticação da organização**: Permite a autenticação de uma organização via JSON Web Token.
- **Buscar organizações**: Permite a listagem de todas as organizações.
- **Buscar organizações pertas da sua localização**: Permite a listagem de organizações próximas a localização do usuário.

### Pet

- **Criar um pet para adoção**: Permite a criação de um pet para adoção.
- **Buscar pets**: Permite a busca de pets de acordo com filtros.
- **Buscar pet específico**: Permite a busca de um pet específico.

Feito com 💜 por Ronaldo 👋
