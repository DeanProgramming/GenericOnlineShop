if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){    
    var removedCartItemsButtons = document.getElementsByClassName('btn-danger') 
    for (var i = 0; i < removedCartItemsButtons.length; i++){
        var button = removedCartItemsButtons[i]
        button.addEventListener('click', removeCartItem)
    }  

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }  

    var addToCartButton = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButton.length; i++){
        var addCartButton = addToCartButton[i]
        addCartButton.addEventListener('click', addCartItem)
    }  

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
 
    var itemSelected = sessionStorage.getItem("itemSelected") 
    if (itemSelected != null){
        findSavedCartItem(itemSelected)
        sessionStorage.removeItem("itemSelected")
    }
}

function findSavedCartItem(selectedItem){ 
    var shopItemArray = document.getElementsByClassName('shop-item')
    for (var e = 0; e < shopItemArray.length; e++){ 
        var shopItem = shopItemArray[e] 
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText 

        if (title == selectedItem){ 
            var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText 
            var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
            addItemToCart (title, price, imageSrc)
        }
    } 
}

function purchaseClicked(event){
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}

function addCartItem(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText 
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText 
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart (title, price, imageSrc)
}

function addItemToCart(title, price, image){
    var cartRow = document.createElement('div') 
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerHTML == title){
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
                   
    cartRow.scrollIntoView({behavior: "smooth"})
    
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
}

function quantityChange(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }

    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var totalPrice = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] 
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('£', '')) 
        totalPrice = totalPrice + (price * quantityElement.value)
    } 

    totalPrice = Math.round(totalPrice * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerHTML = '£' + totalPrice
}