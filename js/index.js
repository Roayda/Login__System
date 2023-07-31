// &--------------------------- REGiSTERATION INFO --------------------------- 
var userName=document.getElementById('uName');
var userEmail=document.getElementById('signUEmail');
var userPass=document.getElementById('signUPassword');
var alertRegister=document.getElementById('alertRegister');


// &--------------------------- LOGIN INFO --------------------------- 
var userLogEmail=document.getElementById('logEmail');
var userLogPass=document.getElementById('logPassword');
var alertLogin=document.getElementById('alertLog');

// &---------------------------HOME INFO --------------------------- 
var homeName=document.getElementById("homeName");



var users=[];

if (localStorage.getItem('Users') == null) {
    users = []
} 
else {
    users = JSON.parse(localStorage.getItem('Users'))
}


// &--------------------------- REGiSTERATION Functions --------------------------- 

function clearRegister()
{
    userName.value="";
    userEmail.value="";
    userPass.value="";

}
function register()
{
    var user={
        name:userName.value,
        email:userEmail.value,
        password:userPass.value,
    }
    var complete=isEmptyRegister();
    if(complete==0)
    {
       
        alertRegister.innerHTML="All inputs are required";
        clearRegister();
    
    }
    else
    {
    var flag= checkEmailRegister(user);
    if(!emailChecker())
    {
        alertRegister.innerHTML="Enter A VAlid Email";
       
    }
   else if(flag==0&&emailChecker())
    {
        users.push(user);
        localStorage.setItem("Users",JSON.stringify(users));
        alertRegister.classList.replace('text-danger','text-success');
        alertRegister.innerHTML="Success";
        clearRegister();
        
    }
    }
}

function checkEmailRegister(user)
{
    for(var i=0;i<users.length;i++)
        {
            if(user.email==users[i].email)
            {
                alertRegister.classList.replace('text-success','text-danger');
                alertRegister.innerHTML="email already exists";
                clearRegister();
               return true;
            }
        }
        return false;
}

function isEmptyRegister() {

    if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
        return false
    } else {
        return true
    }
}



// &--------------------------- LOGIN functions ---------------------------
function clearLogin()
{
    userLogEmail.value="";
    userLogPass.value="";
}

function logIn()
{
    var userLog={
        email:userLogEmail.value,
        password:userLogPass.value,
    }
    var complete=isEmptyLogin();
    if(complete==0)
    {
        alertLogin.innerHTML="All inputs are required";
        clearLogin();
    }
    else
    {
       var flag=checkEmailLog(userLog);


        if(flag==false)
        {
            alertLogin.innerHTML="incorrect email or password";
            clearLogin();

        }
        else
        {
            location.assign("home.html");
            clearLogin();
            
        }
        
    }



}
 function checkEmailLog(userLog)
 {

    for(var j=0;j<users.length;j++)
        {
            if(userLog.email==users[j].email&&userLog.password==users[j].password)
            {
                
                return users[j].name;
            }
        }
      return false;
 }
 function isEmptyLogin() {

    if (userLogEmail.value == "" || userLogPass.value == "") {
        return false
    } else {
        return true
    }
}

// &------------------------ Email Validation Function ----------------------- 
function emailChecker()
{
    var regexEmail=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if(regexEmail.test(userEmail.value))
    {
        userEmail.classList.replace("is-invalid","is-valid")
        return true;
    }
    else
    {
        userEmail.classList.add("is-invalid")
        return false;
    }

}

