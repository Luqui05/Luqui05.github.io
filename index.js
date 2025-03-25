document.addEventListener("DOMContentLoaded", (event) => {
    buscarInscritos();
})

function alterarTema() {
    const button = document.getElementById("mode");
    button.addEventListener('click', function () {
        const tema = document.body.getAttribute("data-theme")
        const novoTema = tema == 'dark' ? 'light' : 'dark';
        document.body.setAttribute("data-theme", novoTema);
        if (tema == 'dark') {
            button.textContent = "🌙";
        } else {
            button.textContent = "🌞";
        }
    })
}

function buscarInscritos() {
    const button = document.getElementById("fetch");
    button.addEventListener('click', function () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                const divInscritos = document.getElementById("inscritos")
                res.forEach(user => {
                    const novoParagrafo = document.createElement('p');
                    novoParagrafo.textContent = `Nome: ${user.name}`;
                    divInscritos.appendChild(novoParagrafo);
                });
            }).catch(e => console.log(e))
    })
}