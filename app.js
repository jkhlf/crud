
document.getElementById('fetchAgentsButton').addEventListener('click', () => {
    fetch('https://valorant-api.com/v1/agents')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const agentsList = document.getElementById('agentsList');
            agentsList.innerHTML = '';

            data.data.forEach(agent => {
                const agentItem = document.createElement('div');
                agentItem.classList.add('agent-item');
                agentItem.innerHTML = `
                    <img src="${agent.displayIcon}" alt="${agent.displayName}">
                    <h3>${agent.displayName}</h3>
                    <p>${agent.description}</p>
                    <h4>Habilidades:</h4>
                    <ul>
                        ${agent.abilities.map(ability => `
                            <li>
                                <strong>${ability.displayName}:</strong> ${ability.description}
                            </li>
                        `).join('')}
                    </ul>
                `;
                agentsList.appendChild(agentItem);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar agentes do Valorant:', error);
        });
});

//Pokemon API 

function fetchDataPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;

    // Limpa o sprite anterior
    const pokemonSprite = document.getElementById('pokemonSprite');
    pokemonSprite.style.display = 'none';
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            pokemonSprite.src = data.sprites.front_default; // Define a imagem do Pokémon
            pokemonSprite.style.display = 'block'; 
        })
        .catch(error => {
            console.error(error);
            alert('Erro: ' + error.message); 
        });
}



// OMDB API

let movieCollection = [];

function createMovie() {
    const movieInput = document.getElementById('movieInput');
    const movie = movieInput.value.trim(); // Remove espaços extras do valor

    // Se houver um filme digitado, adiciona à coleção
    if (movie) {
        movieCollection.push(movie); // Adiciona o filme à coleção
        updateMovieList(); // Atualiza a lista de filmes exibida
        movieInput.value = '';
        showNotification(`Filme "${movie}" adicionado com sucesso!`); 
    }
}

function fetchMovieDetails(movie) {
    const url = `http://localhost:3000/api/omdb/${encodeURIComponent(movie)}`;
    return fetch(url)
        .then(response => response.json())
        .catch(error => { 
            console.error('Erro ao buscar detalhes do filme:', error);
            return null;
        });
}

function readMovie(movie, movieElement) {
    movieElement.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;
    fetchMovieDetails(movie).then(data => {
        if (data && data.Response === "True") { // Se a resposta for válida
            updateMovieElement(movieElement, data); // Atualiza o elemento com os dados do filme
        } else {
            showError(movieElement, 'Filme não encontrado.'); 
        }
    }).catch(() => {
        showError(movieElement, 'Erro ao carregar os dados do filme.');
    });
}

