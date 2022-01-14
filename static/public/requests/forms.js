$(document).ready(function () {

    let body = $("body");

    let app_name = body.find("[app-page]");

    let CustomAlert = (alert_type, message) => {

        body.append('        <div class="Toastify__toast-container Toastify__toast-container--top-center">\n' +
            '            <div id="mtyiglv867" class="Toastify__toast Toastify__toast--' + alert_type + '"\n' +
            '                 style="animation-fill-mode: forwards; animation-duration: 750ms;">\n' +
            '                <div role="alert" class="Toastify__toast-body"> ' + message + ' \n' +
            '                </div>\n' +
            '                <button class="Toastify__close-button Toastify__close-button--error" type="button" aria-label="close">\n' +
            '                    <svg aria-hidden="true" viewBox="0 0 14 16">\n' +
            '                        <path fill-rule="evenodd"\n' +
            '                              d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>\n' +
            '                    </svg>\n' +
            '                </button>\n' +
            '                <div class="Toastify__progress-bar Toastify__progress-bar--error"\n' +
            '                     style="opacity: 1;"></div>\n' +
            '            </div>\n' +
            '        </div>\n');
        let Toastify = body.find(".Toastify__toast-container");

        let Toastify_progress_bar = Toastify.find(".Toastify__progress-bar");

        setTimeout(function () {
            Toastify.remove();
        }, 5000);

        let toastWidth = 100;
        let val = 0;
        let roll = setInterval(progress, val)

        function progress() {
            if (toastWidth <= val) {
                clearInterval(roll)
            } else {
                toastWidth--
                Toastify_progress_bar.animate({
                    width: toastWidth + "%"
                }, 27)
            }
        }

        Toastify.on("click", function () {
            $(this).remove();
        });
    };

    let AjaxSubmit = (url, type, data, isJson) => {
        if (isJson === true) {
            return $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(form),
                cache: false,
                processData: false,
            });
        } else if (isJson === false) {
            return $.ajax({
                url: url,
                type: type,
                data: data,
                contentType: false,
                cache: false,
                processData: false
            });
        }
    }

    function setCookie(name, value) {
        document.cookie = '' + name + '=' + value + ';' + 'expires=' + 6 * 30 * 24 * 3600 + '; path=/';
    }

    function readCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    let ringRotateCard = () => {
        return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
    }


    // ===== THIS IS THE SIGNUP SCRIPT ========
    let SignupPage = () => {
        let SignupForm = body.find("[SignupForm]");

        // let CheckEmptyInputs = () => {
        //     if (SignupForm.find('input').val().trim() === '') {
        //         CustomAlert("warning", "Some required inputs are empty!");
        //         return false
        //     }
        //     return true
        // }

        let CheckPasswordValidate = () => {
            let password = SignupForm.find("#password");
            let cpassword = SignupForm.find("#cpassword");

            if (password.val().trim() !== cpassword.val().trim()) {
                CustomAlert("warning", "Password does not match!");
                return false
            } else if (password.val().trim().length <= 5) {
                CustomAlert("warning", "Password must be more 5 digits");
                return false
            }
            return true
        }

        let getDate = (elem) => {
            let date = new Date(elem);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return day + "/" + month + "/" + year
        }

        let FormSubmission = () => {
            SignupForm.on("submit", function (e) {
                e.preventDefault();
                let data = new FormData(this);
                if (CheckPasswordValidate()) {
                    SignupForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                    $(".lds-ring div").css("border-top-color", "black");
                    AjaxSubmit('/CreateAccount', 'POST', data, false).then(function (res) {
                        $(".lds-ring div").css("border-top-color", "white");

                        if (res["data"][0] === "success") {
                            CustomAlert(res["data"][0], res["data"][1]);
                            setCookie("crz_", res["data"][2])
                            setTimeout(function () {
                                window.location.href = "/dashboard"
                            }, 1000);
                        } else {
                            CustomAlert(res["data"][0], res["data"][1]);
                            SignupForm.find("[type='submit']").prop("disabled", false).html(" Register <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO ml-3 h-6\">\n" +
                                "                                                <path d=\"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"></path>\n" +
                                "                                                <circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle>\n" +
                                "                                                <line x1=\"20\" x2=\"20\" y1=\"8\" y2=\"14\"></line>\n" +
                                "                                                <line x1=\"23\" x2=\"17\" y1=\"11\" y2=\"11\"></line>\n" +
                                "                                            </svg>");
                        }
                    });
                }
            });
        }

        let readRegistrationURL = (sParam) => {
            let sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };

        let AutoAddReferralOnLoad = () => {
            if (readRegistrationURL("referral") !== false) {
                let data = readRegistrationURL("referral");

                SignupForm.find("#referral").val(data);

            }
        }

        AutoAddReferralOnLoad();

        FormSubmission();


    }

    let LoginPage = () => {
        let SignInForm = body.find("[SignInForm]");
        SignInForm.on("submit", function (e) {
            e.preventDefault();
            if (SignInForm.find("[name='verification']").length > 0) {
                let data_ = new FormData(this);
                SignInForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                AjaxSubmit('/verify-auth', 'POST', data_, false).then(function (data) {
                    if (data["data"][0] === "success") {
                        setCookie("crz_", data["data"][1])
                        setTimeout(function () {
                            window.location.href = "/dashboard"
                        }, 1000);
                    } else if (data["data"][0] === "isAdmin") {
                        setCookie("crz_", data["data"][1])
                        setTimeout(function () {
                            window.location.href = "/AppAdmin"
                        }, 1000);
                    } else if (data["data"][0] === "error") {
                        CustomAlert("Warning", data["data"][1])
                        SignInForm.find("[type='submit']").prop("disabled", false).html("Verify <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    }
                });
            } else {
                SignInForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                let data_ = new FormData(this);
                AjaxSubmit('/Login', 'POST', data_, false).then(function (data) {
                    if (data["data"][0] === "success") {
                        setCookie("crz_", data["data"][1])
                        setTimeout(function () {
                            window.location.href = "/dashboard"
                        }, 1000);
                    } else if (data["data"][0] === "isAdmin") {
                        setCookie("crz_", data["data"][1])
                        setTimeout(function () {
                            window.location.href = "/AppAdmin"
                        }, 1000);

                    } else if (data["data"][0] === "verify-login") {
                        CustomAlert("Warning", "Please enter the verification code sent to your email address")
                        SignInForm.children().first().append(`<input type="text" required class="intro-x login__input input w-full input--lg border border-gray-300 block mt-4" placeholder="Enter Verification Code" value="" name="verification">`);
                        SignInForm.find("[type='submit']").prop("disabled", false).html("Verify <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    } else if (data["data"][0] === "error") {
                        CustomAlert(data["data"][0], data["data"][1]);
                        SignInForm.find("[type='submit']").prop("disabled", false).html("Login <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    }
                });
            }


        })

    }

    let ForgotPassword = () => {
        let ForgotPasswordForm = body.find("[forgotpasswordform]");

        ForgotPasswordForm.on("submit", function (e) {
            e.preventDefault();
            if (ForgotPasswordForm.attr("forgotpasswordform") === "submit") {
                let data = new FormData(this);
                ForgotPasswordForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                AjaxSubmit('/forgot-password', 'POST', data, false).then(function (data) {
                    if (data["data"][0] === "success") {
                        ForgotPasswordForm.children().first().append(`<input type="text" id="oth" required class="intro-x login__input input w-full input--lg border border-gray-300 block mt-4" placeholder="Enter Verification Code" value="" name="verification">`);

                        ForgotPasswordForm.attr("forgotpasswordform", "verify");
                        CustomAlert("success", "A verification code has been sent to your email address.");
                        ForgotPasswordForm.find("[type='submit']").prop("disabled", false).html("Verify <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    } else if (data["data"][0] === "error") {
                        CustomAlert("error", data["data"][1])
                        ForgotPasswordForm.find("[type='submit']").prop("disabled", false).html("Submit <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    }
                });
            } else if (ForgotPasswordForm.attr("forgotpasswordform") === "verify") {
                let data = new FormData(this);
                ForgotPasswordForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                AjaxSubmit('/verify-auth', 'POST', data, false).then(function (data) {
                    if (data["data"][0] === "success") {
                        setCookie("verify_email", ForgotPasswordForm.find("#email").val());
                        CustomAlert("success", "Verification successful");

                        ForgotPasswordForm.attr("forgotpasswordform", "change");

                        ForgotPasswordForm.find("label").html("")
                        ForgotPasswordForm.find("#email").attr("placeholder", "New Password");
                        ForgotPasswordForm.find("#email").attr("type", "text");
                        ForgotPasswordForm.find("#email").attr("name", "password1");
                        ForgotPasswordForm.find("#email").val("");

                        ForgotPasswordForm.find("#oth").attr("placeholder", "Retype Password");
                        ForgotPasswordForm.find("#oth").attr("type", "text");
                        ForgotPasswordForm.find("#oth").attr("name", "password2");
                        ForgotPasswordForm.find("#oth").val("");

                        ForgotPasswordForm.find("[type='submit']").prop("disabled", false).html("Submit <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    } else if (data["data"][0] === "error") {
                        CustomAlert("error", data["data"][1])
                        ForgotPasswordForm.find("[type='submit']").prop("disabled", false).html("Verify <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    }
                });

            } else if (ForgotPasswordForm.attr("forgotpasswordform") === "change") {
                let data = new FormData(this);
                ForgotPasswordForm.find("[type='submit']").prop("disabled", true).html(ringRotateCard);
                AjaxSubmit('/change-forgot-password', 'POST', data, false).then(function (data) {
                    if (data["data"][0] === "success") {

                        CustomAlert("success", "Your password has been changed successfully");
                        setTimeout(function () {
                            window.location.href = "/login"
                        }, 1000);

                    } else if (data["data"][0] === "warning") {
                        CustomAlert("error", data["data"][1])
                        ForgotPasswordForm.find("[type='submit']").prop("disabled", false).html("Submit <svg viewBox=\"0 0 24 24\" height=\"18\" width=\"18\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"StyledIconBase-ea9ulj-0 hPhvO\">\n" +
                            "                                    <line x1=\"5\" x2=\"19\" y1=\"12\" y2=\"12\"></line>\n" +
                            "                                    <polyline points=\"12 5 19 12 12 19\"></polyline>\n" +
                            "                                </svg>");
                    }
                });
            }


        })
    };

    let contact_us = () => {

        let contactform = body.find("[contactform]");


        contactform.on("submit", function (e) {
            e.preventDefault();
            let form = new FormData(this);
            let sub_btn = body.find("[support_send_btn]");
            sub_btn.html("Sending").prop("disabled", true);

            AjaxSubmit("/contact-message", "POST", form, false).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", "Your message was sent successfully!")
                    sub_btn.html("SENT").prop("disabled", false);
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                } else {
                    CustomAlert("error", "Message failed!")
                    sub_btn.html("SEND").prop("disabled", false);
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            })
        });
    };


    // THIS IS THE SCRIPT THAT RUNS THE WHOLE PAGE
    switch (app_name.attr("app-page")) {
        case "signup" :
            SignupPage();
            break
        case "signin":
            LoginPage();
            break
        case "forgotpassword":
            ForgotPassword();
            break
        case "contact_us":
            contact_us();
            break
        default:
            console.log("please check if the function is called up well")
            break
    }
});