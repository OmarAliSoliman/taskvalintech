// define varables
const productSection = document.querySelector(".products_section .row");
const cartIcon = document.querySelector(".mynavbar .cart_card");
var cartListNumber = document.querySelector(".mynavbar .cart_card .number")
const htmlViewModal = document.querySelector("html");
const quickViewModal = document.querySelector(".quick_view_modal");
const closeQuickViewModal = document.querySelector(
  ".quick_view_modal .close_modal"
);
const cartList = document.querySelector(".mynavbar .cart_list ul");
const cartListfromStorage = JSON.parse(localStorage.getItem("cartListStorage"));
if (cartListfromStorage !== null) {
  // console.log(cartListfromStorage);
  cartList.innerHTML = cartListfromStorage
  cartListNumber.textContent = JSON.parse(localStorage.getItem("cartListStorageNumber"));
}

const productsarry = [
  {
    product_name: "Woden Chair",
    product_price: "100",
    product_image: "./assets/images/product-1.jpg",
    added_to_cart: false,
  },
  {
    product_name: "white Chair",
    product_price: "150",
    product_image: "./assets/images/product-2.jpg",
    added_to_cart: false,
  },
  {
    product_name: "green tall chair",
    product_price: "200",
    product_image: "./assets/images/product-3.jpg",
    added_to_cart: false,
  },
  {
    product_name: "white wood table",
    product_price: "250",
    product_image: "./assets/images/product-4.jpg",
    added_to_cart: false,
  },
  {
    product_name: "gray Chair",
    product_price: "300",
    product_image: "./assets/images/product-5.jpg",
    added_to_cart: false,
  },
  {
    product_name: "amizing table",
    product_price: "350",
    product_image: "./assets/images/product-6.jpg",
    added_to_cart: false,
  },
  {
    product_name: "ensted tables",
    product_price: "400",
    product_image: "./assets/images/product-7.jpg",
    added_to_cart: false,
  },
  {
    product_name: "black table",
    product_price: "450",
    product_image: "./assets/images/product-8.jpg",
    added_to_cart: false,
  },
];

var products;
const localProducts = localStorage.getItem("products");
if (localProducts === null) {
  products = productsarry;
  localStorage.setItem("products", JSON.stringify(products));
} else {
  products = JSON.parse(localStorage.getItem("products"));
  // console.log("yes")
}


// var cart_list_local = cartList.querySelectorAll('li');
// console.log(cart_list_local);
// localStorage.setItem("cartListItem", JSON.stringify(cart_list_local));  


// console.log(products);
// check
if (cartList.innerHTML.trim() == "") {
  // console.log("empty");
  cartList.innerHTML = "No Product";
}

// append product cards
const drawTheProduct = () => {
  products.map((item, index) => {
    const product_item = `<div class="col-sm-12 col-md-6 col-lg-3">
      <div class="product_card" data-index=${index}>
        <div class="product_image">
          <div class="img_parent">
            <img src=${item.product_image} alt="product-1">
          </div>
        </div>
        <div class="product_body">
          <h5 class="product_name">${item.product_name}</h5>
          <p class="product_price">${item.product_price}</p>
        </div>
        <div class="card_option">
          ${item.added_to_cart
        ? '<a href="" class="c_oprion remove_from_cart" >Remove Item</a>'
        : '<a href="" class="c_oprion add_to_cart" >add Item</a>'
      }
          <a href="" class="quick_view" >Quick View</a>
        </div>
      </div>
      </div>`;

    productSection.innerHTML += product_item;
  });
}
drawTheProduct();

// toggle open/close cart shoppign
cartIcon.addEventListener("click", function () {
  // const target = this.parentElement.children[1];
  const target = this.parentElement.querySelector(".cart_list");
  target.classList.toggle("active_cart");
});


// toggle open/close quick view modal
document.querySelectorAll(".product_card").forEach((item) => {
  item
    .querySelector(".card_option .quick_view")
    .addEventListener("click", function (e) {
      e.preventDefault();
      let dataIndex = item.getAttribute("data-index");
      let product_image = item.querySelector(".img_parent img").src;
      let product_name = item.querySelector(
        ".product_body .product_name"
      ).textContent;
      let product_price = item.querySelector(
        ".product_body .product_price"
      ).textContent;
      let cardOption = item.querySelector(".card_option .c_oprion").cloneNode(true);
      // console.log(cardOption);
      // console.log(quickViewModal.querySelector(".card_option a"));

      quickViewModal.querySelector(".modal_card_img img").src = product_image;
      quickViewModal.querySelector(".card_name").textContent = product_name;
      quickViewModal.querySelector(".card_price").textContent = product_price;
      quickViewModal.querySelector(".card_option").appendChild(cardOption);
      quickViewModal.querySelector(".modal_card_parent").setAttribute('data-index', dataIndex);


      htmlViewModal.classList.add("active_modal");
    });
});

closeQuickViewModal.addEventListener("click", function (e) {
  e.preventDefault();
  htmlViewModal.classList.remove("active_modal");
  this.closest('.modal_parent').querySelector('.card_option').innerHTML = "";
});


