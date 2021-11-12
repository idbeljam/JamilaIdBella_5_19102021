(async function main() {
  const productId = getArticleId();
  const product = await getProduct(productId);
  console.log(product.altTxt);
  displayProduct(product);
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (response) {
      return response.json();
    })

    .then(function (product) {
      return product;
    })

    .catch(function () {
      return alert(
        "Une erreur est survenue, veuillez contacter l'administrateur du site!!"
      );
    });
}

function displayProduct(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;

  product.colors.forEach((element) => {
    let option = document.createElement("option");
    option.setAttribute("value", element);
    option.textContent = element;
    document.getElementById("colors").appendChild(option);
  });
}

//récupération des informations selectionnés par l'utilisateur :

// selectionner valeur choisis dans couleurs

const btn_AjouterPanier = document.querySelector("#addToCart");
console.log(btn_AjouterPanier);

console.log(document.querySelector(".item__img"));

// AddEventListener  ecouter le bouton et envoyer le panier -------------------------
btn_AjouterPanier.addEventListener("click", (event) => {
  event.preventDefault();

  // récupération valeurs du formulaire :
  let optionsProduit = {
    idProduit: getArticleId(),
    quantite: document.querySelector("#quantity").value,
    colors: document.querySelector("#colors").value,
    name: document.querySelector("#title").textContent,
  };

  //Ajouter le produit dans le LocalStorage
  addProductToLocalStorage(optionsProduit);
});

function addProductToLocalStorage(selectProduct) {
  // recuperer le tableau de produit
  let tableauProduct = preparerPanier();

  //Si le panier est vide Ajouter l'element
  if (tableauProduct.length == 0) {
    addProduct(tableauProduct, selectProduct);
  }
  // si c'est pas le cas :
  else {
    //Parcourir le localStorage et vérifier si l'element ( meme id et meme couleur )  existe deja
    tableauProduct.forEach((element) => {
      //si element existe: mettre à jour qté
      if (
        element.idProduit == selectProduct.idProduit &&
        element.idColor == selectProduct.idColor
      ) {
        element.quantite =
          parseInt(element.quantite) + parseInt(selectProduct.quantite);
        // mettre à jour le localStorage
        updateLocalStorage(tableauProduct);
      }
      // sinon Ajouter l'element
      else {
        addProduct(tableauProduct, selectProduct);
      }
    });
  }
}

// Mettre à jour le local Storage avec le tableau resultat
function updateLocalStorage(tableau) {
  localStorage.setItem("produits", JSON.stringify(tableau));
}
// Inserer produit dans le localStorage
function addProduct(tableauProduct, produit) {
  //pusher le produit dans le tableau crée
  tableauProduct.push(produit);
  //mettre à jour localStorage
  updateLocalStorage(tableauProduct);
}

// renvoyer le tableau de localStorage
function preparerPanier() {
  let produitDansLocalStorage;
  if (JSON.parse(localStorage.getItem("produits"))) {
    // convertir données JSON du local storage en tableau
    produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
  } else {
    // initialiser un tableau vide
    produitDansLocalStorage = [];
  }

  return produitDansLocalStorage;
}
