//Элементы HTML

    //1. Вкладки главной страницы Admin
    const userTableTab = document.querySelector('#userTable-tab') // Вкладка User table

    //2. Вкладка New users
    const formSaveUser = document.getElementById('formSaveUser') // Форма Add new user
    const inputName = formSaveUser.querySelector('#name') // Input name
    const inputSername = formSaveUser.querySelector('#sername') // Input Sername
    const inputAge = formSaveUser.querySelector('#age') // Input Age
    const inputUsername = formSaveUser.querySelector('#username') // Input Username
    const inputPassword = formSaveUser.querySelector('#password') // Input Password
    const inputRole = formSaveUser.querySelector('#roles') // Input Role


    //3. Модальное окно editUser
    const userEditModal = document.getElementById('editUser') // модальное окно


    //4. Поля формы модального окна editUser
    const formEditUser = document.getElementById('formEditUser') // Форма Edit User
    const inputEditId = formEditUser.querySelector('#idEdit') // Input id
    const inputEditName = formEditUser.querySelector('#nameEdit') // Input name
    const inputEditSername = formEditUser.querySelector('#sernameEdit') // Input Sername
    const inputEditAge = formEditUser.querySelector('#ageEdit') // Input Age
    const inputEditUsername = formEditUser.querySelector('#usernameEdit') // Input Username
    const inputEditPassword = formEditUser.querySelector('#passwordEdit') // Input Password
    const inputEditRole = formEditUser.querySelector('#rolesEdit') // Input Role

    const btnCloseEditForm = formEditUser.querySelector('#btnCloseEditForm') // Кнопка закрытия модального окна

    //5. Модальное окно deleteUser
    const userDeleteModal = document.getElementById('deleteUser') // модальное окно


    //6. Поля формы модального окна deleteUser
    const formDeleteUser = document.getElementById('formDeleteUser') // Форма Delete User
    const inputDeleteId = formDeleteUser.querySelector('#idDelete') // Input id
    const inputDeleteName = formDeleteUser.querySelector('#nameDelete') // Input name
    const inputDeleteSername = formDeleteUser.querySelector('#sernameDelete') // Input Sername
    const inputDeleteAge = formDeleteUser.querySelector('#ageDelete') // Input Age
    const inputDeleteUsername = formDeleteUser.querySelector('#usernameDelete') // Input Username
    const inputDeletePassword = formDeleteUser.querySelector('#passwordDelete') // Input Password

    const btnCloseDeleteForm = formDeleteUser.querySelector('#btnCloseDeleteForm') // Кнопка закрытия модального окна


// ФУНКЦИИ

// Заполнение таблицы пользователей
function ListAllUsers () {

    const url = 'http://localhost:8080/api/users'
    const tableUsersBody = document.querySelector('#tableUsersBody')

    fetch(url)
        .then(res => {return res.json()})
        .then(data=>{data.findIndex(
            function(user){
                const row = document.createElement('tr')
                row.className = 'border-bottom border-white text-center'
                tableUsersBody.append(row)

                row.insertAdjacentHTML('beforeend', `<td>${user.id}</td>`)
                row.insertAdjacentHTML('beforeend', `<td>${user.name}</td>`)
                row.insertAdjacentHTML('beforeend', `<td>${user.sername}</td>`)
                row.insertAdjacentHTML('beforeend', `<td>${user.age}</td>`)
                row.insertAdjacentHTML('beforeend', `<td>${user.username}</td>`)


                let textContentRoles = "";
                user.role.forEach(element => {
                    textContentRoles += element.contextName + " "
                })

                row.insertAdjacentHTML('beforeend', `<td>${textContentRoles}</td>`)

                row.insertAdjacentHTML('beforeend', `<td><button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser" data-bs-whatever="${user.id}" id="btnEdit">Изменить</button></td>`)
                row.insertAdjacentHTML('beforeend', `<td><button type="submit" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteUser" data-bs-whatever="${user.id}" id="btnDelete">Удалить</button></td>`)
            })
        })
}

// Обновление таблицы пользователей
function updateTableAllUsers () {
    const tableUsersBody = document.querySelector('#tableUsersBody')
    tableUsersBody.remove()
    const tableUsers = document.querySelector('#tableUsers')
    tableUsers.insertAdjacentHTML('beforeend', `<tbody id="tableUsersBody"></tbody>`)
    ListAllUsers()
}


if (userTableTab.getAttribute('aria-selected')==='true') {ListAllUsers()}


// СОБЫТИЯ
// Нажатие на кнопку вкладки User table
userTableTab.addEventListener('click', clickUserTableTab)

// Нажатие кнопки отправки на форме Add new user
formSaveUser.addEventListener('submit', submitFormHandler)

// Открытие модального окна Edit User
userEditModal.addEventListener('show.bs.modal', openUserEditModal)

//Фокус на input пароля в форме Edit User
inputEditPassword.addEventListener('focus', focusInputEditPassword)

// Нажатие кнопки отправки на форме Edit User
formEditUser.addEventListener('submit', submitFormEditUserHandler)

