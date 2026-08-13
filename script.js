const carrinho = {};

const cards = document.querySelectorAll(".card");
const contadorCarrinho = document.querySelector(".carrinho");

cards.forEach(function (card) {

    const produto = card.dataset.produto;

    const adicionar = card.querySelector(".adicionar");
    const remover = card.querySelector(".remover");
    const quantidade = card.querySelector(".quantidade");

    carrinho[produto] = 0;

    adicionar.addEventListener("click", function () {

        carrinho[produto]++;

        quantidade.textContent = carrinho[produto];

        atualizarCarrinho();
    });

    remover.addEventListener("click", function () {

        if (carrinho[produto] > 0) {

            carrinho[produto]--;

            quantidade.textContent = carrinho[produto];

            atualizarCarrinho();
        }
    });
});


function atualizarCarrinho() {

    let total = 0;

    for (const produto in carrinho) {
        total += carrinho[produto];
    }

    contadorCarrinho.textContent = "🛒 " + total;
}