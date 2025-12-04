const input = document.querySelector("#itemInput");
const button = document.querySelector("#addItemBtn");
const lista = document.querySelector("#lista");

let itens = JSON.parse(localStorage.getItem("itens")) || [];

function salvarLista() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

function renderizarLista() {
  lista.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = item.nome;

    if (item.comprado) li.classList.add("comprado");

    texto.addEventListener("click", () => {
      item.comprado = !item.comprado;
      salvarLista();
      renderizarLista();
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✎";
    btnEditar.className = "editBtn";

    btnEditar.addEventListener("click", (e) => {
      e.stopPropagation();
      const novoTexto = prompt("Editar item:", item.nome);

      if (novoTexto && novoTexto.trim() !== "") {
        item.nome = novoTexto.trim();
        salvarLista();
        renderizarLista();
      }
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "X";
    btnExcluir.className = "deleteBtn";

    btnExcluir.addEventListener("click", (e) => {
      e.stopPropagation();
      itens.splice(index, 1);
      salvarLista();
      renderizarLista();
    });

    li.appendChild(texto);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
  });
}

button.addEventListener("click", () => {
  const nomeItem = input.value.trim();

  if (nomeItem !== "") {
    itens.push({ nome: nomeItem, comprado: false });
    input.value = "";
    salvarLista();
    renderizarLista();
  }
});

renderizarLista();
