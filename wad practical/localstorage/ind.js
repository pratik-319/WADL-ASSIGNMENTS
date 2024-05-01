let users = JSON.parse(localStorage.getItem("users")) || [];

function handlesubmit(){
    let name = document.getElementById('name').value;
    let mail = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let rollno = document.getElementById('roll').value;
    if(name=="" || mail == "" || pass == "" || rollno == ""){
        alert("fill all fields");
        return;
    }
    let user = {
        name : name,
        email : mail,
        password : pass,
        roll : rollno
    };

    if(users.some(user=>user.email === mail)){
        alert("mail alsready there");
        return;
    }
    users.push(user);
    localStorage.setItem("users" , JSON.stringify(users));

    window.location.href = "dat.html";
}

