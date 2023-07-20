### RF ( Requisitos Funcionais ):
-Deve ser possível criar um usuário -> /users (POST)
-Deve ser possível identificar o usuário entre as requisições -> O id está armazenados nos cookies 
-Deve ser possível registrar uma refeição feita, com as seguintes informações: -> /meals (POST)
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
-Deve ser possível editar uma refeição, podendo alterar todos os dados acima -> /meals/:id (PATCH)
-Deve ser possível apagar uma refeição -> /meals/:id (DELETE) 
-Deve ser possível listar todas as refeições de um usuário  -> /meals (GET)
-Deve ser possível visualizar uma única refeição -> /meals/:id (GET)
-Deve ser possível recuperar as métricas de um usuário -> /meals/summary (GET)
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta


### RN ( Regras de Negócio ):
-O usuário só pode visualizar, editar e apagar as refeições o qual ele criou 