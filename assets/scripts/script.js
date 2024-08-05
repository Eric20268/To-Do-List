document.addEventListener('DOMContentLoaded', () => {
  let listaTarefasString = localStorage.getItem('tarefas')

  if (listaTarefasString) {
    let tarefas = JSON.parse(listaTarefasString)
    tarefas.forEach(tarefa => {
      listaTarefas.innerHTML += `<li class="item-lista">
                    <div class="input-edit-container">
                        <input type="text" class="input-edit editar-texto" autofocus maxlength="30">
                        <button class="btn-edit-confirm">Confirmar</button>
                    </div>
                    <span class="texto-item">${tarefa}</span>
                    <div class="botoes">
                        <i class="bi bi-check-lg btn-concluir"></i>
                        <i class="bi bi-pencil-fill btn-editar"></i>
                        <i class="bi bi-x-lg btn-excluir"></i>
                    </div>
                </li>`

      const botoesRemover = document.querySelectorAll('.btn-excluir')
      botoesRemover.forEach(botao => {
        botao.addEventListener('click', removerItems)
      })
      function removerItems () {
        this.parentElement.parentElement.remove()
      }

      marcarConcluido()

      const botoesEditar = document.querySelectorAll('.btn-editar')
      botoesEditar.forEach(button => {
        button.addEventListener('click', () => {
          let inputContainer =
            button.parentElement.parentElement.firstElementChild

          inputContainer.classList.toggle('editar')

          let input = inputContainer.querySelector('.editar-texto')
          input.value =
            inputContainer.parentElement.querySelector(
              '.texto-item'
            ).textContent

          let botaoConfirm = inputContainer.querySelector('.btn-edit-confirm')
          botaoConfirm.addEventListener('click', () => {
            inputContainer.parentElement.querySelector(
              '.texto-item'
            ).textContent = input.value
            inputContainer.classList.remove('editar')
          })
        })
      })
    })
  }
})

function adicionarItems () {
  let tarefa = inputTarefa.value

  listaTarefas.innerHTML += `<li class="item-lista">
                    <div class="input-edit-container">
                        <input type="text" class="input-edit editar-texto" autofocus maxlength="30">
                        <button class="btn-edit-confirm">Confirmar</button>
                    </div>
                    <span class="texto-item">${tarefa}</span>
                    <div class="botoes">
                        <i class="bi bi-check-lg btn-concluir"></i>
                        <i class="bi bi-pencil-fill btn-editar"></i>
                        <i class="bi bi-x-lg btn-excluir"></i>
                    </div>
                </li>`

  inputTarefa.value = ''

  const botoesRemover = document.querySelectorAll('.btn-excluir')
  botoesRemover.forEach(botao => {
    botao.addEventListener('click', removerItems)
  })
  function removerItems () {
    this.parentElement.parentElement.remove()
  }

  const botoesEditar = document.querySelectorAll('.btn-editar')
  botoesEditar.forEach(button => {
    button.addEventListener('click', () => {
      let inputContainer = button.parentElement.parentElement.firstElementChild

      inputContainer.classList.toggle('editar')

      let input = inputContainer.querySelector('.editar-texto')
      input.value =
        inputContainer.parentElement.querySelector('.texto-item').textContent

      let botaoConfirm = inputContainer.querySelector('.btn-edit-confirm')
      botaoConfirm.addEventListener('click', () => {
        inputContainer.parentElement.querySelector('.texto-item').textContent =
          input.value
        inputContainer.classList.remove('editar')
      })
    })
  })
}

function marcarConcluido () {
  const botoesConcluidos = document.querySelectorAll('.btn-concluir')
  botoesConcluidos.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.parentElement.classList.toggle('concluido')
    })
  })
}

function armazenarItems () {
  var listaTarefasGlobal = []

  const tarefas = document.querySelectorAll('.texto-item')
  tarefas.forEach(tarefa => {
    listaTarefasGlobal.push(tarefa.textContent)
  })

  var listaTarefasGlobalString = JSON.stringify(listaTarefasGlobal)
  localStorage.setItem('tarefas', listaTarefasGlobalString)
}

const inputTarefa = document.querySelector('#tarefaInput')
const listaTarefas = document.querySelector('.tarefas-list')

const btnAdicionarTarefa = document.querySelector('#btn-adicionar-tarefa')
btnAdicionarTarefa.addEventListener('click', adicionarItems)
btnAdicionarTarefa.addEventListener('click', marcarConcluido)

setInterval(armazenarItems, 3000)
