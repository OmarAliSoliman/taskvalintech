// define varables
const productSection = document.querySelector(".products_section .row");
const cartIcon = document.querySelector(".mynavbar .cart_card");
const htmlViewModal = document.querySelector("html");
const quickViewModal = document.querySelector(".quick_view_modal");
const closeQuickViewModal = document.querySelector(
  ".quick_view_modal .close_modal"
);
const cartList = document.querySelector(".mynavbar .cart_list ul");
const products = [
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
    added_to_cart: true,
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

// check
if (cartList.innerHTML.trim() == "") {
  console.log("empty");
  cartList.innerHTML = "No Product";
}

// append product cards
products.map((item) => {
  const product_item = `<div class="col-sm-12 col-md-6 col-lg-3">
    <div class="product_card">
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
        ${
          item.added_to_cart
            ? '<a href="" class="remove_from_cart remove_cart_btn" >Remove Item</a>'
            : '<a href="" class="add_to_cart add_cart_btn" >add Item</a>'
        }
        <a href="" class="quick_view" >Quick View</a>
      </div>
    </div>
    </div>`;

  productSection.innerHTML += product_item;
});

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
      let product_image = item.querySelector(".img_parent img").src;
      let product_name = item.querySelector(
        ".product_body .product_name"
      ).textContent;
      let product_price = item.querySelector(
        ".product_body .product_price"
      ).textContent;

      quickViewModal.querySelector(".modal_card_img img").src = product_image;
      quickViewModal.querySelector(".card_name").textContent = product_name;
      quickViewModal.querySelector(".card_price").textContent = product_price;

      htmlViewModal.classList.add("active_modal");
    });
});

closeQuickViewModal.addEventListener("click", function (e) {
  e.preventDefault();
  htmlViewModal.classList.remove("active_modal");
});


// add to cart list
document.querySelectorAll(".add_cart_btn").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let cartNumber = cartIcon.querySelector(".number").textContent;
    let parentElement = item.closest('.product_card');
    const cart_list = `<li>
        <div class="cart_list_card">
          <div class="cart_list_img">
            <div class="card_img">
              <div class="img_parent">
                <img src=${parentElement.querySelector(".img_parent img").src} alt="">
              </div>
            </div>
            <div class="card_name">${
              parentElement.querySelector(".product_body .product_name").textContent
            }</div>
          </div>
          <p class="cart_list_price">${
            parentElement.querySelector(".product_body .product_price").textContent
          } <span>$</span></p>
        </div>
      </li>`;

    if (cartList.innerHTML == "No Product") {
      cartList.innerHTML = cart_list;
    } else {
      cartList.innerHTML += cart_list;
    }

    cartIcon.querySelector(".number").textContent = parseInt(cartNumber) + 1;
  });
});


