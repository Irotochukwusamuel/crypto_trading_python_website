// noinspection HtmlUnknownAttribute

$(document).ready(function () {

    let body = $("body");
    $("a").addClass("active-link-on-window-ready");

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

    let app_name = body.find("[app-page]");

    let url = window.location.href;

    let page = url.slice(url.lastIndexOf("/") + 1);

    let CustomAlert = (alert_type, message) => {

        if (alert_type === "default") {
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
                '                <div class="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar--default" style="opacity: 1;"></div>\n' +
                '            </div>\n' +
                '        </div>\n');
        } else {
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
        }


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
                data: JSON.stringify(data),
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

    let ringRotateCard = () => {
        return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
    }

    let page_loader = () => {
        return '<div class="lds-ring lds-ring-themed mt-5 undefined"><div></div><div></div><div></div><div></div></div>'
    }

    // CHANGE PROFILE PHOTO
    let ProfilePhoto = () => {
        let ChangePF = body.find("[name='pf']");
        body.on("change", "[name='pf']", function () {
            if (this.files) $.each(this.files, readAndPreview);

            function readAndPreview(i, file) {
                if (!/\.(jpe?g|png)$/i.test(file.name)) {
                    return CustomAlert("error", file.name + " " + "is not an image");
                }
                let reader = new FileReader();

                $(reader).on("load", function () {
                    let image_data = this.result.replace("data:" + file.type + ";base64,", '');
                    let data = {
                        "pf": image_data
                    };
                    ChangePF.prev("[pfbtn]").prop("disabled", true).html("please wait..");
                    AjaxSubmit("/profilephoto", "POST", data, true).then(function (data) {
                        if (data["data"][0] === "success") {
                            ChangePF.prev("[pfbtn]").prop("disabled", false).html("Change Picture");
                            body.find("[pf_img]").attr("src", reader.result);
                            CustomAlert("success", "your display photo has been changed successfully")
                        }
                    });
                });
                reader.readAsDataURL(file);
            }


        });
    };

    // CHANGE PASSWORD
    let ChangePassword = () => {
        let changepassword = body.find('[changepassword]');

        let CheckPasswordValidate = () => {
            let password = body.find("#password");
            let cpassword = body.find("#cpassword");

            console.log(password.val(), cpassword.val())

            if (password.val().trim() !== cpassword.val().trim()) {
                CustomAlert("warning", "Password does not match!");
                return false
            } else if (password.val().trim().length <= 5) {
                CustomAlert("warning", "Password must be more 5 digits");
                return false
            }
            return true
        }

        body.on("submit", "[changepassword]", function (e) {
            e.preventDefault();
            let data = new FormData(this)
            if (CheckPasswordValidate()) {
                AjaxSubmit("/changepassword", "POST", data, false).then(function (data) {
                    let result = data["data"];
                    if (result[0] === "success") {
                        CustomAlert(result[0], result[1])
                        setTimeout(function () {
                            window.location.href = "/login"
                        }, 3000)
                    } else {
                        CustomAlert(result[0], result[1])
                    }

                });
            }

        })
    };

    // CHANGE EMAIL
    let ChangeEmail = () => {

        body.on("submit", '[changeemail]', function (e) {
            e.preventDefault();
            let data = new FormData(this)

            AjaxSubmit("/changeemail", "POST", data, false).then(function (data) {
                let result = data["data"];
                if (result[0] === "success") {
                    CustomAlert(result[0], result[1])
                    setTimeout(function () {
                        window.location.href = "/login"
                    }, 3000)
                } else {
                    CustomAlert(result[0], result[1])

                }

            });


        })
    };

    let changeURLCss = () => {
        switch (page) {
            case "dashboard":
                body.find("[href='/dashboard']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "user-investment":
                body.find("[href='/user-investment']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "referral":
                body.find("[href='/referral']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "withdrawal-request":
                body.find("[href='/withdrawal-request']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "profile":
                body.find("[href='/profile']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            default:
                console.log("page is not available")

        }
    };

    // MY INVESTMENT CARDS
    let Investment_Card = () => {

        let No_investement = () => {
            return '<div class="flex flex-col items-center" style="min-height: 60vh;" No_investement><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-16 h-16 text-theme-1 mx-auto mt-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="16" y2="12"></line><line x1="12" x2="12.01" y1="8" y2="8"></line></svg><p class="text-gray-600 mx-auto mt-5">No investment yet! Click on the button above to add your first investment.</p></div>'
        };

        let New_contact_person = (name, email, phone, position, image) => {
            return `<h2 class="font-medium text-base mr-auto mb-4"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"></path></svg> Contact Person</h2><div class="grid grid-cols-1 gap-2" style="" New_contact_person><div class="box bg-gray-100 rounded-xl zoom-in shadow-lg p-8"><img class="w-32 h-32 rounded-full mx-auto" src="${image}" alt="Triumph Admin" width="384" height="384"><div class="pt-4 text-center space-y-4"><figcaption class="font-medium"><div class="text-purple-600 text-lg">${name}</div><div class="text-gray-500">${email}</div><div class="text-gray-500">${phone}</div><div class="text-teal-500">${position}</div></figcaption></div></div></div>`
        };


        let New_investment = () => {
            return `<div class="grid grid-cols-12 gap-6" new_investment=""><div class="col-span-12 lg:col-span-8 xxl:col-span-9 flex lg:block flex-col-reverse"><form NewInvestmentForm><div class="intro-y box lg:mt-5" style="min-height: 60vh;"><div class="flex items-center p-8 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-8 h-8 mr-2 text-theme-1"><rect width="448" height="256" x="32" y="80" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="16" ry="16" transform="rotate(180 256 208)"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M64 384h384M96 432h320"></path><circle cx="256" cy="208" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M480 160a80 80 0 01-80-80M32 160a80 80 0 0080-80m368 176a80 80 0 00-80 80M32 256a80 80 0 0180 80"></path></svg> New Investment</h2></div><div class="p-8" ><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-cate">Select Category</label><div class="relative mb-4"><select required name="select_category" class="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-cate"><option >Select Category</option><option value="1">Cryptocurrency</option><option value="2">Stock</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div></div><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">Select investment Plan</label><div class="relative" ><select name="select_investmentPlan" required class="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"><option >Select investment Plan</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div></div><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2" for="grid-currency">Select Currency</label><div class="relative" btm_adv><select name="select_currency" required class="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-currency"><option value>Select Currency</option><option value="bitcoin">Bitcoin</option><option value="usdt">USDT</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div></div><div class="flex justify-center sm:justify-start mt-5"><button type="submit" class="button mr-3 flex items-center justify-center bg-theme-1 text-white">Submit <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z"></path></svg></button><button type="button" name="cancel_addInvestment" class="button mr-3 flex items-center justify-center bg-theme-31 text-theme-6">Cancel <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"></path></svg></button></div></div></div></form></div><div class="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse"><div addContact_person class="intro-y lg:mt-5" style="min-height: 60vh;"><h2 class="font-medium text-base mr-auto mb-4"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"></path></svg> Contact Person</h2><div class=" empty_contactPerson flex flex-col items-center py-16" style="min-height: 60vh; align-items: center;"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-16 h-16 text-theme-1 mx-auto mt-5"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"></path><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"></path></svg><p class="text-gray-600 text-lg mx-auto mt-5">No Record!</p></div></div></div></div>`
        };

        let All_investment = () => {
            return `<div class="grid grid-cols-12 gap-6 mt-5" All_investment></div>`
        };

        let waiting = (id, category, plan, amount, roi, currency) => {
            return `<div invest_id="${id}" currency="${currency}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-14 text-theme-10"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>You have not paid for this investment yet!</div><div class="text-center font-bold text-gray-600 mt-10" waiting_category>${category}</div><div class="text-xl font-medium text-center" waiting_plan>${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto" waiting_amount>${amount} <span class=" text-2xl text-gray-500">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div><div class="p-5 flex justify-center"><a data-toggle="modal" href="#" data_target="payment-box" title="Pay" class="button  mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white">Make Payment <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2"><rect width="416" height="288" x="48" y="144" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"></path><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path></svg></a></div></div>`
        }

        let pending = (id, category, plan, amount, roi) => {
            return `<div invest_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-1 text-white"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><circle cx="256" cy="256" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 256H48m416 0H352"></path></svg>Waiting Approval</div><div class="text-center font-bold text-gray-600 mt-10">${category}</div><div class="text-xl font-medium text-center">${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount} <span class=" text-2xl  text-gray-500 ">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div></div>`
        }

        let decline = (id, category, plan, amount, roi) => {
            return `<div invest_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-6 text-white"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192m0 128l128-128"></path></svg>Investment Declined</div><div class="text-center font-bold text-gray-600 mt-10">${category}</div><div class="text-xl font-medium text-center">${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount} <span class="text-2xl  text-gray-500 ">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div></div>`
        }

        let approved = (id, category, plan, amount, roi, expiration) => {
            return `<div invest_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-9 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Investment in progress</div><div class="text-center font-bold text-gray-600 mt-10" cate="${category}">${category}</div><div class="text-xl font-medium text-center">${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}<span class="text-2xl text-gray-500 ">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div><div class="text-gray-800 px-10 text-center mx-auto mt-2"><b>Investment Expiration</b> <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO text-theme-1 h-4 mr-1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> <span>${expiration}</span></div></div>`
        }

        let closed = (id, category, plan, amount, roi, expiration) => {
            return `<div invest_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-13 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Investment has been completed.</div><div class="text-center font-bold text-gray-600 mt-10">${category}</div><div class="text-xl font-medium text-center">${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}<span class=" text-2xl text-gray-500 ">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div><div class="text-gray-800 px-10 text-center mx-auto mt-2"><b>Investment Expiration</b> <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO text-theme-1 h-4 mr-1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> <span>${expiration}</span></div>
         <div class="p-5 flex justify-center">
         <a href="#" title="Pay" class="button mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white active-link-on-window-ready" movetowalletbtn>Move to Wallet</a>
         <a  reinvestbtn href="#"  title="Pay" class="button mr-2 mb-2 flex items-center justify-center bg-theme-9 text-white active-link-on-window-ready">Reinvest</a></div>
        </div>`
        }
        let finalized = (id, category, plan, amount, roi, expiration) => {
            return `<div invest_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-11 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>ROI has been successfully transfered to wallet.</div><div class="text-center font-bold text-gray-600 mt-10">${category}</div><div class="text-xl font-medium text-center">${plan}</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}<span class=" text-2xl text-gray-500 ">USD</span></div></div><div class="text-gray-700 text-center mt-5">Return on Investment <span class="font-bold">$${roi}</span></div><div class="text-gray-800 px-10 text-center mx-auto mt-2"><b>Investment Expiration</b> <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO text-theme-1 h-4 mr-1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> <span>${expiration}</span></div>
         `
        }

        let Payment_box = (id, amount, plan, currency) => {
            return `<div invest_id="${id}" class="modal overflow-y-auto show" id="payment-box" payment_box style="margin-top: 0px; margin-left: 0px; padding-left: 0px; z-index: 51;"><div class="modal__content"><div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200"><h2 class="font-medium text-base mr-auto">Investment Payment</h2></div><div class="p-5 grid grid-cols-12 gap-4 row-gap-3" group><div class="col-span-12 sm:col-span-12"><p>Make a transfer of the amount invested in ${currency} to the wallet address below. After making the payment, enter the transaction's wallet address and click on the continue button</p></div><div class="col-span-12 sm:col-span-12"><b>Investment Made</b><h6 payment_amount> ${"$" + amount.replace("$", "")}</h6></div><div class="col-span-12 sm:col-span-12"><b>Current Plan</b><h6 payment_plan>${plan}</h6></div><div class="col-span-12 sm:col-span-12"><b>Currency Selected</b><h6 payment_currency>${currency}</h6></div><div class="col-span-12 sm:col-span-12"></div><div class="col-span-12 sm:col-span-12"><button get_payment_address type="button" class="button w-full bg-theme-1 text-white">Get Payment Wallet Address</button></div></div></div></div>`
        };

        let delete_modal = () => {
            return '<div class="modal" id="delete-modal"><div class="modal__content"><div class="p-5 text-center"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-16 h-16 text-theme-6 mx-auto mt-3"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192m0 128l128-128"></path></svg><div class="text-3xl mt-5">Are you sure you want to proceed?</div><div class="text-gray-600 mt-2"> This process cannot be undone.</div></div><div class="px-5 pb-8 text-center"><button type="button" data-dismiss="modal" class="button w-24 border text-gray-700 mr-1">Cancel</button><button type="button" class="button w-24 bg-theme-6 text-white">Continue</button></div></div></div>'
        };

        let reinvestment_box = () => {
            return '<div class="modal" id="reinvestment-box" delete_modal><div class="modal__content"><div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200"><h2 class="font-medium text-base mr-auto">Contact Person</h2></div><div class="col-span-12 sm:col-span-12"></div><div class="p-5"><div class="flex flex-col items-center py-16" style="min-height: 60vh; align-items: center;"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-16 h-16 text-theme-1 mx-auto mt-5"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"></path><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"></path></svg><p class="text-gray-600 text-lg mx-auto mt-5">No Record!</p></div></div></div></div>'
        };

        let compound_box = () => {
            return '<div class="modal" id="compound-box" compound_box><div class="modal__content"><div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200"><h2 class="font-medium text-base mr-auto">Compound Investment</h2></div><form><div class="p-5 grid grid-cols-12 gap-4 row-gap-3"><div class="col-span-12 sm:col-span-12"><b>Investment Made</b><h4>$0</h4></div></div><div class="p-5 grid grid-cols-12 gap-4 row-gap-3"><div class="col-span-12 sm:col-span-6"><b>Expected Payout</b><h4>0</h4></div><div class="col-span-12 sm:col-span-6"><b>Expected Payout Date</b><h4>Sun, Sep 19, 2021</h4></div><hr class="bg-theme-1"><div class="col-span-12 sm:col-span-12"><label>Select the number of weeks for compound</label><input type="number" min="4" step="1" class="input w-full border mt-2 flex-1" required="" value="4"></div><div class="col-span-12 sm:col-span-12"></div></div><div class="px-5 py-3 text-right border-t border-gray-200"><button type="button" data-dismiss="modal" class="button w-20 border text-gray-700 mr-1">Cancel</button><button type="submit" class="button w-35 bg-theme-1 text-white">Submit <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144m124-144H100"></path></svg></button></div></form></div></div>';
        };

        let add_investment_amount = (amount) => {
            return `<div add_investment_amount class="flex flex-wrap -mx-3 my-6"><div class="w-full px-3"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amount">Enter Amount</label><input  style="border: none;border-bottom: 1px solid black;background-color: white;border-radius: 0" name="amount" required="" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-amount" type="number" min="${amount.replace(",", "")}" value="${amount.replace(",", "")}"><p class="text-gray-600 text-xs italic">Amount mustn't be less than $${amount}</p></div></div></div>`
        };

        let add_investment_desc = (percent, min, max) => {
            return `<div add_investment_desc class="intro-y"><div class="text-gray-800 text-center mt-5"><strong>${percent} percent ROI</strong><span class="mx-1 text-theme-1">•</span>Minimum Investment - <strong> $${min}</strong> <span class="mx-1 text-theme-1">•</span>Maximum Investment - <strong> $${max}</strong></div></div>`
        };

        let show_payment_address = (currency) => {
            if (currency === "bitcoin") {
                return `
                    <div class="col-span-12 sm:col-span-12"><b>Receiver Wallet Address</b><div class="flex" id="parent-copy"><input class="rounded-l-lg p-4 w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-gray-200" disabled="" placeholder="click to copy" value="bc1q8nj5wcpwe9g48qp35qppgntrlpmt6sl5g0uwxa"><button type="button" copy_address class="px-8 rounded-r-lg bg-green-500  text-white font-bold p-4 uppercase border-green-500 border-t border-b border-r">Copy</button></div></div>
                    <hr class="bg-theme-1 mt-3">
                    <div class="col-span-12 sm:col-span-12"><label>Payment wallet Address</label><input type="text" name="enter_wallet_address" class="input w-full border mt-2 flex-1" required="" placeholder="Enter the wallet address of the sender" value=""></div>
                `
            } else if (currency === "usdt") {
                return `
                    <div class="col-span-12 sm:col-span-12"><b>Receiver Wallet Address (USDT, Network = ERC20)</b><div class="flex" id="parent-copy"><input class="rounded-l-lg p-4 w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-gray-200" disabled="" placeholder="click to copy" value="0x1D762F5be19B11e5533628036B414304ab529585"><button type="button" copy_address class="px-8 rounded-r-lg bg-green-500  text-white font-bold p-4 uppercase border-green-500 border-t border-b border-r">Copy</button></div></div>
                    <hr class="bg-theme-1 mt-3">
                    <div class="col-span-12 sm:col-span-12"><label>Payment wallet Address</label><input type="text" name="enter_wallet_address" class="input w-full border mt-2 flex-1" required="" placeholder="Enter the wallet address of the sender" value=""></div>
                `
            }

        };

        let show_payment_address_submit_body = () => {
            return `<div class="px-5 py-3 text-right border-t border-gray-200"><button type="button" data-dismiss="modal" class="button w-20 border text-gray-700 mr-1" cancel_paymentBTN>Cancel</button><button type="button" class="button w-35 bg-theme-1 text-white" submit_paymentBTN>Continue <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144m124-144H100"></path></svg></button></div>`
        };

        let contact_person = () => {
            return `<div class="modal overflow-y-auto show" id="reinvestment-box" style="margin-top: 0; margin-left: 0; padding-left: 0; z-index: 51;"><div class="modal__content"><div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200"><h2 class="font-medium text-base mr-auto">Contact Person</h2></div><div class="col-span-12 sm:col-span-12"></div><div class="p-5"><div class="grid grid-cols-1 gap-2" style=""><div class="box bg-gray-100 rounded-xl zoom-in shadow-lg p-8"><img class="w-32 h-32 rounded-full mx-auto" src="https://res.cloudinary.com/harry-investment/image/upload/v1615128943/profile/vclqc4tlmjdwv4bcxpht.jpg" alt="Triumph Admin" width="384" height="384"><div class="pt-4 text-center space-y-4"><figcaption class="font-medium"><div class="text-purple-600 text-lg">Triumph Admin</div><div class="text-gray-500">info@triumphfinancing.com</div><div class="text-gray-500">0123456789</div><div class="text-teal-500">Position: Account Manager</div></figcaption></div></div></div></div></div></div>`;
        }

        return {
            show_payment_address_submit_body: show_payment_address_submit_body,
            show_payment_address: show_payment_address,
            add_investment_amount: add_investment_amount,
            add_investment_desc: add_investment_desc,
            No_investment: No_investement,
            New_investment: New_investment,
            All_investment: All_investment,
            New_contact_person: New_contact_person,
            Payment_box: Payment_box,
            delete_modal: delete_modal,
            reinvestment_box: reinvestment_box,
            compound_box: compound_box,
            waiting: waiting,
            pending: pending,
            decline: decline,
            approved: approved,
            closed: closed,
            finalized: finalized
        };
    };


    // MY WITHDRAWAL CARDS
    let Withdrawal_Card = () => {
        let NewRequestForm = (value, wallet_name, wallet_address) => {
            return `<div  NewRequestForm class="col-span-12 sm:col-span-6 lg:col-span-4 xxl:col-span-3 intro-y">
            <div class="report-box">
                <div class="box p-5"><h3 class="font-semibold text-base uppercase">New Request Form</h3>
                    <hr class="my-4">
                    <form requestWithdrawalForm="submit">
                        <div class="w-full">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amount">Amount</label>
                            <input required name="amount" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-amount" type="number" max="${value}" value="${value}">
                        </div>
                         <div class="w-full mt-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amount">Wallet Name</label>
                            <input required name="wallet_name" value="${wallet_name}" placeholder="Wallet Name" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-amount" type="text" >
                        </div>
                        <div class="w-full mt-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amount">Wallet Address</label>
                            <input required name="wallet_address" value="${wallet_address}" placeholder="Wallet Address" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-amount" type="text" >
                        </div>
                        <button type="submit" class="button mr-3 flex items-center justify-center w-full bg-theme-1 text-white mt-4">
                            Send Request
                        </button>
                    </form>
                </div>
            </div>
        </div>`
        };

        let No_withdrawal = () => {
            return `        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none"
             xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-16 h-16 text-theme-1 mx-auto mt-5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="16" y2="12"></line>
            <line x1="12" x2="12.01" y1="8" y2="8"></line>
        </svg>
        <p class="text-gray-600 mx-auto mt-5">No withdrawal request!</p>`
        };

        let All_withdrawal = () => {
            return `<div class="grid grid-cols-12 gap-6 mt-5" All_investment></div>`
        };

        let pending = (id, amount, time) => {
            return `<div withdraw_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-1 text-white"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><circle cx="256" cy="256" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 256H48m416 0H352"></path></svg>Waiting Approval</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount} <span class="absolute text-2xl top-0 right-0 text-gray-500 -mr-4 mt-1">$</span></div></div><div class="text-gray-700 text-center mt-5">Time : <span class="font-bold">${time}</span></div></div>`
        }

        let decline = (id, amount) => {
            return `<div withdraw_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-6 text-white"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192m0 128l128-128"></path></svg>Withdrawal Declined</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}</div></div></div>`
        }

        let approved = (id, amount, time) => {
            return `<div withdraw_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-9 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Withdrawal Successful</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}<span class="absolute text-2xl top-0 right-0 text-gray-500 -mr-4 mt-1">$</span></div></div><div class="text-gray-700 text-center mt-5">Time : <span class="font-bold">${time}</span></div></div></div>`
        }

        let closed = (id, amount, time) => {
            return `<div withdraw_id="${id}" class="intro-y box col-span-12 py-8 md:col-span-4"><div class="rounded-md flex items-center px-5 py-4 mb-2 bg-theme-13 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-6 h-6 mr-2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Withdrawal has been completed.</div><div class="flex justify-center"><div class="relative text-5xl font-semibold mt-8 mx-auto">${amount}<span class="absolute text-2xl top-0 right-0 text-gray-500 -mr-4 mt-1">$</span></div></div><div class="text-gray-700 text-center mt-5">Time :  <span class="font-bold">${time}</span></div></div>`
        }

        return {

            NewRequestForm: NewRequestForm,
            pending: pending,
            decline: decline,
            approved: approved,
            closed: closed,
            No_withdrawal: No_withdrawal,
            All_withdrawal: All_withdrawal


        };
    };

    // MY PROFILE CARDS
    let Profile_card = () => {

        let change_image = (image) => {
            return `<div class="col-span-12 lg:col-span-8 xxl:col-span-9"><div class="intro-y box lg:mt-5" style="min-height: 65vh;"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Update Profile Picture</h2></div><div class="p-5"><div class="grid grid-cols-12 gap-5"><div class="col-span-12 xl:col-span-12"><div class="border border-gray-200 rounded-md p-5"><div class="w-40 h-40 relative image-fit cursor-pointer zoom-in mx-auto"><img class="rounded-md" alt="kelvin" src="${image}" pf_img></div><div class="w-40 mx-auto cursor-pointer relative mt-5"><button type="button" class="button w-full bg-theme-1 text-white" pfbtn><span>Change Picture</span></button><input type="file" accept="image/*" name="pf" class="w-full h-full top-0 left-0 absolute opacity-0"></div></div></div></div></div></div></div>`
        };

        let update = (a, b, c, d, e, f, g, h, wallet_name) => {
            return `<div class="col-span-12 lg:col-span-8 xxl:col-span-9"><form updateForm><div class="intro-y box lg:mt-5" style="min-height: 66vh;"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> Account Setting</h2></div><div class="p-5"><div class="grid grid-cols-12 gap-5"><div class="col-span-12 xl:col-span-6"><div><label>Firstname</label><input type="text" class="input w-full border mt-2" placeholder="Firstname" value="${a}" name="firstname" required></div><div class="mt-3"><label>Email Address</label><input type="text" class="input w-full border bg-gray-100 cursor-not-allowed mt-2" placeholder="Enter your email" disabled="" value="${b}" name="email" required></div><div class="mt-3"><label>Select Gender</label><select class="input w-full border mt-2" name="gender" required ><option value="Male" >Male</option><option value="Female">Female</option><option value="Other">Others</option></select></div><div class="mt-3"><label>Referral Code</label><input type="text" class="input w-full border bg-gray-100 cursor-not-allowed mt-2" placeholder="Input text" value="${d}" name="referral" disabled></div></div><div class="col-span-12 xl:col-span-6"><div><label>Lastname</label><input type="text" class="input w-full border mt-2" placeholder="Lastname" value="${e}" name="lastname"  required></div><div class="mt-3"><label>Phone</label><input type="text" class="input w-full border mt-2" placeholder="Enter Phone" value="${f}" name="phone" required ></div><div class="mt-3"><label>Wallet Name</label><input type="text" class="input w-full border mt-2" placeholder="Enter Wallet Name (E.g  Bitcoin)" value="${wallet_name}" name="wallet_name" required></div><div class="mt-3"><label>Wallet Address</label><input type="text" class="input w-full border mt-2" placeholder="Enter Wallet Address" value="${g}" name="wallet" required></div><div class="mt-3"><label>Contact Address</label><textarea class="input w-full border mt-2" placeholder="Enter Contact Address" name="contact" required>${h}</textarea></div></div></div><div class="flex justify-end mt-4"><button type="submit" class="button  mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Changes</button></div></div></div></form><div class="intro-y box lg:mt-5"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"></path></svg> Two factor authentication</h2></div><div class="flex items-center w-full mb-24 p-6"><label auth_toggle for="toggleA" class="flex items-center cursor-pointer"><div class="relative"><input auth_input id="toggleA" type="checkbox" class="hidden"><div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div><div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div></div><div class="ml-3 text-gray-700 font-medium"><span>Enable two factor authentication</span></div></label></div></div></div>`
        };
        let next_of_kin = (a, b, c, d, image) => {
            return `<div class="col-span-12 lg:col-span-8 xxl:col-span-9"><form updatenextkin><div class="intro-y box lg:mt-5" style="min-height: 66vh;"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M88 176v112m56-56H32"></path></svg> Next of Kin</h2></div><div class="p-5"><div class="grid grid-cols-12 gap-5"><div class="col-span-12 xl:col-span-8"><div><label>Name</label><input type="text" required class="input w-full border mt-2" placeholder="Enter name" value="${a}" name="name"></div><div class="mt-3"><label>Email Address</label><input type="email" required class="input w-full border mt-2" placeholder="Enter your email" value="${b}" name="email"></div><div class="mt-3"><label>Relationship to next of kin</label><select required placeholder="Relationship to next of kin" class="input w-full border mt-2" name="relationship"><option value="Father">Father</option><option value="Mother">Mother</option><option value="Brother">Brother</option><option value="Sister">Sister</option><option value="Son">Son</option><option value="Daughter">Daughter</option><option value="Relation">Relation</option></select></div><div class="mt-3"><label>Phone</label><input type="text" required class="input w-full border mt-2" placeholder="Enter Phone" value="${d}" name="phone"></div></div><div class="col-span-12 xl:col-span-4"><div><div class="grid grid-cols-12 gap-5"><div class="col-span-12 xl:col-span-12"><div class="border border-gray-200 rounded-md p-5"><div class="w-40 h-40 relative image-fit cursor-pointer zoom-in mx-auto"><img class="rounded-md" alt="next" src="${image}" kin_display_photo></div><div class="w-40 mx-auto cursor-pointer relative mt-5"><button type="button" class="button w-full bg-theme-1 text-white" change_kin_pf_btn><span>Change Picture</span></button><input type="file" accept="image/*" class="w-full h-full top-0 left-0 absolute opacity-0" name="change_kin_pf_inp" change_kin_pf_inp></div></div></div></div></div><div class="mt-3"></div></div></div><div class="flex justify-end mt-4"><button type="submit"  class="button  mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Changes</button></div></div></div></form></div>`
        };

        let change_password = () => {
            return `<div class="col-span-12 lg:col-span-8 xxl:col-span-9"><form changepassword><div class="intro-y box lg:mt-5" style="min-height: 66vh;"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>Change Password</h2></div><div class="p-5"><div><label>Current Password</label><input type="password" class="input w-full border mt-2" placeholder="Current Password" name="current" value required></div><div class="mt-3"><label>New Password</label><input type="password" class="input w-full border mt-2" placeholder="New Password" required name="new" value id="password"></div><div class="mt-3"><label>Confirm Password</label><input type="password" class="input w-full border mt-2" placeholder="Confirm Password" id="cpassword" value required></div><button type="submit" class="button bg-theme-1 text-white mt-4">Change Password</button></div></div></form></div>`
        };

        let change_email = () => {
            return `<div class="col-span-12 lg:col-span-8 xxl:col-span-9"><form changeemail><div class="intro-y box lg:mt-5" style="min-height: 65vh;"><div class="flex items-center p-5 border-b border-gray-200"><h2 class="font-medium text-base mr-auto"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2 text-theme-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg> Change Email</h2></div><div class="p-5"><div><label>Email Address</label><input required type="email" class="input w-full border mt-2" placeholder="Email Address" value name="email" ></div><button type="submit" class="button bg-theme-1 text-white mt-4">Submit</button></div></div></form></div>`
        };

        return {
            change_password: change_password,
            update: update,
            change_image: change_image,
            next_of_kin: next_of_kin,
            change_email: change_email
        }
    };

    // THIS SCRIPTS RUNS ONLY ON THE USER-INVESTMENT PAGE
    let investment_ = () => {
        let content = body.find("[ShowContent]");
        content.append(page_loader());

        let onLoadPage = () => {
            AjaxSubmit("/invests", "GET", "empty", false).then(function (data) {
                content.find(".lds-ring").remove();
                let result = data["data"];
                if (result === "no_investment") {
                    content.append(Investment_Card().No_investment());
                } else {
                    content.append(Investment_Card().All_investment())
                    for (let i = 0; i < result.length; i++) {
                        let res_ = result[i];
                        let status = res_["status"];

                        if (status === "waiting") {
                            content.find("[All_investment]").append(Investment_Card().waiting(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"], res_["currency"]));

                        } else if (status === "pending") {
                            content.find("[All_investment]").append(Investment_Card().pending(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"]));

                        } else if (status === "approved") {

                            content.find("[All_investment]").append(Investment_Card().approved(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"], res_["expiration"]));
                        } else if (status === "decline") {
                            content.find("[All_investment]").append(Investment_Card().decline(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"]));
                        } else if (status === "closed") {
                            content.find("[All_investment]").append(Investment_Card().closed(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"], res_["expiration"]));

                        } else if (status === "finalized") {
                            content.find("[All_investment]").append(Investment_Card().finalized(res_["id"], res_["category"], res_["plan"], res_["amount"], res_["roi"], res_["expiration"]));

                        }
                    }
                    $("a").addClass("active-link-on-window-ready");

                }
            });
        };

        let addNewInvestment = () => {

            let dbp = {
                "name": 'James Page',
                "email": 'example@gmail.com',
                'num': '02012365478',
                'position': "Position: Digital Asset Consultant",
                "image": "/static/private/managers/klklas.jpg"
            }
            let dbp1 = {
                "name": 'example Admin',
                "email": 'info@example.com',
                'num': '0123456789',
                'position': "Position: Account Manager",
                "image": "/static/private/managers/yhnxmk.jpg"
            }

            let new_investBTN = content.find("[new_investBTN]");


            //NAVIGATING AROUND MAKING NEW INVESTMENTS STEPS

            body.on("click", "[slide_view]", function (e) {
                e.preventDefault();
                let curr = $(this).attr("slide_view");
                let view = body.find(".myslider_");
                view.not(`.${curr}`).removeClass("d-show").addClass("d-none");
                body.find(`.${curr}`).addClass("d-show").removeClass("d-none");
            })

            new_investBTN.on("click", function () {
                content.find("[no_investement]").css("display", "none");
                content.find("[all_investment]").css("display", "none");
                content.append(Investment_Card().New_investment());
            });

            content.on("change", "[name='select_category']", function () {
                let category_id = $(this).val();
                let data = {"category": category_id}
                content.find("[name='select_investmentPlan']").empty();

                AjaxSubmit("/loadplan", "POST", data, true).then(function (data) {
                    let result = data["data"];
                    if (result[0] === "empty") {
                        content.find("[name='select_investmentPlan']").append(`<option value="">Select investment plan</option>`);

                    } else {
                        content.find("[name='select_investmentPlan']").prepend(`<option value>Select investment plan</option>`);

                        for (let i = 0; i < result.length; i++) {
                            content.find("[name='select_investmentPlan']").append(`<option value="${i}">${result[i]}</option>`);
                        }

                    }
                });

                content.find("[addContact_person ]").empty();

                //LOAD CONTACT MANAGER BASE ON THE ID OF THE CATEGORY SELECTED
                if (parseInt(category_id) === 1) {
                    content.find("[addContact_person]").append(Investment_Card().New_contact_person(dbp["name"], dbp["email"], dbp["num"], dbp["position"], dbp["image"]));
                } else if (parseInt(category_id) === 2) {
                    content.find("[addContact_person]").append(Investment_Card().New_contact_person(dbp1["name"], dbp1["email"], dbp1["num"], dbp1["position"], dbp1["image"]));
                }

            });

            content.on("change", "[name='select_investmentPlan']", function () {
                let category_id = content.find("[name='select_investmentPlan'] :selected").text();

                let data = {"category": category_id}

                content.find("[add_investment_amount]").remove();
                content.find("[add_investment_desc]").remove();

                AjaxSubmit("/loadplaninfo", "POST", data, true).then(function (data) {
                    let result = data["data"]
                    content.find("[NewInvestmentForm]").find("[btm_adv]").after(Investment_Card().add_investment_amount(result["amount"]))
                    content.find("[NewInvestmentForm]").find("[btm_adv]").after(Investment_Card().add_investment_desc(result["percent"], result["amount"], result["max"]))
                });

            });

            content.on("change", "[type='checkbox']", function () {
                if ($(this).val() === "yes") {
                    $(this).val("no");
                } else {
                    $(this).val("yes")
                }
            });

            content.on("submit", "[NewInvestmentForm]", function (e) {
                e.preventDefault();
                let form = new FormData(this);
                let category = content.find('[name="select_category"] :selected').text()
                let plan = content.find('[name="select_investmentPlan"] :selected').text()
                let wallet = content.find('[name="wallet"]').val()
                form.append("category", category)
                form.append("plan", plan)
                form.append("wallet", wallet)
                content.find("button[type='submit']").html(ringRotateCard()).prop("disabled", true).css("width","200px");


                AjaxSubmit("/CreateInvestment", "POST", form, false).then(function (data) {
                    if (data["data"] === "created") {
                        CustomAlert("success", "Investment has been created successfully");
                        content.find("button[type='submit']").html("Submit <svg viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" class=\"StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2\"><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z\"></path></svg>").prop("disabled", false);

                        setTimeout(function () {
                            window.location.href = "/user-investment"
                        }, 1000);
                    } else if (data["data"] === "insufficient balance") {
                        CustomAlert("error", "You have insufficient balance to pay using your wallet!");
                        content.find("button[type='submit']").html("Submit <svg viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" class=\"StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 ml-2\"><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z\"></path></svg>").prop("disabled", false);

                        return false
                    }
                });
            });

            content.on("click", "[name='cancel_addInvestment']", function () {

                if (content.find("[all_investment]").length === 1) {
                    content.find("[no_investement]").remove();
                    content.find("[new_investment]").remove();
                    content.find("[all_investment]").css("display", "grid");
                } else {
                    content.find("[no_investement]").css("display", "flex");
                    content.find("[new_investment]").remove();
                }


            });

            content.on("click", "[data_target='payment-box']", function (e) {
                e.preventDefault();
                let myparent = $(this).parents("[invest_id]");
                let id = myparent.attr("invest_id");
                let amount = myparent.find("[waiting_amount]").text()
                let plan = myparent.find("[waiting_plan]").text();
                let currency = myparent.attr("currency");
                setCookie('payment_currency',currency);

                body.append(Investment_Card().Payment_box(id, amount, plan, currency));
            });


            let payment_box_ = () => {

                body.on("click", "[get_payment_address]", function (e) {
                    e.preventDefault();
                    let parent_ = $(this).parents("[payment_box]");
                    let group = parent_.find("[group]");
                    group.children(":nth-child(5)").append(page_loader());
                    parent_.css("overflow", "auto");
                    let currency = readCookie("payment_currency");
                    setTimeout(function () {
                        group.children().last().remove()
                        group.find(".lds-ring").remove()
                        group.append(Investment_Card().show_payment_address(currency));
                        parent_.find(".modal__content").append(Investment_Card().show_payment_address_submit_body());
                    }, 1000);
                });


                // REMOVING THE PAYMENT BOX FROM THE BODY
                body.on("click", function (e) {
                    if ($(e.target).is("#payment-box")) {
                        let parent_ = body.find("[payment_box]");
                        parent_.remove();
                    }
                });

                //COPYING THE WALLET ADDRESS
                body.on("click", "[copy_address]", function (e) {
                    e.preventDefault();
                    let $this = $(this);
                    navigator.clipboard.writeText($(this).siblings("input").val()).then(function () {
                        CustomAlert("success", `${$this.siblings("input").val()} to clipboard!`)
                    });
                });

                body.on('click', "[cancel_paymentBTN]", function (e) {
                    e.preventDefault();
                    let parent_ = body.find("[payment_box]");
                    parent_.remove();
                });

                body.on("click", "[submit_paymentBTN]", function (e) {
                    e.preventDefault();
                    let payment_address = body.find("[name='enter_wallet_address']").val();
                    let parent_ = $(this).parents("[payment_box]");
                    let group = parent_.find("[group]");
                    let id = $(this).parents("[invest_id]").attr("invest_id");
                    let data = {
                        "id": id,
                        "payment_address": payment_address
                    }
                    group.children(":nth-child(1)").prepend(page_loader());
                    AjaxSubmit("/verify-payment", "POST", data, true).then(function (data) {
                        group.find(".lds-ring").remove()
                        let result = data["data"];
                        if (result === "success") {
                            window.location.href = "/user-investment";
                        } else {
                            CustomAlert("error", "Incorrect wallet address! please check your wallet address!")
                        }
                    });


                });


            }


            payment_box_();


        };

        //reinvestment
        body.on("click", "[reinvestbtn]", function (e) {
            e.preventDefault();
            let data = {
                id: $(this).parents("[invest_id]").attr("invest_id")
            }
            $(this).html(ringRotateCard()).attr("disabled", true);
            AjaxSubmit("/reinvestment", "POST", data, true).then(function (e) {
                if (e === "success") {
                    CustomAlert("success", "You have successfully reinvested your ROI");
                    body.find("[reinvestbtn]").html("Reinvest").attr("disabled", false);
                    setTimeout(function () {
                        location.reload();
                    }, 1000)

                }
            });

        });

        //Move to wallet button
        body.on("click", "[movetowalletbtn]", function (e) {
            e.preventDefault();
            let data = {
                id: $(this).parents("[invest_id]").attr("invest_id")
            }
            $(this).html(ringRotateCard()).attr("disabled", true);
            AjaxSubmit("/MoveToWallet", "POST", data, true).then(function (e) {
                if (e === "success") {
                    CustomAlert("success", "Your ROI has been deposited into your wallet!");
                    body.find("[movetowalletbtn]").html("Move to Wallet").attr("disabled", false);
                    setTimeout(function () {
                        location.reload();
                    }, 1000)

                }
            });

        });


        setTimeout(function () {
            onLoadPage();
        }, 1000);

        addNewInvestment();
    };

    // THIS SCRIPTS RUNS ONLY ON THE REFERRAL PAGE
    let referral_ = () => {
        let ref_input = body.find("[title='referral code']");

        //COPYING THE REFERRAL CODE
        ref_input.siblings("svg").on("click", function (e) {
            e.preventDefault();
            navigator.clipboard.writeText(ref_input.val()).then(function () {
                CustomAlert("success", `${ref_input.val()} to clipboard!`)
            });
        })

    };

    // THIS SCRIPTS RUNS ONLY ON THE WITHDRAWAL REQUEST PAGE
    let withdrawal_request_ = () => {
        let new_request = body.find("[new_request]");
        let withdrawal_content = body.find("[withdrawal_content]");
        let wallet_balance = body.find("[wallet_balance]").attr("wallet_balance").replace('$', '').replace(',', '');
        let content = body.find("[ShowContent]").find("[withdrawal_list]");
        content.append(page_loader());

        new_request.on("click", function (e) {
            e.preventDefault();
            AjaxSubmit("/fetch_address", "POST", "", false).then(function (e) {
                let res = e["data"];
                if (res === "empty") {
                    withdrawal_content.find("[NewRequestForm]").remove();
                    withdrawal_content.append(Withdrawal_Card().NewRequestForm(parseInt(wallet_balance), '', ''))
                } else {
                    withdrawal_content.find("[NewRequestForm]").remove();
                    withdrawal_content.append(Withdrawal_Card().NewRequestForm(parseInt(wallet_balance), res["wallet_name"], res["wallet_address"]))
                }

            })

        });

        body.on("submit", "[requestWithdrawalForm]", function (e) {
            e.preventDefault();
            let form = new FormData(this);
            let requestWithdrawalForm = body.find("[requestWithdrawalForm]");

            if (requestWithdrawalForm.attr("requestWithdrawalForm") === "submit") {
                let $this = $(this);
                $this.find("button").prop("disabled", true).html(ringRotateCard);

                setTimeout(function () {
                    $this.find("button").prop("disabled", false).html("Send Request");
                    AjaxSubmit("/request-withdrawal", "POST", form, false).then(function (data) {
                        let result = data["data"];
                        if (result === "success") {
                            CustomAlert("success", "Please enter the verification code sent to your email address.");
                            requestWithdrawalForm.attr("requestWithdrawalForm", "verify");
                            requestWithdrawalForm.children().first().append(`

                           <div class="w-full mt-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amount">Verification Code</label>
                            <input  type="text" id="oth" required class="intro-x login__input input w-full input--lg border border-gray-300 block mt-4" placeholder="Enter Verification Code" value="" name="verification">
                           </div>
                        `);

                        } else if (result === "wallet_does_not_match") {
                            CustomAlert("error", "You have been banned from withdrawal because you used an incorrect wallet which doesn't match your account wallet address.Please contact the support Team");
                        } else if (result === 'Banned') {
                            CustomAlert("error", "You have been banned from withdrawal, please contact the Support Team");
                        } else if (result === "insufficient fund") {
                            CustomAlert("error", "insufficient fund");
                        }
                    });
                }, 1000)

            } else if (requestWithdrawalForm.attr("requestWithdrawalForm") === "verify") {

                let $this = $(this);
                $this.find("button").prop("disabled", true).html(ringRotateCard);

                setTimeout(function () {
                    $this.find("button").prop("disabled", false).html("Send Request");
                    AjaxSubmit("/verify-withdrawal", "POST", form, false).then(function (data) {
                        if (data === "success") {
                            body.find("[NewRequestForm]").remove();
                            location.reload();
                        } else {
                            CustomAlert("error", "Incorrect Verification Code")
                        }
                    });
                }, 1000)
            }


        });

        let onLoadPage = () => {
            AjaxSubmit("/withdraw", "GET", "empty", false).then(function (data) {
                content.find(".lds-ring").remove();
                let result = data["data"];
                if (result === "no_withdrawal") {
                    content.append(Withdrawal_Card().No_withdrawal());
                } else {
                    content.append(Withdrawal_Card().All_withdrawal())
                    for (let i = 0; i < result.length; i++) {
                        let res_ = result[i];
                        let status = res_["status"];

                        if (status === "pending") {
                            content.find("[All_investment]").append(Withdrawal_Card().pending(res_["id"], res_["amount"], res_["time"]));

                        } else if (status === "approved") {

                            content.find("[All_investment]").append(Withdrawal_Card().approved(res_["id"], res_["amount"], res_["time"]));
                        } else if (status === "decline") {
                            content.find("[All_investment]").append(Withdrawal_Card().decline(res_["id"], res_["amount"]));
                        } else if (status === "closed") {
                            content.find("[All_investment]").append(Withdrawal_Card().closed(res_["id"], res_["amount"], res_["time"]));

                        }
                    }
                }
            });
        };

        setTimeout(function () {
            onLoadPage();
        }, 1000);

    };

    // THIS SCRIPTS RUNS ONLY ON THE PROFILE PAGE
    let profile_ = () => {

        let profile_block = body.find("[profile_block]");
        let Profile_NavLinks = profile_block.find("[Profile_NavLinks]");
        let navlinks = Profile_NavLinks.children("a");


        navlinks.each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                navlinks.removeClass("side-menu--active text-theme-1 font-medium ");
                $(this).addClass("side-menu--active text-theme-1 font-medium ");
                profile_block.children().last().remove();
                profile_block.append(page_loader);

                switch ($(this).attr("href")) {
                    case "/profile":
                        window.location.href = "/profile";
                        profile_block.find(".lds-ring").remove();
                        break;
                    case "/change-image":
                        setTimeout(function () {
                            AjaxSubmit("/profile-info", "POST", "empty", false).then(function (data) {
                                profile_block.append(Profile_card().change_image(data["pf"]));
                                profile_block.find(".lds-ring").remove();
                            });
                        }, 1000)

                        break;
                    case "/update":
                        setTimeout(function () {
                            AjaxSubmit("/profile-info", "POST", "empty", false).then(function (data) {
                                profile_block.find(".lds-ring").remove();
                                profile_block.append(Profile_card().update(data["firstname"], data["email"], data["gender"], data["referral"], data["lastname"], data["phone"], data["wallet"], data["contact_address"], data["wallet_name"]))
                                profile_block.find("select").find(`[value=${data["gender"]}]`).attr("selected", "selected");
                                if (data["auth"] === "YES") {
                                    profile_block.find("[auth_toggle]").addClass("checked");
                                    profile_block.find(".toggle__dot ").css("left", "1rem")
                                } else {
                                    profile_block.find("[auth_toggle]").removeClass("checked");
                                    profile_block.find(".toggle__dot ").css("left", "-.25rem")
                                }
                            });
                        }, 1000)

                        break;
                    case "/next-of-kin":
                        setTimeout(function () {
                            AjaxSubmit("/kin-info", "POST", "empty", false).then(function (data) {
                                profile_block.find(".lds-ring").remove();
                                profile_block.append(Profile_card().next_of_kin(data["kin_name"], data["kin_email"], data["kin_relation"], data["kin_phone"], data["kin_pf"]));
                                profile_block.find("select").find(`[value=${data["kin_relation"]}]`).attr("selected", "selected");
                            });
                        }, 1000);
                        break;
                    case "/change-password":
                        setTimeout(function () {
                            profile_block.append(Profile_card().change_password())
                            profile_block.find(".lds-ring").remove();
                        }, 1000)
                        break;
                    case "/change-email":
                        setTimeout(function () {
                            profile_block.append(Profile_card().change_email())
                            profile_block.find(".lds-ring").remove();
                        }, 1000)
                        break;
                    default:
                        break;
                }
            })
        });

        let update_account_setting = () => {
            body.on("submit", "[updateForm]", function (e) {
                e.preventDefault();
                let btn_ = body.find("[updateForm]").find("[type='submit']");
                btn_.html("Please wait...");
                let form = new FormData(this);
                AjaxSubmit("/update-bio", "POST", form, false).then(function (data) {
                    btn_.html(`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Changes`);
                    let result = data["data"];
                    if (result === "success") {
                        CustomAlert("success", "The changes has been saved successfully!")
                    }
                });
            });
        };

        let update_next_of_kin = () => {
            body.on("submit", "[updatenextkin]", function (e) {
                e.preventDefault();
                let btn_ = body.find("[updatenextkin]").find("[type='submit']");
                btn_.html("Please wait...");
                let form = new FormData(this);
                AjaxSubmit("/update-kin", "POST", form, false).then(function (data) {
                    btn_.html(`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="StyledIconBase-ea9ulj-0 hPhvO w-4 h-4 mr-2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Changes`);
                    let result = data["data"];
                    if (result === "success") {
                        CustomAlert("success", "The changes has been saved successfully!")
                    }
                });

            });


            body.on("change", "[name='change_kin_pf_inp']", function () {
                if (this.files) $.each(this.files, readAndPreview);

                function readAndPreview(i, file) {
                    if (!/\.(jpe?g|png)$/i.test(file.name)) {
                        return CustomAlert("error", file.name + " " + "is not an image");
                    }
                    let reader = new FileReader();

                    $(reader).on("load", function () {
                        let image_data = this.result.replace("data:" + file.type + ";base64,", '');
                        let data = {
                            "pf": image_data
                        };
                        body.find("[change_kin_pf_btn]").prop("disabled", true).html("please wait..");
                        AjaxSubmit("/kin-photo", "POST", data, true).then(function (data) {
                            if (data["data"][0] === "success") {
                                body.find("[change_kin_pf_btn]").prop("disabled", false).html("Change Picture");
                                body.find("[kin_display_photo]").attr("src", reader.result);
                                CustomAlert("success", "your display photo has been changed successfully")
                            }
                        });
                    });
                    reader.readAsDataURL(file);
                }

            });


        };

        let LoginAuthentication = () => {

            profile_block.on("click", "[auth_toggle]", function (e) {
                e.preventDefault();
                let toggle__dot = $(this).find(".toggle__dot ");
                if (!$(this).hasClass("checked")) {
                    $(this).addClass("checked");
                    toggle__dot.css(
                        "left", "1rem"
                    );
                    let data = {"data": "YES"}
                    AjaxSubmit("/auth-update", "POST", data, true).then(function (data) {
                        let result = data["data"];
                        if (result === "success") {
                            CustomAlert("success", " Two factor authentication has been set successfully!")
                        }
                    });
                } else {
                    $(this).removeClass("checked");
                    toggle__dot.css(
                        "left", "-.25rem"
                    );
                    let data = {"data": "NO"}
                    AjaxSubmit("/auth-update", "POST", data, true).then(function (data) {
                        let result = data["data"];
                        if (result === "success") {
                            CustomAlert("success", " Two factor authentication has been set successfully!")
                        }
                    });
                }
            });
        };

        update_account_setting();
        update_next_of_kin();
        LoginAuthentication();


    };

    let contact_support = () => {
        let contact_btn = body.find("[contact_us_btn]");
        let apply_position_btn = body.find("[apply_position_btn]");
        let apply_loan_btn = body.find("[apply_loan_btn]");

        contact_btn.on("click", function (e) {
            e.preventDefault();
            body.append(`
            <div class="confirm_receipt property__" contact_admin_box style="display: flex;">
        <div class="box" confirm_box="">
            <div class="title">CONTACT SUPPORT TEAM
                <div class="btns">
                    <button class="cancel" close_support_team>Close</button>
                </div>
            </div>
            <div class="confirmation property_box" confirmation="">
                <form contact_support_form>

                    <div class="forms_">


                        <div class="box_">
                            <label>Message</label>
                            <textarea name="message" placeholder="Type your message.." style="margin-top: 10px"></textarea>
                        </div>

                    </div>
                    <div class="submission">
                        <button type="submit" support_send_btn >Send</button>
                    </div>
                    <p style="text-align: center;color: red">Our team will reply you back to the email you registered an account with us.</p>
                </form>
            </div>
        </div>
    </div>

            `);

        });
        apply_position_btn.on("click", function (e) {
            e.preventDefault();
            body.append(`
            <div class="confirm_receipt property__" contact_admin_box style="display: flex;">
        <div class="box" confirm_box="">
            <div class="title">APPLY FOR OFFICIAL POSITION
                <div class="btns">
                    <button class="cancel" close_support_team>Close</button>
                </div>
            </div>
            <div class="confirmation property_box" confirmation="">
                    <p style="
                        font-size: 18px;
                        text-align: center;
                        color: darkred;
                        font-family: inherit;
                        margin: 20px 0;
                    "> Contact any of the Support for further information and directives</p>     
                    <p style="
            text-align: center;
            font-size: 16px;
            color: black;
        ">Whatsapp Contact Support  : <a href="https://wa.me/message/3VHNQAIJ4BB4B1" style="text-decoration: underline;color: #2828a9;padding: 5px;pointer-events: unset !important;">https://wa.me/message/3VHNQAIJ4BB4B1</a>or +1-415-952-5508</p>   
            </div>
        </div>
    </div>

            `);

        });
        apply_loan_btn.on("click", function (e) {
            e.preventDefault();
            body.append(`
            <div class="confirm_receipt property__" contact_admin_box style="display: flex;">
        <div class="box" confirm_box="">
         <div class="title">APPLY FOR A LOAN
                <div class="btns">
                    <button class="cancel" close_support_team>Close</button>
                </div>
            </div>
            <div class="confirmation property_box" confirmation="">
                    <p style="
                        font-size: 17px;
                        text-align: center;
                        color: darkred;
                        font-family: inherit;
                        margin: 20px 0;
                    "> We at example aids both family, personal and corporate investors grow financially by granting loans. Contact any of the Support for further information and directives.</p>    
                    <p style="
                        font-size: 17px;
                        text-align: center;
                        color: darkred;
                        font-family: inherit;
                        margin: 20px 0;
                    ">NOTE: A collateral down payment of 27% is required of your requested loan amount before your loan request can be granted</p> 
                    <p style="
            text-align: center;
            font-size: 16px;
            color: black;
        ">Whatsapp Contact Support  : <a href="https://wa.me/message/**********" style="text-decoration: underline;color: #2828a9;padding: 5px;pointer-events: unset !important;">https://wa.me/message/3VHNQAIJ4BB4B1</a> or +1-415-952-5508</p>   
            </div>
        </div>
    </div>

            `);

        });


        body.on("click", '[close_support_team]', function (e) {
            e.preventDefault();
            body.find("[contact_admin_box]").remove();
        });

        body.on("submit", "[contact_support_form]", function (e) {
            e.preventDefault();
            let form = new FormData(this);
            let sub_btn = body.find("[support_send_btn]");

            sub_btn.html("Sending").prop("disabled", true);

            AjaxSubmit("/contact-team", "POST", form, false).then(function (res) {
                let data = res["data"];
                sub_btn.html("SEND").prop("disabled", false);

                if (data === "success") {
                    CustomAlert("success", "Message has been sent successfully!");
                    setTimeout(function () {
                        body.find("[contact_admin_box]").remove();
                    }, 1000);
                } else {
                    CustomAlert("error", "Message Failed!");

                }
            })
        });
    };

    ProfilePhoto();
    ChangePassword();
    ChangeEmail();
    changeURLCss();
    contact_support();


    switch (app_name.attr("app-page")) {
        case "user-investment":
            investment_();
            break;
        case "referral":
            referral_();
            break;
        case "withdrawal-request":
            withdrawal_request_();
            break;
        case "profile":
            profile_();
            break;
        default:
            console.log("Check the general.js for debugging..")
    }
});
