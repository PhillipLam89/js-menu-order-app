closeModalBtn.onclick =
    () => myModal.style.display = 'none'

function editItem(e) {
  myModal.style.display = 'block'

  const chosenItemObj = menuItems.find(item => item.id == e.target.id)
  const {name,description,id,price,emoji} = chosenItemObj

  const prevValues = [name,description,price,emoji,id]
  console.log(prevValues)
  const allInputs = document.querySelectorAll('.modal-content > input')

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = prevValues[i]
  }

}
function handleEdit(name,description, price, emoji) {

}
