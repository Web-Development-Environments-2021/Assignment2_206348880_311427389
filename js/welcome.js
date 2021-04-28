var registeredUsers = {"k":"k"};

/**
 * run when web load.
 * add 2 rules (full name all letters, password more than 6 chars and contains letters and numbers.)
 */
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

/**
 * show welcome page and hide the others (from menu)
 */
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

/**
 * show sign up page and hide the others (from menu)
 */
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

/**
 * show login page and hide the others (from menu)
 */
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

/**
 * show the about dialog
 */
function aboutModalDialog(){	
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
		width: 600,
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

/**
 * open the menu
 */
function openNav() {
    document.getElementById("myNav").style.width = "20%";
}

/**
 * close the menu
 */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

/**
 * show login page (from welcome page)
 */
function showLogin(){
    $("#welcomePage").toggle();
    $("#loginPage").toggle();
}

/**
 * show sign up page (from welcome page)
 */
 function toggleSignUp(){
    $("#welcomePage").toggle();
    $("#signUpPage").toggle();
}

/**
 * validate the details in sign in form according to the instructions.
 */
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

/**
 * get the user name and password that the user entered and check if the user is in the users array.
 * in addition, pop alert if one or more details are wrong.
 * if details are valid, it change the screen to settings page.
 * @returns false - prevent the web from falling.
 */
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

/**
 * get user name and password from the details that the user entered and save it in the users array.
 * @returns false - prevent the web from falling.
 */
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

/**
 * check if the user name is unique.
 * @param {*} userName 
 * @returns 
 */
function validUserName(userName){
    return !(userName in registeredUsers);
}


