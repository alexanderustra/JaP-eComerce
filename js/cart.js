document.addEventListener("DOMContentLoaded", () => {
  //------------------------------Trayendo productos desde la API------------------------------//

  fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then((response) => response.json())
    .then((data) => {
      data.articles.forEach((product) => {
        console.log(product);
        const li = document.createElement("li");
        li.classList.add("conteinerProduct");
        li.classList.add("conteinerProduct-cart");
        li.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">

                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.unitCost} ${product.currency}</p>
                
                <p class="card-text"${product.soldCount}</p>
                <input type='number' placeholder='1' min= '1' class='amount-inp'/>
                <h2 style = "color:  #222222; font-size: 20px"> Total : <span class='total-amount'> ${product.unitCost} USD</span> ${product.currency}</h2>
                <a href="#" class="btn btn-primary cart delete-btns" product-id='${product}' id = 'add-to-cart'> <span class="material-symbols-outlined">
                delete
                 </span></a>
                </div>
            </div>
            `;
        document.getElementById("container").appendChild(li);
        //---------------- Mostrando el costo total según cantidad de productos ---------------//

        let amountInput = li.querySelector(".amount-inp");
        let totalAmountSpan = li.querySelector(".total-amount");
        totalAmountSpan.innerHTML = product.unitCost;
        amountInput.addEventListener("input", () => {
          let amount = parseInt(amountInput.value, 10);
          let totalAmount = product.unitCost * amount;
          totalAmountSpan.textContent = `${totalAmount} ${product.currency}`;
        });
      });
    });

  //--------------------------- añadiendo productos desde el local storage ---------------------------//
  let cart = JSON.parse(localStorage.getItem("cartArray"));
  cart.forEach((product) => {
    console.log(product);
    fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const li = document.createElement("li");
        li.classList.add("conteinerProduct");
        li.classList.add("conteinerProduct-cart");
        li.innerHTML = `
                <div class="card">
                    <img src="${data.images[0]}" class="card-img-top" alt="${data.name}">

                    <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.cost} ${data.currency}</p>
                    
                    <p class="card-text">${data.description}</p>
                    <p class="card-text"${data.soldCount}</p>
                    <input type='number' placeholder='1' min= '1' class='amount-inp'/>
                    <h2 style = "color:  #222222; font-size: 20px"> Total : <span class='total-amount'> ${data.cost} USD</span> ${data.currency}</h2>
                    <a href="#" class="btn btn-primary cart delete-btns" product-id='${product}' id = 'add-to-cart'> <span class="material-symbols-outlined">
                    delete
                     </span></a>
                    </div>
                </div>
                `;
        document.getElementById("container").appendChild(li);

        //---------------- Mostrando el costo total según cantidad de productos ---------------//

        let amountInput = li.querySelector(".amount-inp") ;
        let totalAmountSpan = li.querySelector(".total-amount");
        totalAmountSpan.innerHTML = data.cost;
        amountInput.addEventListener("input", () => {
          let amount = parseInt(amountInput.value, 10);
          let totalAmount = data.cost * amount;
          totalAmountSpan.textContent = `${totalAmount} ${data.currency}`;
        });

        //----------------------Eliminando productos del carrito----------------------//
        let deleteBtns = document.querySelectorAll(".delete-btns");
        deleteBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.closest(".conteinerProduct").remove();
            let productId = btn.getAttribute("product-id"); // Convertir a número
            let index = cart.indexOf(productId);
            console.log(index);
            // macumba acá cuidao
            if (cart.length > 2) {
              if (index !== -1) {
                cart.splice(index, 1);
                localStorage.setItem("cartArray", JSON.stringify(cart));
              }
            } else {
              cart.splice(index + 1, 1);
              localStorage.setItem("cartArray", JSON.stringify(cart));
            }
          });
        });
      })
      .catch((error) => console.log(error));
  });
});
