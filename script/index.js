const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const productsAPI = 'http://localhost:3000/product'
const cartAPI = 'http://localhost:3000/cart'
const hostPort = 'http://localhost:5500/'

const viewCart = $('.header__cart-view-cart') // display product on cart page
const cartListItem = $('.header__cart-list-item') // display product on home page

// Slide Show

let slideIndex = 0

function showSlide(n) {
    slideIndex += n
    const slides = $$('.slide-item')
    const dots = $$('.dot')
    if (slideIndex >= slides.length) {
        slideIndex = 0
    }

    if (slideIndex < 0) {
        slideIndex = slides.length - 1
    }

    $('.slide-item.active').classList.remove('active')
    $('.dot.active').classList.remove('active')

    slides[slideIndex].classList.add('active')
    dots[slideIndex].classList.add('active')
}

function currentSlide(n) {
    slideIndex = 0;
    showSlide(n)
}
setInterval(() => showSlide(1), 3000)

// Products
function start() {
    getProducts(renderProducts)
}

start()

function getProducts(callback) {
    fetch(productsAPI)
        .then(response => response.json())
        .then(callback)
}

function renderProducts(products) {
    const listProducts = $('.home-product-list')
    const htmls = products.map((product) => {
        return `
                <div class="grid__column-3">
                <a class="home-product-item" href="#">
                    <div class="home-product-item__img"
                        style="background-image: url(${product.img})">
                    </div>
                    <h4 class="home-product-item__name">${product.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">${product.priceOld}</span>
                        <span class="home-product-item__price-current">${product.priceNew}</span>
                    </div>

                    <div class="home-product-item__action">
                        <span class="home-product-item__like home-product-item__like--liked">
                            <i class="home-product-item__like-icon-empty far fa-heart"></i>
                            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                        </span>
                        <div class="home-product-item__rating">
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>

                        <span class="home-product-item__sold">88 đã bán</span>
                    </div>

                    <button class="home-product-item__add btn" onclick="handleBtnAdd(this); 
                    handleAddProductToCart(${JSON.stringify(product).split('"').join("&quot;")})">Thêm vào giỏ hàng</button>

                    <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <span>Yêu thích</span>
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">${product.sale}%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>
        `
    })

    listProducts.innerHTML = htmls.join('')
}

function handleAddProductToCart(product) {
    var data = {
        "img": product.img,
        "name": product.name,
        "priceOld": product.priceOld,
        "priceNew": product.priceNew
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(cartAPI, options)
}

function handleBtnAdd(btnAdd) {
    console.log(btnAdd)
    btnAdd.disabled = "disabled";
    btnAdd.classList.add('btn--disable')
    btnAdd.innerText = "Đã mua"
}



viewCart.onclick = () => {
    window.location.href = hostPort + 'cart.html'
}



