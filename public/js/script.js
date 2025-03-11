const API_URL = 'http://localhost:3000';

let currentType = '';
let currentId = null;

// Função para abrir o modal
function openModal(type, id = null) {
  currentType = type;
  currentId = id;
  const modalLabel = document.getElementById('modalLabel');
  const form = document.getElementById('form');

  modalLabel.textContent = id ? 'Editar' : 'Adicionar';
  form.innerHTML = '';

  if (type === 'aluno') {
    form.innerHTML = `
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" class="form-control" id="nome" required>
      </div>
      <div class="mb-3">
        <label for="idade" class="form-label">Idade</label>
        <input type="number" class="form-control" id="idade" required>
      </div>
      <div class="mb-3">
        <label for="turma" class="form-label">Turma</label>
        <input type="text" class="form-control" id="turma" required>
      </div>
    `;

    if (id) {
      fetch(`${API_URL}/${type}s/${id}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('nome').value = data.nome;
          document.getElementById('idade').value = data.idade;
          document.getElementById('turma').value = data.turma;
        })
        .catch(error => console.error('Erro ao carregar aluno:', error));
    }
  } else if (type === 'professor') {
    form.innerHTML = `
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" class="form-control" id="nome" required>
      </div>
      <div class="mb-3">
        <label for="disciplina" class="form-label">Disciplina</label>
        <select class="form-select" id="disciplina" required>
          <option value="">Selecione uma disciplina</option>
          <option value="Programação">Programação</option>
          <option value="Lógica Matemática">Lógica Matemática</option>
          <option value="Pré-Cálculo">Pré-Cálculo</option>
          <option value="Física">Física</option>
          <option value="Introdução a Computação">Introdução a Computação</option>
        </select>
      </div>
    `;

    if (id) {
      fetch(`${API_URL}/professores/${id}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('nome').value = data.nome;
          document.getElementById('disciplina').value = data.disciplina;
        })
        .catch(error => console.error('Erro ao carregar professor:', error));
    }
  } else if (type === 'boletim') {
    form.innerHTML = `
      <div class="mb-3">
        <label for="alunoId" class="form-label">ID do Aluno</label>
        <input type="number" class="form-control" id="alunoId" required>
      </div>
      <div class="mb-3">
        <label for="disciplina1" class="form-label">Programação</label>
        <input type="number" class="form-control" id="disciplina1" required>
      </div>
      <div class="mb-3">
        <label for="disciplina2" class="form-label">Lógica Matemática</label>
        <input type="number" class="form-control" id="disciplina2" required>
      </div>
      <div class="mb-3">
        <label for="disciplina3" class="form-label">Pré-Cálculo</label>
        <input type="number" class="form-control" id="disciplina3" required>
      </div>
      <div class="mb-3">
        <label for="disciplina4" class="form-label">Física</label>
        <input type="number" class="form-control" id="disciplina4" required>
      </div>
      <div class="mb-3">
        <label for="disciplina5" class="form-label">Introdução a Computação</label>
        <input type="number" class="form-control" id="disciplina5" required>
      </div>
    `;

    if (id) {
      fetch(`${API_URL}/boletins/${id}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('alunoId').value = data.alunoId;
          document.getElementById('disciplina1').value = data.disciplina1;
          document.getElementById('disciplina2').value = data.disciplina2;
          document.getElementById('disciplina3').value = data.disciplina3;
          document.getElementById('disciplina4').value = data.disciplina4;
          document.getElementById('disciplina5').value = data.disciplina5;
        })
        .catch(error => console.error('Erro ao carregar boletim:', error));
    }
  }

  const modal = new bootstrap.Modal(document.getElementById('modalForm'));
  modal.show();
}

// Função para salvar dados
async function save() {
  const formData = getFormData();
  const url = `${API_URL}/${currentType === 'professor' ? 'professores' : currentType === 'boletim' ? 'boletins' : 'alunos'}${currentId ? `/${currentId}` : ''}`;
  const method = currentId ? 'PUT' : 'POST';

  console.log(`Enviando dados para ${method} ${url}`, formData);

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    console.log('Resposta do servidor:', responseData);

    if (response.ok) {
      location.reload();
    } else {
      alert('Erro ao salvar os dados');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao salvar os dados');
  }
}

// Função para obter dados do formulário
function getFormData() {
  const form = document.getElementById('form');
  const inputs = form.querySelectorAll('input, select');
  const data = {};

  inputs.forEach(input => {
    if (input.type === 'number') {
      data[input.id] = input.value ? parseFloat(input.value) : 0;
    } else {
      data[input.id] = input.value.trim();
    }
  });

  console.log('Dados capturados:', data);
  return data;
}

// Função para carregar dados na tabela
async function loadData() {
  try {
    const [alunos, professores, boletins] = await Promise.all([
      fetch(`${API_URL}/alunos`).then(res => res.json()),
      fetch(`${API_URL}/professores`).then(res => res.json()),
      fetch(`${API_URL}/boletins`).then(res => res.json()),
    ]);

    renderTable('alunosTable', alunos, ['id', 'nome', 'idade', 'turma'], 'aluno');
    renderTable('professoresTable', professores, ['id', 'nome', 'disciplina'], 'professor');
    renderTable('boletinsTable', boletins, ['alunoId', 'disciplina1', 'disciplina2', 'disciplina3', 'disciplina4', 'disciplina5'], 'boletim');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

// Função para renderizar tabelas
function renderTable(tableId, data, fields, type) {
  const tableBody = document.getElementById(tableId);
  tableBody.innerHTML = data.map(item => `
    <tr>
      ${fields.map(field => `<td>${item[field]}</td>`).join('')}
      <td>
        <button class="btn btn-warning btn-sm" onclick="openModal('${type}', ${item.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem('${type}', ${item.id})">Excluir</button>
      </td>
    </tr>
  `).join('');
}

// Função para excluir um item
async function deleteItem(type, id) {
  if (!type || !id) {
    alert('Erro: Tipo ou ID inválido.');
    return;
  }

  if (confirm('Tem certeza que deseja excluir este item?')) {
    try {
      const response = await fetch(`${API_URL}/${type === 'professor' ? 'professores' : type === 'boletim' ? 'boletins' : 'alunos'}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        location.reload();
      } else {
        alert('Erro ao excluir item');
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  }
}

// Carregar dados ao iniciar
loadData();