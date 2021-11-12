//récuperer le panier (array) via le localStorage en JSon

let tableauProduits = localStorage.getItem("produits");

console.log(tableauProduits);

//convertir en tableau JS

tableauProduits = JSON.parse(tableauProduits);

console.log(tableauProduits);

//parcourir l'array bouclé avec balise htmlw
displayCart();

function displayCart(products) {
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

//Créer et insérer des éléments dans la Page panier
