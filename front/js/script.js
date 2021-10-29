//1/invoquer l'api

function callAPI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })

    .catch(function () {
      return alert(
        "Une erreur est survenue, veuillez contacter l'administrateur du site!!"
      );
    });
}

function scanProduct(products) {
  return products
    .map((element) => {
      //3/afficher le produit en cours sur le html
      return ` 
      <a href="./product.html?id=${element._id}">
        <article><img src="${element.imageUrl}" alt="${element.altTxt}">
        <h3 class="productName">${element.name}</h3>
        <p class="productDescription">${element.description}</p></article>
      </a> 
      `;
    })
    .join(""); // retire les ","
}

// fonction afficher dans la page index.html via DOM

function displayProducts(contenair, products) {
  contenair.innerHTML = scanProduct(products);
}

// stock emplacement html
const items = document.getElementById("items");
// déclare l'url de l'API
const url = "http://localhost:3000/api/products";

function main() {
  callAPI(url).then((data) => displayProducts(items, data));
}

main();
