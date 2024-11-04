# Crud Api's

Uma aplicação web que utiliza quatro APIs diferentes: a API do Pokémon, a API do OMDB (Open Movie Database), Waifu.im e a API do Jikan (para obter informações sobre animes e personagens).

## Funcionalidades

- **Pokémon**: O usuário pode pesquisar por um Pokémon e visualizar sua miniatura.
- **Filmes**: O usuário pode adicionar, editar e excluir filmes da sua lista. Ao clicar no botão "Detalhes", a aplicação busca as informações do filme na API do OMDB e as exibe.
- **Waifu Gallery**: Carrega 5 imagens de waifus ou qualquer tag que voce passe nos parametros.
- **Animes e Personagens**: O usuário pode visualizar animes e personagens aleatórios, além de adicioná-los à lista de favoritos.

## Tecnologias Utilizadas

- **JavaScript**: Linguagem de programação utilizada para implementar a lógica da aplicação.
- **HTML**: Utilizado para estruturar a interface do usuário.
- **CSS**: Usado para estilizar a aplicação.
- **Express.js**: Servidor web utilizado para lidar com as requisições da API do OMDB.
- **Dotenv**: Biblioteca utilizada para gerenciar as variáveis de ambiente, como a chave da API do OMDB.

## Como Executar o Projeto

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone o repositório do projeto.
3. Navegue até o diretório do projeto e execute o seguinte comando para instalar as dependências:
    
        npm install
     
     
 4. Crie um arquivo .env no diretório raiz e adicione sua chave da API do OMDB:

        OMDB_API_KEY=sua_chave_api_aqui

5. Inicie seu server com 'npm start'.
Acesse o aplicativo no navegador em http://localhost:3000.


# Estrutura do Projeto


    crud/
    ├── public/
    │   ├── index.html
    │   ├── styles.css
    │   └── script.js
    ├── server.js
    ├── .env
    └── README.md

     