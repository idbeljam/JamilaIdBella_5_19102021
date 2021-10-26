const url_products = "http://localhost:3000/api/products";

//1/invoquer l'api
callAPI(url_products);

function callAPI(url) {
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })

    .then(function (products) {
      //2/traiter la reponse
      scanProduct(products);
    })
    .catch(function (error) {
      console.log(error);
      alert(
        "Une erreur est survenue, veuillez contacter l'administrateur du site!!"
      );
    });
}
function scanProduct(listProducts) {
  console.log(listProducts);
  /* listProducts.forEach(product => {
    console.log("elements : "+product._id);
  });*/

  let html = "";
  for (let product of listProducts) {
    //3/afficher le produit en cours sur le html
    html +=
      ' <a href="./product.html?id="' +
      product._id +
      '"><article><img src="' +
      product.imageUrl +
      '" alt="' +
      product.altTxt +
      '"><h3 class="productName">' +
      product.name +
      '</h3><p class="productDescription">' +
      product.description +
      "</p></article></a>";
  }
  displayProducts(html);

  /*
  for(let k  in listProducts )
  {
    console.log("forIn : "+listProducts[k]._id);
  }

  for(let i=0; i<listProducts.length; i++)
 {
  console.log('element '+ i +'est:'+listProducts[i]._id);
 }*/
}

function displayProducts(htmlAllProducts) {
  document.getElementById("items").innerHTML = htmlAllProducts;
}
