const BASE_URL = 'https://api.datamuse.com/sug';

const input = document.getElementById('search-suggestions');
const suggestionsList = document.getElementById('suggestions-list');
let timerId;

input.addEventListener('input', onInput);

function onInput(){
    if (input.value.length === 0){
        clearSuggestions();
        return;
    }

    clearTimeout(timerId);
    timerId = setTimeout(searchAndAddSuggestions, 500);
}

function clearSuggestions() {
    clearTimeout(timerId);
    suggestionsList.innerHTML = '';
}

async function searchAndAddSuggestions(){
    const url = new URL(BASE_URL);
    url.searchParams.set('s', input.value);
    
    const response = await fetch(url);
    const suggestions = await response.json();

    const fragment = document.createDocumentFragment();
    suggestions.forEach( ({word}) => {
        fragment.appendChild(createSuggestionListItem(word));
    })

    suggestionsList.replaceChildren(fragment);
}

function createSuggestionListItem(word){
    const li = document.createElement('li');
    li.textContent = word;
    li.addEventListener('click', () => {
        input.value = word;
        clearSuggestions();
    });

    return li;
}

