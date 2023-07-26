### API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG
- [x] Deve ser possível se cadastrar como um usuário para adotar um pet
- [x] Deve ser possível realizar login como um usuário para adotar um pet

## Regras de negócio

- [x] Para acessar as funcionalidades da aplicação o usuário ou ORG deve estar logado
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
- [x] Apenas uma ORG pode cadastrar um pet 

## Regras não-funcionais 

- [x] Cada usuário da aplicação (ORG e usuário que quer adotar) deve ser identificada por um JWT token
- [x] A senha do cadastro deve estar criptografada 