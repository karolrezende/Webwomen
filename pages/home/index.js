const mainItems = document.querySelector('.main-items')
const cart = document.querySelector('.cart-items')
const cartEmpty = document.querySelector('.cart-empty')


function render(){
    jobsData.forEach(element => {
        mainItems.innerHTML += `
        <div class="main-items--item margin-top--1 padding">
            <div class='items-item'>
                <h3 class="title-4">${element.title}</h3>
                <div class="main-tags">
                    <span class="text-3">${element.enterprise}</span>
                    <span class="text-3">${element.location}</span>
                </div> 
                <p class="text-1">${element.descrition}</p>
                <span class="text-3 item-tag">${element.modalities[0]}</span>
                <button class="button-1 padding--button" onclick=addCart(${element.id})>Candidatar</button>
            </div>
        </div>`
    })
}
render()

let cartAdd = JSON.parse(localStorage.getItem('cart')) || []

renderCartItems()

function addCart(id){
    if (cartAdd.some(element => element.id === id)){
        alert("Elemento já selecionado")
    }else{
        let cartVar = jobsData.find(element => element.id === id)
        cartAdd.push({
            ...cartVar
        })
    }
    renderCartItems()

}
function renderCartItems(){
    
        cart.innerHTML = ''
        cartAdd.forEach(element=>{
            cart.innerHTML += `
                <div class="cart-item margin-top--2 items-item">
                    <div class="cart-item--header ">
                        <h3 class="title-4">${element.title}</h3>
                        <button class="cart-remove" onclick='delet(${element.id})'><img src='/assets/img/trash.svg'></button>
                    </div>
                    <div class="cart-item-tag">
                        <span class="text-3">${element.enterprise}</span>
                        <span class="text-3">${element.location}</span>
                    </div>
                </div>
            `
        })
        localStorage.setItem('cart', JSON.stringify(cartAdd))

}
function delet(id){
    cartAdd = cartAdd.filter(element => id !== element.id)
    renderCartItems()

}
function emptyCart(){
    if(cartAdd.length === 0){
        cartEmpty.textContent = "Você não adicionou nada ao carrinho!"
    }else{
        renderCartItems()
    }
}
