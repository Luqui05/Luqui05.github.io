document.addEventListener("DOMContentLoaded", (event) => {
    buscarInscritos();
    ativarModal();
    alterarTema();
    carregarTema();
});

function ativarModal() {
    const modal = document.querySelector(".modal");
    const regButton = document.getElementById("km-button");
    const closeButton = document.querySelector(".fechar");

    regButton.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });
    
    closeButton.addEventListener("click", (event) => {
        modal.classList.add("hidden");
    })
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
    button.addEventListener("click", function () {
        const tema = document.body.getAttribute("data-theme");
        const novoTema = tema === "dark" ? "light" : "dark";
        localStorage.setItem("tema", novoTema);
        document.body.setAttribute("data-theme", novoTema);
        button.textContent = novoTema === "dark" ? "🌙" : "🌞";
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
