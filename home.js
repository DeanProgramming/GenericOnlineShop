if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready(){    
    var buyNowButtons = document.getElementsByClassName('home-btn') 
    for (var i = 0; i < buyNowButtons.length; i++){
        var button = buyNowButtons[i]
        button.addEventListener('click', goToShop)
    } 

    var navButtons = document.getElementsByClassName('main-nav') 
    for (var i = 0; i < navButtons.length; i++){
        var navbutton = navButtons[i]
        navbutton.addEventListener('click', wipeItemSelected)
    } 
}

function wipeItemSelected(event){
    sessionStorage.clear()
}

function goToShop(event){
    var buttonParent = event.target  
    var itemName = buttonParent.parentElement.getElementsByClassName('home-name')[0].innerText 
    sessionStorage.setItem("itemSelected", itemName)     
    window.open("store.html", '_self')
}