function updateMovieElement(movieElement, data) {
    movieElement.innerHTML = `
        <div class="movie-details-grid">
            <div class="movie-poster">
                ${data.Poster !== "N/A" ? `<img src="${data.Poster}" alt="${data.Title}" onerror="this.src='placeholder.jpg'">` : `<div class="no-poster">Sem Poster</div>`}
            </div>
            <div class="movie-info">
                <h3>${data.Title}</h3>
                <div class="movie-meta">
                    <span class="year">${data.Year}</span>
                    <span class="rating">${data.Rated}</span>
                    <span class="runtime">${data.Runtime}</span>
                </div>
                <div class="genre-tags">
                    ${data.Genre.split(', ').map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
                <p class="plot">${data.Plot}</p>
                <div class="ratings">
                    ${data.Ratings.map(rating => `
                        <div class="rating-item">
                            <span class="rating-source">${rating.Source}</span>
                            <span class="rating-value">${rating.Value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showError(movieElement, message) {
    movieElement.innerHTML = `
        <div class="error-message">
            <i class="error-icon">⚠️</i>
            <p>${message}</p>
        </div>
    `;
}

function updateMovie(oldMovie, newMovie) {
    const index = movieCollection.indexOf(oldMovie); // Encontra o índice do filme antigo
    if (index !== -1 && newMovie.trim()) { // Verifica se o filme existe e o novo nome é válido
        movieCollection[index] = newMovie.trim(); // Atualiza o filme na coleção
        updateMovieList(); 
        showNotification(`Filme atualizado: "${oldMovie}" → "${newMovie}"`); 
    }
}

// Função para deletar um filme da coleção
function deleteMovie(movie) {
    const index = movieCollection.indexOf(movie); // Encontra o índice do filme
    if (index !== -1) {
        if (confirm(`Tem certeza que deseja excluir "${movie}" da sua lista?`)) { 
            movieCollection.splice(index, 1); // Remove o filme da coleção ; quantidade de elementos a serem removidos
            updateMovieList();
            showNotification(`Filme "${movie}" removido da lista`);
        }
    }
}

function updateMovieList() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; 

    // Para cada filme na coleção, cria um card na lista
    movieCollection.forEach((movie) => {
        const card = document.createElement('li');
        card.className = 'movie-card';
        
        const movieContent = document.createElement('div');
        movieContent.className = 'movie-content';
        
        const title = document.createElement('h3');
        title.className = 'movie-title';
        title.textContent = movie;
        
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';
        
        const detailsButton = document.createElement('button');
        detailsButton.className = 'action-button details-button';
        detailsButton.innerHTML = ' Detalhes';
        
        const editButton = document.createElement('button');
        editButton.className = 'action-button edit-button';
        editButton.innerHTML = ' Editar';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'action-button delete-button';
        deleteButton.innerHTML = ' Excluir';
        
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'movie-details-container';
        detailsContainer.style.display = 'none';
        
        // Ao clicar em "Detalhes", exibe ou esconde detalhes e chama `readMovie`
        detailsButton.onclick = () => {
            if (detailsContainer.style.display === 'none') {
                detailsContainer.style.display = 'block';
                readMovie(movie, detailsContainer);
                detailsButton.innerHTML = '<span class="button-icon"></span> Ocultar';
            } else {
                detailsContainer.style.display = 'none';
                detailsButton.innerHTML = '<span class="button-icon"></span> Detalhes';
            }
        };
        
        editButton.onclick = () => {
            const newMovie = prompt('Digite o novo nome do filme:', movie); 
            if (newMovie) updateMovie(movie, newMovie); // Atualiza o filme se o nome é válido
        };
        
        deleteButton.onclick = () => deleteMovie(movie);

        // Monta o card do filme com seus botões e detalhes
        buttonGroup.appendChild(detailsButton);
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        
        movieContent.appendChild(title);
        movieContent.appendChild(buttonGroup);
        movieContent.appendChild(detailsContainer);
        
        card.appendChild(movieContent);
        movieList.appendChild(card); // Adiciona o card na lista
    });
}

updateMovieList();



//Jikan API
const baseURL = "https://api.jikan.moe/v4";

// Array para armazenar favoritos
let favoritosAnimes = [];
let favoritosPersonagens = [];

const animeAleatorioDiv = document.getElementById("anime-aleatorio");
const personagemAleatorioDiv = document.getElementById("personagem-aleatorio");
const favoritosAnimesList = document.getElementById("favoritos-animes");
const favoritosPersonagensList = document.getElementById("favoritos-personagens");
const buscaInput = document.getElementById("busca-anime");
const buscaButton = document.getElementById("btn-busca");
const btnAnimeAleatorio = document.getElementById("btn-anime-aleatorio");

// Função para buscar dados da API
function fetchData(endpoint) {
    return fetch(`${baseURL}${endpoint}`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao buscar ${endpoint}`);
            return response.json();
        })
        .then(data => data.data || {})
        .catch(error => console.error(error));
}

// Funções para buscar anime e personagem aleatórios
function buscarAnimeAleatorio() {
    return fetchData("/random/anime");
}
function buscarPersonagemAleatorio() {
    return fetchData("/random/characters");
}

// Função para buscar animes pelo nome
function buscarAnimePorNome(nome) {
    return fetchData(`/anime?q=${encodeURIComponent(nome)}`);
}

function adicionarFavorito(lista, item, container) {
    // `.some()` retorna `true` se encontrar um item com o mesmo `mal_id`.
    if (!lista.some(fav => fav.mal_id === item.mal_id)) {
        
        lista.push(item);
        const li = document.createElement("li");
        
        // Define o texto do <li> com o título ou nome do item (dependendo de qual estiver disponível).
        li.textContent = item.title || item.name;
        container.appendChild(li);
        
        console.log(`${item.title || item.name} adicionado aos favoritos.`);
    } else {
        console.log(`${item.title || item.name} já está nos favoritos.`);
    }
}

// Função para atualizar o DOM com anime aleatório
function atualizarAnimeAleatorio(anime) {
    animeAleatorioDiv.innerHTML = `
        <h4>${anime.title}</h4>
        <img src="${anime.images?.jpg?.large_image_url || ''}" alt="${anime.title}">
        <p>${anime.synopsis || "Descrição não disponível"}</p>
        <button data-anime='${JSON.stringify({ title: anime.title, mal_id: anime.mal_id })}' onclick="adicionarAnimeFavorito(this)">Adicionar aos Favoritos</button>
    `;
}

// Função para atualizar o DOM com personagem aleatório
function atualizarPersonagemAleatorio(personagem) {
    personagemAleatorioDiv.innerHTML = `
        <h4>${personagem.name}</h4>
        <img src="${personagem.images?.jpg?.image_url || ''}" alt="${personagem.name}">
        <p>${personagem.about || "Descrição não disponível"}</p>
        <button data-personagem='${JSON.stringify({ name: personagem.name, mal_id: personagem.mal_id })}' onclick="adicionarPersonagemFavorito(this)">Adicionar aos Favoritos</button>
    `;
}

function adicionarPersonagemFavorito(button) {
    // Obtém os dados do personagem a partir do atributo 'data-personagem' do botão
    const personagem = JSON.parse(button.getAttribute('data-personagem'));
    adicionarFavorito(favoritosPersonagens, personagem, favoritosPersonagensList);
}

// Função para adicionar personagem aos favoritos a partir do botão
function adicionarPersonagemFavorito(button) {
    const personagem = JSON.parse(button.getAttribute('data-personagem'));
    adicionarFavorito(favoritosPersonagens, personagem, favoritosPersonagensList);
}

function executar() {
    btnAnimeAleatorio.addEventListener("click", () => {
        // Quando clicado, busca um anime aleatório e atualiza a interface com ele
        buscarAnimeAleatorio().then(anime => {
            atualizarAnimeAleatorio(anime);
        });
    });

    document.getElementById("btn-personagem").addEventListener("click", () => {
        // Quando clicado, busca um personagem aleatório e atualiza a interface com ele
        buscarPersonagemAleatorio().then(personagem => {
            atualizarPersonagemAleatorio(personagem);
        });
    });
}

    // Adicionar funcionalidade de busca de anime
    buscaButton.addEventListener("click", () => {
        const nomeAnime = buscaInput.value;
        buscarAnimePorNome(nomeAnime).then(animes => {
            animeAleatorioDiv.innerHTML = ""; 
            animes.forEach(anime => {
                const divAnime = document.createElement("div");
                divAnime.classList.add("anime");
                divAnime.innerHTML = `
                    <h4>${anime.title}</h4>
                    <img src="${anime.images?.jpg?.large_image_url || ''}" alt="${anime.title}">
                    <p>Descrição: ${anime.synopsis || "Descrição não disponível"}</p>
                    <button onclick='adicionarFavorito(favoritosAnimes, ${JSON.stringify({ title: anime.title, mal_id: anime.mal_id })}, favoritosAnimesList)'>Adicionar aos Favoritos</button>`;
                animeAleatorioDiv.appendChild(divAnime);
            });
        });
    });

document.addEventListener("DOMContentLoaded", executar);
