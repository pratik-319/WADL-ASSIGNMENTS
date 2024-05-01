
let users = JSON.parse(localStorage.getItem("users")) || [];

function handleSubmit(){
    let name = document.getElementById("myname").value;
    let roll = document.getElementById("myrollno").value;
    let email = document.getElementById("myemail").value;
    let phone = document.getElementById("myphone").value;
    var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailReg.test(email)){
        alert("enter correct email");
    }

    let user = {
        name:   name,
        roll:   roll,
        email:  email,
        phone:  phone
    };

    if(users.some(user => user.email === email)){
        alert("email already exists");
        return;
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    window.location.href = "data.html";
}

document.getElementById("mybtn").addEventListener("click",()=> handleSubmit())