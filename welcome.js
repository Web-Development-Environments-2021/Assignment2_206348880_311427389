
var registeredUsers = {"k":"k"};

$(document).ready(function() {
    // $("#settingsPage").hide();
    // $("#signUpPage").hide();
    // $("#loginPage").hide();
    // $("#aboutPage").hide();
    // $("#gamePage").hide();
    $.validator.addMethod("allLettersRule", function(value) {
        return /^[A-Za-z]+$/.test(value);
     });
     $.validator.addMethod("isValidPassword", function(value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });
    validateSignUp();
});



function toggleSignUp(){
    $("#welcomePage").toggle();
    $("#signUpPage").toggle();
}

function showLogin(){
    $("#welcomePage").toggle();
    $("#loginPage").toggle();
}


function validateSignUp(){
    $("form[id='signUpForm']").validate({
        rules: {
            userName: "required",
            password: {
                required: true,
                minlength: 6,
                isValidPassword: true
            },
            fullName: {
                required: true,
                allLettersRule: true
            },
            email: {
                required: true,
                email: true
            },
            birthday: {
                required: true,
            }
        },
        // Specify validation error messages
        messages: {
            userName: "Please enter user name.",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long.",
                isValidPassword: "Your password must contain letters and digits."
            },
            fullName: {
                required: "Please enter your name.",
                allLettersRule: "Your name must contains only letters."
            },
            email: {
                required: "Please enter a valid email address.",
                email: "Please enter a valid email address."
            },
            birthday: "Please enter your birthdate."
        },
    });
}
  

// function validateLogin(userName, password) {
//     valid = false;
//     if (userName in registeredUsers){
//         if(registeredUsers[userName] == password){
//             valid = true;
//         }
//     } 
//     return valid; 
// }

function submitLogin(){
    let userName = $("#loginUserName").val();
    let password = $("#loginPassword").val();
    if (userName in registeredUsers){
        if(registeredUsers[userName] == password){
            alert("successfully Login!");
            $("#loginPage").toggle();
            $("#settingsPage").toggle();
        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user name not found")
    }
    // if (validateLogin(userName,password)){
    //     alert("successfully Login!");
    //     $("#loginPage").toggle();
    //     $("#settingsPage").toggle();
    // }
    // else{
    //     if (userName in registeredUsers){
            
    //     }

    // }
    return false;
}

function submitSignUp(){
    let userName = $("#userName").val();
    if (!validUserName(userName)){
        alert("The chosen user name already exist.")
        return;
    }
    if ($("#signUpForm").valid()){
        let password = $("#password").val();
        registeredUsers[userName] = password;
        alert("successfully signed up!")
        toggleSignUp();
    }
    return false;
}

function validUserName(userName){
    return !(userName in registeredUsers);
}