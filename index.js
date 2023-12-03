
const orderedItems = []
window.onload = function renderDefaultMenu() {
 mainDiv.innerHTML = menuItems.map((item) => {
    return `
    <section id=${item.id} class="menu-item-info">
      <h2>${item.name}<span>${item.emoji}</span></h2>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
      <button id=${item.id} class="add-item">Add to Cart</button>
    </section>
    <br>
    <hr>

  `
 }).join('')
} ()

mainDiv.onclick = addToCart

function addToCart(e) {
  if (e.target.className !== 'add-item') return
  const selectedItem =
      menuItems.find(item => item.id == e.target.id)

  const duplicatedItem =
    orderedItems.find(item => item.id == selectedItem.id)

  if (duplicatedItem) {
    selectedItem.quantity++
  } else orderedItems.push(selectedItem)
  renderOrder()
}

function renderOrder() {
  let str = ''
  orderedItems.map((item) => {
   str+= `
      <div id=${item.id} class="item-desc" >
       <p>${item.name}</p>
       <button>-</button><p>x<span>${item.quantity}</span></p><button>+</button>
       <button>remove</button>
       <p class="item-price"> $${item.price} each</p>
      </div>
      <br>
    `
  })
  orderDiv.innerHTML = str

  const quantityBtns = document.querySelectorAll('.item-desc > button')
  quantityBtns.forEach(btn => btn.onclick = handleQuantity)

  handleTotal()
}

function handleQuantity() {
  const newID = this.parentElement.id
  const index = orderedItems.findIndex(item => item.id == newID)

  if (this.textContent === 'remove') {
    clearItemHistory(index)
    renderOrder()
    return
  }

  this.textContent == '+' ? orderedItems[index].quantity++
                          : orderedItems[index].quantity--
  orderedItems[index].quantity == 0 &&  clearItemHistory(index)

  renderOrder()
}

function handleTotal() {
    totalDiv.textContent = orderedItems.reduce((current,next) =>
   (current + next.price * next.quantity) , 0)
}
function clearItemHistory(i) {
    orderedItems[i].quantity = 1
    orderedItems.splice(i,1)
}
