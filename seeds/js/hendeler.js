$(document).ready(function() {
    $("#register-container").hide();
    $("#login-container").hide();

    function showRegister() {
        $("#index-container").hide();
        $("#login-container").hide();
        $("#register-container").show();
    }

    function showLogin() {
        $("#index-container").hide();
        $("#register-container").hide();
        $("#login-container").show();
    }

    const ValidateEmail = (email) => {
        // console.log(email);
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{3,}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
        );
    };

    function CheckPassword(inputtxt) {
        if (inputtxt.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            return true;
        } else {
            return false;
        }
    }

    $("#register-btn").click(() => {
        showRegister();
    });
    $("#login-btn").click(() => {
        showLogin();
    });

    $("#r-email").keyup(function() {
        if (ValidateEmail($("#r-email").val()) != null) {
            const fill = $("#r-email").val();
            $("#r-email").removeClass("border-3 border-danger");
            $("#r-email").addClass(" border-3 border-success");
            setTimeout(() => {
                $("#r-email").removeClass(" border-3 border-success");
            }, 3000);
            // console.log(fill)
            $.ajax({
                url: "/Auth/verifyEmail",
                method: "GET",
                data: {
                    email: fill,
                },
                success() {},
                error(a, b, error) {
                    console.log(error);
                    $(this).addClass("border-3 border-danger");
                    setTimeout(() => {
                        $(this).removeClass("border-3 border-danger");
                        swal({
                            icon: "error",
                            title: "Error",
                            text: "Email already Exist Try Different One",
                            button: "OK",
                        });
                    }, 300);
                },
            });
        } else {
            $("#r-email").addClass("border-3 border-danger");
            setTimeout(() => {
                $(this).removeClass("border-3 border-danger");
            }, 3000);
        }
    });

    $("#r-password").keyup(function() {
        let pass = $("#r-password").val();
        if (CheckPassword(pass)) {
            const fill = $("#r-password").val();
            $(this).removeClass("border-3 border-danger");
            $(this).addClass(" border-3 border-success");
            setTimeout(() => {
                $("#r-email").removeClass(" border-3 border-success");
            }, 3000);
            // console.log(fill)
        } else {
            $(this).addClass("border-3 border-danger");
        }
    });

    $("#r-submit-btn").click(function() {
        const register = {
            name: $("#r-name").val(),
            email: $("#r-email").val(),
            password: $("#r-password").val(),
        };
        if (!ValidateEmail(register.email) ||
            !CheckPassword(register.password) ||
            !register.email ||
            !register.name ||
            !register.password
        ) {
            swal({
                title: "not Registerd",
                text: "Please fill all values correctly",
                icon: "error",
                button: "Okey",
            });
        } else {
            console.log(register);
            $.ajax({
                url: "/Auth/Register",
                method: "post",
                data: register,
                success(result, status, xhr) {
                    swal({
                        title: "Registerd",
                        text: "you have Successfully Registerd",
                        icon: "success",
                        button: "Log-in",
                    });
                    showLogin();
                    console.log(result);
                },
                error(xhr, status, error) {
                    showRegister();
                    $("#register-container")
                        .append(`<div class="alert alert-danger" role="alert">
                            Something Went Wrong Try-again...!
                            </div>`);
                    console.log(error);
                    console.log(status);
                },
            });
        }
    });
    $("#l-login-btn").click(function() {
        const login = {
            email: $("#l-name").val(),
            password: $("#l-password").val(),
        };
        console.log(login);
        if (!login.email || !login.password) {
            swal({
                title: "Empty Field",
                text: "Please Fill All Values in form",
                icon: "error",
                button: "okey",
            });
        } else {
            $.ajax({
                type: "get",
                url: "/Auth/SignIn",
                data: login,
                success(result, status, xhr) {
                    swal({
                        title: "Logged In",
                        text: "you have Successfully Loged in",
                        icon: "success",
                        button: "Goo.!",
                    });
                    // console.log(result);
                    localStorage.setItem("token", result);

                    setTimeout(() => {
                        window.location.assign("/UI/initiate");
                    }, 500);
                },
                error(xhr, status, error) {
                    showLogin();

                    swal({
                        title: "Error",
                        text: "Invalid Id or Password",
                        icon: "error",
                        button: "Try Again",
                    });
                    console.log(error);
                    console.log(status);
                },
            });
        }
    });
});