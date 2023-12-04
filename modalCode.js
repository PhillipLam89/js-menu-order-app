closeModalBtn.onclick =
    () => myModal.style.display = 'none'

function editItem(e) {

  myModal.style.display = 'block'

  const chosenItemObj = menuItems.find(item => item.id == e.target.id)
  const {name,description,id,price,emoji} = chosenItemObj

  const prevValues = [name,description,price,emoji,id]
  const allInputs = document.querySelectorAll('.modal-content > input')

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = prevValues[i]
  }

  finalizeEdit.onclick = function() {
    const name = itemName.value.trim()
    const description = itemDesc.value.trim()
    const price = itemPrice.value.trim()
    const emoji = itemEmoji.value.trim()
    const obj = {name,description,id,price,emoji}
          obj.quantity = 1
    menuItems = menuItems.with(id, obj)
    myModal.style.display = 'none'
    renderDefaultMenu()
  }
}
