
var signInBtn = document.querySelector('#sign-in-btn');
var signUpBtn = document.querySelector('#sign-up-btn');
var container = document.querySelector('.container');
//handle links
var signInBtn2 = document.querySelector('#sign-in-btn2');
var signUpBtn2 = document.querySelector('#sign-up-btn2');
///////////////


function gotoSigninPage() {
    if (document.body.offsetWidth < 635) {
        container.classList.add('sign-up-mode2')
    }
    else {
        container.classList.add('sign-up-mode')
        document.querySelector('.right-panel').classList.add('remove')
        document.querySelector('.left-panel').classList.remove('remove')
    }
}
function gotoSignUpPage()
{
    if (document.body.offsetWidth < 635) {
        container.classList.remove('sign-up-mode2')
    }
    else {
        container.classList.remove('sign-up-mode')
        document.querySelector('.right-panel').classList.remove('remove')
        document.querySelector('.left-panel').classList.add('remove')
    }
}
//goto exam page 
function gotoExam()
{
window.open("./exam/index.html")
}

//registration form action
document.querySelectorAll('form')[0]
    .addEventListener('submit', function (e) {
        e.preventDefault()
        if (isAllinputsValid()) {
            localStorage.setItem("name", this[0].value)
            localStorage.setItem("email", this[2].value)
            localStorage.setItem("password", this[3].value)
            gotoSigninPage();
        }
})
//login form action 
document.querySelectorAll('form')[1]
    .addEventListener('submit', function (e) {
        e.preventDefault()
        console.log("outside")
        if (validateLogin(this[0].value,this[1].value)) {
            gotoExam();
            window.open('','_self').close()
            console.log("inside")
        }
})
// ______________________________________
//validations
function validateName(name) {
    var regx = /^[a-z ,.'-]+$/i
    return regx.test(name);
}

function validateEmail(email) {
    var regx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    return regx.test(email)
}
function validatePassowrd(password) {
    var regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
    return regx.test(password)
}

function validateRewritePassword(rewritePassword) {
    var password = document.querySelector('form')[3].value
    return password === rewritePassword
}

//warning effect 
function addWarning(element) {
    element.classList.add('warning');
}
function removeWarning(element) {
    element.classList.remove('warning');
}

//events
var sign_up_form = document.querySelector('.sign-up-form')
var regFname = sign_up_form[0];
var regLname = sign_up_form[1];
var regEmail = sign_up_form[2];
var regPassword = sign_up_form[3];
var rewritePassword = sign_up_form[4];


function addValidationAction(element, validationMethod) {
    element.addEventListener('keyup', function () {
        if (validationMethod(this.value) || !this.value) {
            removeWarning(this.previousElementSibling);
        }
        else {
            addWarning(this.previousElementSibling)
        }
    })
}

addValidationAction(regFname, validateName)
addValidationAction(regLname, validateName)
addValidationAction(regEmail, validateEmail)
addValidationAction(regPassword, validatePassowrd)
addValidationAction(rewritePassword, validateRewritePassword)

//check that all inputs valid 
function isAllinputsValid() {
    var check =
        validateName(regFname.value) &&
        validateName(regLname.value) &&
        validateEmail(regEmail.value) &&
        validatePassowrd(regPassword.value) &&
        validateRewritePassword(rewritePassword.value)
    return check;
}
//validate login 
function validateLogin(email,password)
{
var storedEmail=localStorage.getItem("email");
var storedPassword=localStorage.getItem("password");
return   storedEmail===email && storedPassword===password
}




