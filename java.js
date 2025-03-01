const btnCart= document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add("cart-active");
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove("cart-active");
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();
}

function loadContent(){
    //remove food item from cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //product Item change Event
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    //Product add-cart

    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });

    updateTotal();

}
//remove item
function removeItem(){
    if(confirm("Are You Sure To Remove")){
        let title=this.parentElement.querySelector('.cart-dress-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();

 }
}

//change Quantity

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}


let itemList=[];

//AddCart

function addCart(){
    let dress=this.parentElement;
    let title=dress.querySelector('.dress-title').innerHTML;
    let price=dress.querySelector('.dress-price').innerHTML;
    let imgSrc=dress.querySelector('.dress-img').src;

    // console.log(title,price,imgSrc);

let newProduct= {title,price,imgSrc}  

//check product already exist in cart
if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product Already Added In Cart");
        return;
     }else{
        itemList.push(newProduct);
     }

let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');

cartBasket.append(element); 
loadContent();   


}

function createCartProduct(title,price,imgSrc){
    return`  <div class="cart-box">
                    <img src="${imgSrc}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-dress-title">${title}</div>
                        <div class="price-box">
                            <div class="cart-price">${price}</div>
                            <div class="cart-amt">${price}</div>
                        </div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <ion-icon name="trash" class="cart-remove"></ion-icon>
                </div>`;

}

function updateTotal(){
   const cartItems=document.querySelectorAll('.cart-box');
   const totalValue=document.querySelector('.total-price');

   let total=0;

   cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qyt=product.querySelector('.cart-quantity').value;
    total+=(price*qyt);
    product.querySelector('.cart-amt').innerText="Rs."+price*qyt;

   });
   
   totalValue.innerHTML='Rs.'+total;

   //Add Product Count In Cart Icon

   const cartCount=document.querySelector('.cart-count');
   let count= itemList.length;
   cartCount.innerHTML=count;

   if(count==0){
      cartCount.style.display='none';
   }else{
      cartCount.style.display='block';
   }
}


