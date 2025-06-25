let bagItemsObject;
onLoad();
function onLoad(){
    loadBagitem();
    displayBagItem();
    displayprice();
}
function loadBagitem(){
bagItemsObject=bagItems.map(itemsId =>{
    for(let i=0;i<items.length;i++){
        if(itemsId==items[i].id){
            return items[i];
        }
    }
})
}
function displayBagItem(){
let bagitemElement = document.querySelector('.bag-items-container');
let innerHTML= '';
bagItemsObject.forEach(bagItems => {
 innerHTML += generateHtml(bagItems);
});
bagitemElement.innerHTML= innerHTML;
}

function generateHtml(item){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div onclick="removerBAgItem(${item.id});" class="remove-from-cart"><span class="material-symbols-outlined">
close
</span></div>
          </div>
`;
}

function removerBAgItem(itemId){
bagItems=bagItems.filter(bagItemsid => bagItemsid != itemId);
localStorage.setItem('Bag-Items',JSON.stringify(bagItems));
loadBagitem();
  displaybagcount();
displayBagItem();
displayprice();
}


function displayprice(){

   let bagsummaryElement=document.querySelector('.bag-summary'); 
    if (bagItems.length == 0) {
    bagsummaryElement.innerHTML = `<div class="emptybagMain">
    <span class="material-symbols-outlined j">production_quantity_limits</span>
    <div class="empty-bag-message"><h2>Hey,it feels so light!</h2>
    <span class="tex">
    There is nothing in your Bag, Let's add some items.
    </span></div>
    <button onclick="window.location.href='https://super-duper-meme-69xxx65qg44c46wv-5500.app.github.dev/'"><a href="https://super-duper-meme-69xxx65qg44c46wv-5500.app.github.dev/">Continue Shopping</a>
    </button></div>`;
    bagsummaryElement.classList.add("js-emptybagMain");
    return;
  }
  console.log(bagItems.length);
   let orignal_price=0;
   let discount_price=0;
   let convenience_fee=99;
  bagItemsObject.forEach(bagItems=>{
    orignal_price += bagItems.original_price;
    discount_price += bagItems.original_price-bagItems.current_price;
  });
  let total_amount = orignal_price-discount_price+convenience_fee;
 let innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${orignal_price}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${discount_price}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenience_fee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${total_amount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
`;
bagsummaryElement.innerHTML = innerHTML;
}