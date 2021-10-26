main();

async function main() {
  const produits = await getProduits();
  for (produit of produits) {
    displayProduit(produit);
  }
}

function getProduits() {
  return fetch("http://localhost:3000/api/products")
    .then(function (reponse) {
      return reponse.json();
    })

    .then(function (produits) {
      return produits;
    })
    .catch(function (erreur) {
      alert(error);
    });
}

function displayProduit() {
  document.getElementById(items).innerHTML = produits[0];
}
