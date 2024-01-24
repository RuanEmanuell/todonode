document.addEventListener('DOMContentLoaded', function () {
    const enviarBotao = document.getElementById('enviarButton');

    enviarBotao.addEventListener('click', function () {
        const nomeInput = document.getElementById('nomeInput');
        const nome = nomeInput.value;

        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checked: false, name: nome }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Resposta do servidor:', data);
            })
            .catch(error => {
                console.error('Erro ao enviar dados para o servidor:', error);
            });
        showTodoList();
        nomeInput.value = "";
    });
});

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
                const checkedButton = document.createElement('input');
                checkedButton.type = "checkbox";
                const todoDiv = document.createElement('div');
                todoDiv.className = "todoBox";
                todoDiv.innerHTML = `${todo.name}`;
                const editButton = document.createElement('button');
                editButton.textContent = '🖊️';
                editButton.onclick = function () { editTodo(todo._id, checkedButton.checked); };
                editButton.className = 'editButton';
                editButton.classList.add('button');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '🗑️'
                deleteButton.onclick = function () { deleteTodo(todo._id); };
                deleteButton.className = 'deleteButton';
                deleteButton.classList.add('button');
                checkedButton.checked = (todo.checked == true);
                checkedButton.onclick = function () {
                    checkbox(todo, todo._id, checkedButton.checked)
                };
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

function editTodo(todoId, checkValue) {
    const editValue = prompt("Digite um novo texto para o todo");
    if (editValue != null) {
        const todoData = { name: editValue, checked: checkValue };
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

function checkbox(todoId, checkValue) {
    const todoData = { name: todoId.name, checked: checkValue };
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


