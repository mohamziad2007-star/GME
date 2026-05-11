let cart = [];

function openCart() {
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-overlay").classList.add("open");
}

function closeCart() {
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-overlay").classList.remove("open");
}


function buy(btn) {
    let container = btn.closest(".perfume-card") || btn.closest(".container") || btn.closest(".product-card");

    let nameEl = container.querySelector("h3");
    let name;
    if (nameEl) {
        name = nameEl.innerText;
    } 
    else {
        let imgSrc = container.querySelector("img").src;
        let filename = imgSrc.split(/[\\/]/).pop().replace(/\.[^.]+$/, "");
        name = "Item #" + filename;
    }

    let img = container.querySelector("img").src;

    let priceText = container.querySelector(".price").innerText;
    let price = parseInt(priceText.replace(/\D/g, ""));

    let sizeElement = container.querySelector(".proud-size");
    let size = sizeElement ? sizeElement.value : "Standard";


    let countElement = container.querySelector('.min-js');
    if (countElement) {
        let num = parseInt(countElement.innerText);
        if (num > 0) {
            num--;
            countElement.innerText = num;
        }
        if (num === 0) {
            btn.innerText = 'SOLD OUT';
            btn.disabled = true;
        }
    }

    cart.push({ name, price, size, img, qty: 1 });
    updateCartUI();
    showToast("Added " + name + " to cart");
}

function updateCartUI() {
    let cartBody = document.getElementById("cart-body");
    let count = document.getElementById("cart-trigger-count");
    let badge = document.getElementById("drawer-badge");
    let checkoutBtn = document.getElementById("checkout-btn");

    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = '<div class="cart-empty-state"><span class="cart-empty-icon">🛒</span><p class="cart-empty-text">Your cart is empty</p></div>';
    } else {
        cart.forEach(function(item, index) {
            cartBody.innerHTML += '<div class="cart-item"><div class="cart-item-thumb"><img src="' + item.img + '" alt="product"></div><div class="cart-item-details"><div class="cart-item-name">' + item.name + '</div><div class="cart-item-variant">Size: ' + item.size.toUpperCase() + '</div><div class="cart-item-line-price">' + item.price + '$</div></div><button class="remove-btn" onclick="removeItem(' + index + ')">&times;</button></div>';
        });
    }

    count.innerText = cart.length;
    badge.innerText = cart.length;
    checkoutBtn.disabled = (cart.length === 0);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function showToast(msg) {
    let toast = document.getElementById("cart-toast");
    let text = document.getElementById("cart-toast-msg");
    text.innerText = msg;
    toast.classList.add("show"); 
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}

function handleCheckout() {
    alert("Checkout coming soon!");
}
