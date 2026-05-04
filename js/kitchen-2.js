
// الكود ده هيشتغل أول ما الصفحة تحمل
document.addEventListener('DOMContentLoaded', () => {
    
    // هنجيب كل زراير "أضف إلى السلة" اللي في الصفحة
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    // هنخلي كل زرار يشتغل لوحده لما تدوس عليه
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            // نحدد الكارت اللي جواه الزرار ده
            const card = this.closest('.product-card');

            // نسحب الاسم
            const name = card.querySelector('.product-title').innerText;

            // نسحب السعر ونشيل منه حروف EGP عشان يبقى رقم بس
            const priceText = card.querySelector('.product-price').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));

            // نسحب الكمية
            const quantity = parseInt(card.querySelector('.qty-input').value);

            // نجهز المنتج
            const product = { name: name, price: price, quantity: quantity };

            // نجيب السلة القديمة أو نعمل واحدة جديدة
            let cart = JSON.parse(localStorage.getItem('myCart')) || [];

            // نزود المنتج أو نحدث كميته
            const existingProductIndex = cart.findIndex(item => item.name === name);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push(product);
            }

            // نحفظ في المتصفح
            localStorage.setItem('myCart', JSON.stringify(cart));
            alert('تم إضافة ' + name + ' للسلة بنجاح!');
        });
    });

    // تشغيل عرض السلة لو إحنا في صفحة cart.html
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
});

// دالة عرض السلة في صفحة الفاتورة
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('myCart')) || [];
    const tableBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    if (tableBody) {
        tableBody.innerHTML = '';
        cartItems.forEach((item) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            tableBody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price} EGP</td>
                    <td>${item.quantity}</td>
                    <td>${subtotal} EGP</td>
                </tr>
            `;
        });
        totalPriceElement.innerText = total + ' EGP';
    }
}

// دالة مسح السلة
function clearCart() {
    localStorage.removeItem('myCart');
    location.reload();
}