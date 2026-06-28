import menuItems from './menuData.js'
let cart = []

menuItems.forEach(items=>{
    const exist= cart.find(item =>item.name===items.name)
    if(exist){
        exist.quantity = (exist.quantity ||1)+1
    }else{
        cart.push({...items, quantity:1})
    }
    
})
console.log(cart)


