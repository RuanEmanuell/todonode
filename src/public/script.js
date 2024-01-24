document.addEventListener('DOMContentLoaded', function () {
    // Captura do botão de envio e adição de um ouvinte de evento de clique
    const enviarBotao = document.getElementById('enviarButton');
    enviarBotao.addEventListener('click', function () {
        // Captura do input de nome e obtenção do valor
        const nomeInput = document.getElementById('nomeInput');
        const nome = nomeInput.value;

        // Requisição Fetch para adicionar um novo usuário
        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Corpo da requisição contendo o nome e checked como 'false'
            body: JSON.stringify({ checked: 'false', name: nome }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados para o servidor:', error);
        });

        // Atualização da lista de todos e limpeza do input de nome
        showTodoList();
        nomeInput.value = "";
    });

});

// Ouvinte de evento de carregamento da página para mostrar a lista de todos
document.addEventListener('DOMContentLoaded', function () {
    showTodoList();
});

function showTodoList() {
    fetch('/user/list-todos')
        .then(response => response.json())
        .then(todos => {
            const listaUsuarios = document.getElementById('list-todos');
            listaUsuarios.innerHTML = '';

            todos.forEach(todo => {
                const todoDiv = document.createElement('div');
                todoDiv.className = "todoBox";

                // Adiciona classe se o todo está marcado
                if (todo.checked === 'true') {
                    todoDiv.classList.add('todoChecked');
                }

                todoDiv.innerHTML = `${todo.name}`;

                // Função utilitária para criar botões
                const createButton = (text, className, clickHandler) => {
                    const button = document.createElement('button');
                    button.textContent = text;
                    button.className = className + ' button'; // Adiciona 'button' a todas as classes
                    button.onclick = clickHandler;
                    return button;
                };

                const checkedButton = createButton(todo.checked === 'true' ? '🟦' : '🔲', 'checkedButton', () => {
                    editTodo(todo._id, todo.name, todo.checked, true);
                });

                const editButton = createButton('🖊️', 'editButton', () => {
                    editTodo(todo._id, todo.name, todo.checked, false);
                });

                const deleteButton = createButton('🗑️', 'deleteButton', () => {
                    deleteTodo(todo._id);
                });

                checkedButton.checked = (todo.checked === 'true');
                todoDiv.appendChild(checkedButton);
                todoDiv.appendChild(editButton);
                todoDiv.appendChild(deleteButton);
                listaUsuarios.appendChild(todoDiv);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
}

function deleteTodo(todoId) {
    fetch(`/user/${todoId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            showTodoList();
        })
        .catch(error => console.error('Erro ao deletar:', error));
}

function editTodo(todoId, todoName, checkValue, isCheckClick) {
    let editValue = todoName;
    let todoCheck = checkValue === 'true';

    if (!isCheckClick) {
        // Se não for um clique no checkbox, solicita um novo texto
        editValue = prompt("Digite um novo texto para o todo");
    } else {
        // Se for um clique no checkbox, inverte o valor do checked
        todoCheck = !todoCheck;
    }

    if (editValue != null) {
        const todoData = { name: editValue, checked: todoCheck };
        fetch(`/user/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoData)
        })
        .then(response => response.json())
        .then(data => {
            showTodoList();
        })
        .catch(error => console.error('Erro ao editar:', error));
    }
}

