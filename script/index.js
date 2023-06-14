let contador = 0
let valorTotal = 0
let divCartProducts = document.getElementsByClassName("cart-products")[0]

function createItens(list) {
    let section = document.getElementsByClassName("main-cards")[0]
    let ul = document.createElement('ul')
    ul.classList.add('main-cards__list')

    for(i = 0; i < list.length; i++){
        let li = document.createElement('li')
        let img = document.createElement('img')
        let tag = document.createElement('span')
        let name = document.createElement('h3')
        let description = document.createElement('p')
        let value = document.createElement('p')
        let link = document.createElement('button')

        if(contador === 0){
            divCartProducts.classList.add('none')  
        }

        li.classList.add('card')
        tag.classList.add('tag')
        description.classList.add('description')
        value.classList.add('value')

        img.src = list[i].img
        tag.innerText = list[i].tag
        name.innerText = list[i].nameItem
        description.innerText = list[i].description
        value.innerText = `R$ ${list[i].value}.00`
        link.innerText = list[i].addCart
        link.id = list[i].id
        
        section.appendChild(ul)
        ul.appendChild(li)
        li.appendChild(img)
        li.appendChild(tag)
        li.appendChild(name)
        li.appendChild(description)
        li.appendChild(value)
        li.appendChild(link)

        link.addEventListener('click', function(e){
            let id = e.target.id;
            let display = document.querySelector('.cart-empty')
            
            createCardCart(list, id)

            if(contador > 0){
                display.classList.add('none')
                divCartProducts.classList.remove('none')
            }
        })
    }
    
}

function removeCards(){
    let removeUl = document.querySelector('.main-cards__list')
    if(removeUl != undefined || null){
        removeUl.remove()
    }
}

let all = document.getElementsByClassName('header-menu__all')[0];
let accessories = document.getElementsByClassName('header-menu__accessories')[0];
let tshirt = document.getElementsByClassName('header-menu__t-shirt')[0];

all.addEventListener('click', function(){
    removeCards()
    createItens(data)
})
accessories.addEventListener('click', function(){
    let filtro = []
    for(i = 0; i < data.length; i++){
    if(data[i].tag == "Acessórios"){
        filtro.push(data[i])
    }}
    removeCards()
    createItens(filtro)
})
tshirt.addEventListener('click', function(){
    let filtro = []
    for(i = 0; i < data.length; i++){
    if(data[i].tag == "Camisetas"){
        filtro.push(data[i])
    }}
    removeCards()
    createItens(filtro)
})

createItens(data)

function findProduct(id, list){
    for(let i = 0; i<list.length ; i++){
        if(list[i].id == id ){
            return list[i];
        }
    }
}


function createCardCart(list, i){    
    let iten = findProduct(i, list)
    
    let numOfProduct = document.querySelector('#contador')
    contador++
    numOfProduct.innerText = `${contador}`

    let valorDoCarrinho = document.getElementsByClassName("details-values__R$")[0]
    valorTotal = iten.value + valorTotal
    valorDoCarrinho.innerText = `R$ ${valorTotal},00`

    let ul = document.getElementsByClassName("cart-list")[0]
    
    let li = document.createElement('li')
    let img = document.createElement('img')
    let div = document.createElement('div')
    let name = document.createElement('h3')
    let value = document.createElement('p')
    let link = document.createElement('button')

      
    li.classList.add('cart-itens')
    img.src = iten.img
    name.innerText = iten.nameItem
    value.innerText = `R$ ${iten.value}.00`
    link.innerText = 'Remover do carrinho'

    ul.appendChild(li)
    li.append(img, div)
    div.append(name, value, link)

    link.addEventListener('click', function(e){
        let cartItem = e.composedPath();
        let display = document.querySelector('.cart-empty')

        cartItem[2].remove();
        contador--
        numOfProduct.innerText = `${contador}`

        valorTotal = valorTotal - iten.value 
        valorDoCarrinho.innerText = `R$ ${valorTotal},00`

        if(contador === 0){
            display.classList.remove('none')
            divCartProducts.classList.add('none')
        }
    })
}

let searchButton = document.querySelector('.search-button')

searchButton.addEventListener('click', function () {
    let input = document.querySelector('.search-input').value
    input = input.toUpperCase();
    let listAllProduct = []
    let listRenderItens = []

    for(i = 0; i < data.length; i++){
        listAllProduct.push(data[i].nameItem) 
    }
    
    for(i = 0; i < listAllProduct.length; i++){
        if (input.length !== 0){
            if (listAllProduct[i].toUpperCase().includes(input)){
                listRenderItens.push(data[i])
            }
        } else (
            listRenderItens = data
        )
    }

    console.log(input)
    console.log(listAllProduct)
    console.log(listRenderItens)

    removeCards()
    createItens(listRenderItens)
})
