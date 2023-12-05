let currentUser = 'guest'
const guestPageInfo = headerDiv.innerHTML
const users = {
  guest: {
    accessLevel: 0,
    userName: '',
    password: ''
  },
  owner: {
    accessLevel: 100,
    userName: 'admin',
    password: 'abc'
  }
}


function handleLogin(userName, pw) {
  const allAdminFields = document.querySelectorAll('.admin-tools')
  const allCartBtns = document.querySelectorAll('.add-item')

  if (logBtn.textContent === 'Log out') {
    handleLogOut()
    return
  }
  allLogin = userName+pw
  if (allLogin === users.owner.userName + users.owner.password) {
    titleTag.textContent = 'WELCOME, OWNER'
    currentUser = 'owner'
    orderDiv.innerHTML = ''
    orderedItems.length = 0
    allCartBtns.forEach(btn => btn.disabled = true)
    allAdminFields.forEach(field =>
         field.style.display = 'unset')
    adminListeners()
  } else alert('INVALID USER/PW COMBO')

  //disabled add-to-cart when logged in as admin
  document.querySelectorAll('input').forEach(tag => {
    tag.value = ''
    if (currentUser !== 'guest') tag.style.display = 'none'
  })
  logBtn.textContent = currentUser === 'guest' ? 'Log in' : 'Log out'
}
function handleLogOut() {
  headerDiv.innerHTML = guestPageInfo
  currentUser = 'guest'
  renderDefaultMenu()
  adminListeners()
}

function adminListeners(){
const allAdminBtns = document.querySelectorAll('.admin-tools > button')
allAdminBtns.forEach(btn => {
  if (btn.textContent === 'DELETE') {
    btn.onclick = deleteItem
  } else {
    btn.onclick = editItem //editItem function is on modal.js file
  }
})
}


function deleteItem(e) { //requires admin access

  const properIndex = menuItems.findIndex(item => item.id == e.target.id)
  menuItems.splice(properIndex, 1)
  renderDefaultMenu()
  adminListeners()
  const allCartBtns = document.querySelectorAll('.add-item')
  allCartBtns.forEach(btn => btn.disabled = true)
  showAdminTools()
}

function showAdminTools() {
  const allAdminBtns = document.querySelectorAll('.admin-tools')

  allAdminBtns.forEach(field => field.style.display = 'unset')
}
