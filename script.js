// Chave para identificar os dados salvos da aplicação no navegador
const STORAGE_KEY = 'prompts-storage';

// Estado para carregar os prompts salvos e exibir
const state = {
	prompts: [],
	selectedId: null,
}

// Seleção dos elementos por id
const elements = {
	promptTitle: document.getElementById('prompt-title'),
	promptContent: document.getElementById('prompt-content'),
	titleWrapper: document.getElementById('title-wrapper'),
	contentWrapper: document.getElementById('content-wrapper'),
	btnOpen: document.getElementById('btn-open'),
	btnCollapse: document.getElementById('btn-collapse'),
	sidebar: document.querySelector('.sidebar'),
	btnSave: document.getElementById('btn-save'),
};

// Atualiza o estado do wrapper conforme o conteúdo do elemento
function updateEditableWrapperState(element, wrapper) {
	const hasText = element.textContent.trim().length > 0;
	wrapper.classList.toggle('is-empty', !hasText)
}

// Atualiza o estado de todos os elementos editáveis
function updateAllEditableStates() {
	updateEditableWrapperState(elements.promptTitle, elements.titleWrapper);
	updateEditableWrapperState(elements.promptContent, elements.contentWrapper);
}

// Adiciona ouvintes de evento input para atualização em tempo real
function attachAllEditableHandlers() {
	elements.promptTitle.addEventListener('input', function() {
		updateEditableWrapperState(elements.promptTitle, elements.titleWrapper);
	});
	
	elements.promptContent.addEventListener('input', function() {
		updateEditableWrapperState(elements.promptContent, elements.contentWrapper);
	});
}

// Funções para abrir e fechar a sidebar
function openSidebar() {
	elements.sidebar.style.display = 'flex';
	elements.btnOpen.style.display = 'none';
}

function closeSidebar() {
	elements.sidebar.style.display = 'none';
	elements.btnOpen.style.display = 'block';
}

function save() {
	const title = elements.promptTitle.textContent.trim();
	const content = elements.promptContent.innerHTML.trim();
	const hasContent = elements.promptContent.textContent.trim();

	if (!title || !hasContent) {
		alert('Por favor, preencha tanto o título quanto o conteúdo do prompt antes de salvar.');
		return;
	}

	if (state.selectedId) {

	} else {
		const newPrompt = {
			id: Date.now().toString(36),
			title,
			content,
		}

		state.prompts.unshift(newPrompt);
		state.selectedId = newPrompt.id;
	}

	persist();
}

function persist() {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts));
		alert('Prompt salvo com sucesso!');
	} catch (error) {
		console.log('Erro ao salvar no localStorage:', error);
	}
}

// Eventos dos botões
elements.btnSave.addEventListener('click', save);

// Função de inicialização
function init() {
	attachAllEditableHandlers();
	updateAllEditableStates();

	// Estado inicial da sidebar, botão de abrir escondido
	elements.sidebar.style.display = '';
	elements.btnOpen.style.display = 'none';

	// Eventos para abrir e fechar a sidebar
	elements.btnOpen.addEventListener('click', openSidebar);
	elements.btnCollapse.addEventListener('click', closeSidebar);
}

// Executa a inicialização ao carregar o script
init();
