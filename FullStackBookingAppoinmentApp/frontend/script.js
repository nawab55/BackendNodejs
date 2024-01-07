// Put DOM elements into variables
const userForm = document.querySelector('#userForm');
const name = document.querySelector('#username');
const phone = document.getElementById('phone');
const email = document.querySelector('#email');
const listOfUsers = document.querySelector('#listOfUsers');


// Listen for form submit
userForm.addEventListener('submit', userDetails);

function userDetails(e) {
    e.preventDefault();
  // Retrieving data
    const name = document.querySelector('#username').value;
    const phone = document.getElementById('phone').value;
    const email= document.querySelector('#email').value;
    console.log(name);
//  console.log(email);

    const obj = {
        name,
        phone,
        email
    }

    axios.post("http://localhost:3000/user/add-user", obj)
        .then((response)=>{
            showUserOnScreen(response.data.newUserDetail);
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
}

// read data from cloud(mysql)
window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("http://localhost:3000/user/get-user")
        .then((response)=>{
            console.log(response);

            for(var i=0; i<response.data.allUsers.length; i++){
                showUserOnScreen(response.data.allUsers[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    // console.log(data);
})

function showUserOnScreen(user){
    console.log(user);
        // user = {
        //     _id: '',
        //     name: '',
        //     email: ''
        // }
    parentNode = document.getElementById('listOfUsers');
    childHTML = `<li id=${user.id}> ${user.name}: ${user.email}:
                <button onclick = deleteUser('${user.id}')>Delete</button>
                <button onclick = editUserDetails('${user.email}','${user.name}','${user.phone}')>Edit</button>
            </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phone').value = '';
}

 // Edit User
    function editUserDetails(emailId, name, phone){
        document.getElementById('email').value = emailId;
        document.getElementById('username').value = name;
        document.getElementById('phone').value = phone;
        // deleteUser(emailId);
    }
    // editUserDetails('email',);

// deleteuser('abc@gmail.com')
    function deleteUser(userId){
        axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
            .then((response)=> {
                removeUserFromScreen(userId);
            })
            .catch((err)=>{
                console.log(err);
            })
        // console.log(emailId);
        // localStorage.removeItem(emailId);
        // removeUserFromScreen(emailId);
    }

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
    
}



