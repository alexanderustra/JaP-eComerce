document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cartArray"));

  //--------------------------- añadiendo productos desde el local storage ---------------------------//
  function generateCart(cart) { // por las dudas no tocar xd
    generateProduct(cart)
  }

  function generateProduct(cart) {
    cart.forEach((product) => {
      fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)
        .then((response) => response.json())
        .then((data) => {
          if(data.currency === 'UYU') {
            let dolar = data.cost / 40;
            data.cost = dolar;
            data.currency = 'USD'
          }
          const li = document.createElement("li");
          li.classList.add("conteinerProduct");
          li.classList.add("conteinerProduct-cart");
          li.innerHTML = `
                  <div class="card">
                      <img src="${data.images[0]}" class="card-img-top" alt="${data.name}">
  
                      <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <p class="card-text">${data.cost} ${data.currency}</p>
                      
                      <p class="card-text"${data.soldCount}</p>
                      <input type='number' placeholder='1' min= '1' class='amount-inp'/>
                      <h2 style = "color:  #222222; font-size: 20px"> Total : <span class='total-amount'> ${data.cost} </span>${data.currency}</h2>
                      <a href="#" class="btn btn-primary cart delete-btns" product-id='${product}' id = 'add-to-cart'> <span class="material-symbols-outlined">
                      delete
                       </span></a>
                      </div>
                  </div>
                  `;
          document.getElementById("container").appendChild(li);
  
          //----------------------Eliminando productos del carrito----------------------/
          deleteProduct(li)
          // ------------- total costo ---------------------/
          totalCost(li,data) 
        })
        .catch((error) => console.log(error));
    });
  }

  //---------------- Mostrando el costo total según cantidad de productos ---------------//
  function totalCost(li,data) {
    
    let amountInput = li.querySelector(".amount-inp") ;
    let totalAmountSpan = li.querySelector(".total-amount");
    totalAmountSpan.innerHTML = data.cost;
    amountInput.addEventListener("input", () => {
      let amount = parseInt(amountInput.value, 10);
      let totalAmount = data.cost * amount;
      if(isNaN(totalAmount)) {
        totalAmount = data.cost;
      }
      totalAmountSpan.textContent = `${totalAmount}`;
    });
  }

  function deleteProduct(li) {
    let deleteBtns = document.querySelectorAll(".delete-btns");
          deleteBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              btn.closest(".conteinerProduct").remove();
              let productId = btn.getAttribute("product-id"); // Convertir a número
              let index = cart.indexOf(productId);
              //arreglaaaooo fuaaaaa loco AAAAAAAAAAAAAA
              if (index !== -1) {
                cart.splice(index, 1); 
                localStorage.setItem("cartArray", JSON.stringify(cart)); 
                li.remove();
              }
            });
          });
  }

                       //-------------------GENERANDO CARRITO -----------------//

  //------------------------------Trayendo productos desde la API------------------------------//

  fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then((response) => response.json())
    .then((data) => {
      data.articles.forEach((product) => {
        let productIdToAdd = `${product.id}`;
        if(!cart.includes(productIdToAdd)) {
          cart.push(productIdToAdd)
        }
        generateCart(cart)
    });
  }) 
});
