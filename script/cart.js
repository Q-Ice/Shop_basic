const productAPI = 'http://localhost:3000/cart'

const totalPrice = document.querySelector('.home-product-totals__price')


function start() {
    getProducts(renderProducts)
}
start()

function getProducts(callback) {
    fetch(productAPI)
        .then(response => response.json())
        .then(callback)
}


function renderProducts(products) {
    let totalPriceProduct = 0;
    const homeProduct = document.querySelector('.home-product')
    const htmls = products.map((product) => {
        totalPriceProduct += parseInt(product.priceNew)
        return `
            <div class="home-product-item" product-id="${product.id}">
                <img class="home-product-item__img" src="${product.img}" alt="">
                <h4 class="home-product-item__name">${product.name}</h4>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${product.priceOld}đ</span>
                    <span class="home-product-item__price-current">${product.priceNew}đ</span>
                </div>
                <input type="number" class="home-product-item__quantity" 
                name="quantity" min="1" max="5" value="1" onchange="handleUpdatePrice(${product.id})">
                <span class="home-product-item__total">900000đ</span>
                <span class="home-product-item__remove" onclick="handleDeleteProduct(${product.id})">Xóa</span>
            </div>
        `
    })

    homeProduct.innerHTML = htmls.join('')
    totalPrice.innerText = totalPriceProduct
}

function handleDeleteProduct(id) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch(productAPI + '/' + id, options)
        .then(response => response.json())
        .then(() => {
            const product = document.querySelector(`[product-id='${id}']`)
            const priceCurrent = product.querySelector('.home-product-item__total')
            if (product) {
                const total = parseInt(totalPrice.innerText) - parseInt(priceCurrent.innerText)
                totalPrice.innerText = total
                product.remove()
            }
        })
}

function getProduct(id, callback) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch(productAPI + '/' + id, options)
        .then(response => response.json())
        .then(callback)
}

function handleUpdatePrice(id) {
    const productId = document.querySelector(`[product-id='${id}']`)
    const quantity = productId.querySelector('.home-product-item__quantity')
    const priceUpdate = productId.querySelector('.home-product-item__total')
    getProduct(id, (product) => {
        var priceTotal = parseInt(totalPrice.innerText)
        priceTotal = priceTotal - parseInt(priceUpdate.innerText)
        const total = product.priceNew * quantity.value
        priceTotal += total
        priceUpdate.innerText = total
        totalPrice.innerText = priceTotal
    })

}