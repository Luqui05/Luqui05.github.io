document.addEventListener("DOMContentLoaded", (event) => {
  buscarInscritos();
  ativarModal();
  alterarTema();
  carregarTema();
});

let idiomaAtual = "pt";

function alterarIdioma() {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt"; // alterna o idioma
  carregarIdioma(idiomaAtual);                      // carrega as traduções
}

function carregarIdioma(idioma) {
  fetch(`json/${idioma}.json`)
    .then((data) => data.json())
    .then((data) => {
      traduzirPágina(data);
    });
}

function traduzirPágina(linguagem) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    console.log(key);
    if (linguagem[key]) {
        element.textContent = linguagem[key];
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    console.log(element);
    const key = element.getAttribute("data-i18n");
    console.log(key);
    if (linguagem[key]) {
        element.setAttribute('alt', linguagem[key]);
    }
  });
}

function ativarModal() {
  const modal = document.querySelector(".modal");
  const regButton = document.getElementById("km-button");
  const closeButton = document.querySelector(".fechar");

  regButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeButton.addEventListener("click", (event) => {
    modal.classList.add("hidden");
  });
}

function carregarTema() {
  const temaSalvo = localStorage.getItem("tema");
  const button = document.getElementById("mode");
  if (temaSalvo) {
    document.body.setAttribute("data-theme", temaSalvo);
    button.textContent = temaSalvo === "dark" ? "🌙" : "🌞";
  }
}

function alterarTema() {
  const button = document.getElementById("mode");
  const closeModalButton = document.querySelector(".fechar");
  button.addEventListener("click", function () {
    const tema = document.body.getAttribute("data-theme");
    const novoTema = tema === "dark" ? "light" : "dark";
    localStorage.setItem("tema", novoTema);
    document.body.setAttribute("data-theme", novoTema);
    button.textContent = novoTema === "dark" ? "🌙" : "🌞";
    closeModalButton.style.color = novoTema === "dark" ? "#fff" : "#000";
  });
}

function buscarInscritos() {
  const button = document.getElementById("fetch");
  button.addEventListener("click", function () {
    fetch("json/inscritos.json")
      .then((res) => res.json())
      .then((res) => {
        const divInscritos = document.getElementById("inscritos");
        res.forEach((user) => {
          const novoParagrafo = document.createElement("p");
          novoParagrafo.textContent = `Nome: ${user.nome}`;
          divInscritos.appendChild(novoParagrafo);
        });
      })
      .catch((e) => console.log(e));
  });
}