// Нажатие кнопки закрытия модального окна Edit User
btnCloseEditForm.addEventListener('click', closeFormEditUserHandler)

// Открытие модального окна Delete User
userDeleteModal.addEventListener('show.bs.modal', openUserDeleteModal)

// Нажатие кнопки отправки на форме Delete User
formDeleteUser.addEventListener('submit', submitFormDeleteUserHandler)




// ОБРАБОТЧИКИ СОБЫТИЙ

// Нажатие на кнопку вкладки User table
function clickUserTableTab() {
    formSaveUser.reset()
}

// Нажатие кнопки отправки на форме Add new user
function submitFormHandler(event) {

    event.preventDefault()

    const roles = []
    for(let i=0; i<inputRole.options.length; ++i) {

        const role = {
            id: inputRole.options[i].value,
            name: "ROLE_"+inputRole.options[i].text,
            contextName: inputRole.options[i].text
        }

        if(inputRole.options[i].selected == true){
            roles[roles.length] = role
        }
    }
    const newUser = {
        name: inputName.value,
        sername: inputSername.value,
        age: inputAge.value,
        username: inputUsername.value,
        password: inputPassword.value,
        role: roles
    }


    const urlSaveUser = 'http://localhost:8080/api'
    fetch(urlSaveUser, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(responce => responce.json())
        .then(responce=>console.log(responce))
        .then(()=> {
            inputName.value = ''
            inputSername.value = ''
            inputAge.value = ''
            inputUsername.value = ''
            inputPassword.value = ''
            inputRole.value = ''
        })
        .then(()=>{updateTableAllUsers ()})

    userTableTab.click()
}

// Открытие модального окна Edit User
function openUserEditModal(event) {

    // Кнопка, которая активировала модальное окно
    const button = event.relatedTarget

    // Извлекает информацию из атрибутов data-bs-*
    const id = button.getAttribute('data-bs-whatever')

    const urlEditUser = 'http://localhost:8080/api/user/' + id

    fetch(urlEditUser)
        .then(res => {return res.json()})
        .then(data=>{

            inputEditId.value = data.id
            inputEditName.value = data.name
            inputEditSername.value = data.sername
            inputEditAge.value = data.age
            inputEditUsername.value = data.username
            inputEditPassword.value = data.password

            for (let r in data.role) {
                console.log(data.role[r].id)
                for (let opt of inputEditRole.options) {

                    if (opt.value == data.role[r].id) {

                        opt.setAttribute('selected','true')
                    }

                }
            }

        })
}

//Фокус на input пароля в форме Edit User
function focusInputEditPassword() {
    inputEditPassword.value = ''
    inputEditPassword.className = 'form-control'
}

// Нажатие кнопки закрытия модального окна Edit User
function closeFormEditUserHandler() {
    inputEditPassword.className = 'form-control text-white'
    for (let opt of inputEditRole.options) {
        opt.removeAttribute('selected')
    }
}

// Нажатие кнопки отправки на форме Edit User
function submitFormEditUserHandler(event) {
    event.preventDefault()
    const roles = []
    for(let i=0; i<inputEditRole.options.length; ++i) {

        const role = {
            id: inputEditRole.options[i].value,
            name: "ROLE_"+inputEditRole.options[i].text,
            contextName: inputEditRole.options[i].text
        }

        if(inputEditRole.options[i].selected == true){
            roles[roles.length] = role
        }
    }

    const editUser = {
        id: inputEditId.value,
        name: inputEditName.value,
        sername: inputEditSername.value,
        age: inputEditAge.value,
        username: inputEditUsername.value,
        password: inputEditPassword.value,
        role: roles
    }


    const urlSaveUser = 'http://localhost:8080/api'
    fetch(urlSaveUser, {
        method: 'PUT',
        body: JSON.stringify(editUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(responce => responce.json())
        .then(responce=>console.log(responce))
        .then(()=>{updateTableAllUsers () })

    btnCloseEditForm.click()

}

// Открытие модального окна Delete User
function openUserDeleteModal(event) {

    // Кнопка, которая активировала модальное окно
    const button = event.relatedTarget

    // Извлекает информацию из атрибутов data-bs-*
    const id = button.getAttribute('data-bs-whatever')
    console.log(button)

    const urlEditUser = 'http://localhost:8080/api/user/' + id

    fetch(urlEditUser)
        .then(res => {return res.json()})
        .then(data=>{

            inputDeleteId.value = data.id
            inputDeleteName.value = data.name
            inputDeleteSername.value = data.sername
            inputDeleteAge.value = data.age
            inputDeleteUsername.value = data.username
            inputDeletePassword.value = data.password
        })
}

// Нажатие кнопки отправки на форме Delete User
function submitFormDeleteUserHandler(event) {
    event.preventDefault()

    const urlDeleteUser = 'http://localhost:8080/api/user/'+ inputDeleteId.value
    fetch(urlDeleteUser, {
        method: 'DELETE'
    })
        .then(responce => responce.json())
        .then(responce=>console.log(responce))
        .then(()=>{updateTableAllUsers () })

    btnCloseDeleteForm.click()
}
