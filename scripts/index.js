let bagItems;
onLoad();

function onLoad(){
let bagstr = localStorage.getItem('Bag-Items');
bagItems = bagstr ? JSON.parse(bagstr) : [];
displayOnHomePage();
displaybagcount();
}

function displayOnHomePage(){
  let itemsContainerElement = document.querySelector(".items_container");
  let innerHTML = '';
  if(!itemsContainerElement){
    return;
  }
  items.forEach(item => {
    innerHTML += `
      <div class="item_container">
        <img class="item_image" src="${item.image}" alt="Product image" />
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company_details">${item.company}</div>
        <div class="item_name">${item.item_name}</div>
        <div class="price">
          <span class="current_price">${item.current_price}</span>
          <span class="orignal_price">${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button
          class="add_to_bag"
          onclick="addtobag(${item.id});"
        >Add to Bag</button>
      </div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}

function addtobag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('Bag-Items',JSON.stringify(bagItems));
  displaybagcount();
}

function displaybagcount(){
  let bagcountElement = document.querySelector('.bagcount');
  if (bagItems.length > 0) {
    bagcountElement.innerText = bagItems.length;
    bagcountElement.style.visibility = 'visible';
  } else {
    bagcountElement.style.visibility = 'hidden';
  }
}