function addToCart(e, item, type) {
  e.preventDefault();
  cartListNumber = document.querySelector(".mynavbar .cart_card .number")
  // let cartNumber = cartIcon.querySelector(".number").textContent;
  var parentElement;
  if (type == 'modal') {
    parentElement = item.parentElement.parentElement.parentElement;
  } else {
    parentElement = item.parentElement.parentElement;
  }
  const prod_index = parentElement.getAttribute('data-index');

  const cart_list = `<li data-index=${prod_index}>
      <div class="cart_list_card">
        <div class="cart_list_img">
          <div class="card_img">
            <div class="img_parent">
              <img src=${parentElement.querySelector(".img_parent img").src} alt="">
            </div>
          </div>
          <div class="card_name">${parentElement.querySelector(".product_body .product_name").textContent}</div>
        </div>
        <p class="cart_list_price">${parentElement.querySelector(".product_body .product_price").textContent
    } <span>$</span></p>
      </div>
    </li>`;

  if (cartList.innerHTML == "No Product") {
    cartList.innerHTML = cart_list;
  } else {
    cartList.innerHTML += cart_list;
  }


  // console.log("add_cart_icon_number" + parseInt(cartNumber))

  item.textContent = 'Remove Item';
  item.className = 'c_oprion remove_from_cart';
  if(type == 'modal'){
    const ele = document.querySelector(`.products_section .product_card[data-index='${prod_index}'`);
    ele.querySelector('.add_to_cart').textContent = 'Remove Item';
    ele.querySelector('.add_to_cart').className = 'c_oprion remove_from_cart';
  }
  // item.addEventListener('click', function() {
  //   removeFromCart(e, item);
  // });
  // console.log(prod_index)

  // save products status to localstorage
  products[prod_index].added_to_cart = true;
  localStorage.setItem('products', JSON.stringify(products))
  // console.log(parseInt(cartListNumber.textContent));
  cartListNumber.textContent = parseInt(cartListNumber.textContent) + 1;

  // save cartlist to localstorage
  var cartListStorage = document.querySelectorAll('.mynavbar .cart_list ul')[0].innerHTML;
  // console.log(cartListStorage)
  localStorage.setItem('cartListStorage', JSON.stringify(cartListStorage));
  localStorage.setItem('cartListStorageNumber', parseInt(cartListNumber.textContent));

}



// remove from cart
function removeFromCart(e, item, type) {
  e.preventDefault();
  cartListNumber = document.querySelector(".mynavbar .cart_card .number")
  var parentElement;
  if (type == 'modal') {
    parentElement = item.parentElement.parentElement.parentElement;
  } else {
    parentElement = item.parentElement.parentElement;
  }
  const prod_index = parentElement.getAttribute('data-index');

  cartList.querySelectorAll('li').forEach((item, index) => {
    if (item.getAttribute('data-index') === prod_index) {
      item.remove();
    }
  })

  if (cartList.innerHTML == "") {
    cartList.innerHTML = "No Product";
  }


  item.textContent = 'Add Item';
  item.className = 'c_oprion add_to_cart';
  if(type == 'modal'){
    const ele = document.querySelector(`.products_section .product_card[data-index='${prod_index}'`);
    ele.querySelector('.remove_from_cart').textContent = 'Add Item';
    ele.querySelector('.remove_from_cart').className = 'c_oprion add_to_cart';
  }
  // item.addEventListener('click', function() {
  //   addToCart(e, item);
  // });

  // save products status to localstorage
  products[prod_index].added_to_cart = false;
  localStorage.setItem('products', JSON.stringify(products))
  // console.log(parseInt(cartListNumber.textContent));
  cartListNumber.textContent = parseInt(cartListNumber.textContent) - 1;


  // save cartlist to localstorage
  var cartListStorage = document.querySelectorAll('.mynavbar .cart_list ul')[0].innerHTML;
  // console.log(cartListStorage)
  localStorage.setItem('cartListStorage', JSON.stringify(cartListStorage));
  localStorage.setItem('cartListStorageNumber', parseInt(cartListNumber.textContent));

}




// product click to add to cart list - remove from cart list
const container = document.querySelector('.main_content .row');
container.addEventListener('click', function (e) {
  // But only alert for elements that have an alert-button class
  if (e.target.classList.contains('add_to_cart')) {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement)
    const item = e.target;
    addToCart(e, item, 'card')
  } else if (e.target.classList.contains('remove_from_cart')) {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement)
    const item = e.target;
    removeFromCart(e, item, 'card')
  }
});


// modal click to add to cart list - remove from cart list
const momdalPreview = document.querySelector('.modal_parent .wrapper');
momdalPreview.addEventListener('click', function (e) {
  // But only alert for elements that have an alert-button class
  if (e.target.classList.contains('add_to_cart')) {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement.parentElement)
    const item = e.target;
    addToCart(e, item, 'modal')
  } else if (e.target.classList.contains('remove_from_cart')) {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement.parentElement)
    const item = e.target;
    removeFromCart(e, item, 'modal')
  }
});




// document.querySelectorAll(".add_to_cart").forEach((item, index) => {
//   item.addEventListener("click", function (e) {
//     addToCart(e, item);
//   });
// });


// remove from cart list
// document.querySelectorAll(".remove_from_cart").forEach((item, index)=>{
//   item.addEventListener('click', function(e){
//     removeFromCart(e, item);
//   })
// })

