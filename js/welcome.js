
var registeredUsers = {"k":"k"};

$(document).ready(function() {
    $("#gamePage").hide();
    $("#settingsPage").hide();
    $("#loginPage").hide();
	$("#signUpPage").hide();
    openNav();
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

function openWelcomeMenu(){
    if (intervalTimer != undefined){
		window.clearInterval(intervalTimer);
	}
	$("#loginPage").hide();
	$("#signUpPage").hide();
	$("#settingsPage").hide();
	$("#gamePage").hide();
    $("#welcomePage").show();
}

function openSignUpMenu(){
    if (intervalTimer != undefined){
		window.clearInterval(intervalTimer);
	}
	$("#loginPage").hide();
	$("#settingsPage").hide();
	$("#welcomePage").hide();
	$("#gamePage").hide();
    $("#signUpPage").show();
}

function openLoginMenu(){
    if (intervalTimer != undefined){
		window.clearInterval(intervalTimer);
	}
    $("#signUpPage").hide();
	$("#settingsPage").hide();
	$("#welcomePage").hide();
	$("#gamePage").hide();
    $("#loginPage").show();
}

function aboutModalDialog(){	
	// $("#aboutContent").text(content);
    $("#aboutPage").dialog({
		open: function() {
			// click outside close
			$('.ui-widget-overlay').bind('click', function(){
				$("#aboutPage").dialog('close');
			})
			},
		resizable: false,
		height: "auto",
		title: "About",
		width: 800,
		modal: true,
		show: {effect: 'fade', duration: 250},
		hide: { effect: "explode", duration: 1000 },
		buttons: {
		Close: function() {
			$( this ).dialog( "close" );
		}
	}
    });
}

function infoModalDialog(){	
    $("#infoDialog").dialog({
		open: function() {
			// click outside close
			$('.ui-widget-overlay').bind('click', function(){
				$("#infoDialog").dialog('close');
			})
			},
		resizable: false,
		height: "auto",
		title: "INFO",
		width: 800,
		modal: true,
		show: {effect: 'fade', duration: 250},
		hide: { effect: "explode", duration: 1000 },
		buttons: {
		Close: function() {
			$( this ).dialog( "close" );
		}
	}
    });
}

//menu
function openNav() {
    document.getElementById("myNav").style.width = "20%";
}
  
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

//login functionality
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
  
function submitLogin(){ 
    let userName = $("#loginUserName").val();
    let password = $("#loginPassword").val();
    currLogged = userName;
    if (userName in registeredUsers){
        if(registeredUsers[userName] == password){
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
    return false;
}

//signUp functionality
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

function toggleSignUp(){
    $("#welcomePage").toggle();
    $("#signUpPage").toggle();
}
