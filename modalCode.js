closeModalBtn.onclick =
    () => myModal.style.display = 'none'

function editItem(e) {
  //handles modal popping up && pre-filling edit-values for each item
  myModal.style.display = 'block'

  const chosenItemObj = menuItems.find(item => item.id == e.target.id)
  const {name,description,id,price,emoji} = chosenItemObj

  const prevValues = [name,description,price,emoji,id]
  const allInputs = document.querySelectorAll('.modal-content > input')

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = prevValues[i]
  }

  finalizeEdit.onclick = function() {
    myModal.style.display = 'none'
    const name = itemName.value.trim()
    const description = itemDesc.value.trim()
    const price = ~~itemPrice.value.trim()
    const emoji = itemEmoji.value.trim()
    const obj = {name,description,id,price,emoji}
          obj.quantity = 1

    const target = document.querySelector(`.section-${id}`)
    target.innerHTML = `
    <h2>${name}<span>${emoji}</span></h2>
      <p>${description}</p>
      <p>Price: $${price}</p>
      <button id=${id} class="add-item">Add to Cart</button>
      <section class="admin-tools">
        <button id=${id}>edit</button>
        <button id=${id}>DELETE</button>
      </section>
    `// this is the new item info
    const allAddCarts = document.querySelectorAll('.add-item')
    allAddCarts.forEach(tag => tag.disabled = true)
    showAdminTools()
    adminListeners()
      //code below replaces the OG item in menuItems array with newly edited item
    const replaceIndex = menuItems.findIndex(item => item.id == obj.id)
    menuItems = menuItems.with(replaceIndex, obj)
  }
}
