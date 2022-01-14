// noinspection HtmlUnknownAttribute


$(document).ready(function () {

    let body = $("body");

    let app_name = body.find("[app-page]");

    let url = window.location.href;

    let page = url.slice(url.lastIndexOf("/") + 1).replace(/[^a-z0-9\s]/gi, '');

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

    let changeURLCss = () => {
        let sidebar_menu = body.find("#sidebar_menu");

        switch (page) {
            case "AppAdmin":
                body.attr("app-page", page);
                sidebar_menu.find("[href='/AppAdmin']").addClass("active");
                break;
            case "transactions":
                body.attr("app-page", page);
                sidebar_menu.find("[href='/AppAdmin/transactions']").addClass("active");
                break;
            case "users":
                sidebar_menu.find("[href='/AppAdmin/users']").addClass("active");
                body.attr("app-page", page)
                break;
            case "withdrawal":
                sidebar_menu.find("[href='/AppAdmin/withdrawal']").addClass("active");
                body.attr("app-page", page)
                break;
            case "packages":
                sidebar_menu.find("[href='/AppAdmin/withdrawal']").addClass("active");
                body.attr("app-page", page)
                break;
            default:
                console.log("page is not available")

        }
    };

    let Transaction_ = () => {

        let ViewMore = (email, category, plan, currency, amount, wallet, status, roi, due_date, wallet_address) => {
            return `<div class="confirm_receipt" confirm_receipt>
            <div class="box" confirm_box>
                <div class="title">Transaction Details
                    <div class="btns">
                        <button class="cancel" close_receipt>Close</button>
                    </div>
                </div>
                <div class="confirmation" confirmation>
                    <div class="des_box">
                        <p class="name">Email</p>
                        <p class="value">${email}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Category</p>
                        <p class="value">${category}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Plan</p>
                        <p class="value">${plan}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Currency</p>
                        <p class="value">${currency}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Amount</p>
                        <p class="value">$${parseInt(amount).toLocaleString()}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Wallet</p>
                        <p class="value">${wallet}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Status</p>
                        <p class="value">${status}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">ROI</p>
                        <p class="value">$${parseInt(roi).toLocaleString()}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Payee WalletAddress</p>
                        <p class="value">${wallet_address}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Due Date</p>
                        <p class="value">${due_date}</p>
                    </div>
    
    
                </div>
            </div>
        </div>`
        }


        // Assigning values to the ticket status automatically

        setInterval(function () {
            body.find("[ChangeStatus]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected")
            })
        }, 100);

        //View more transaction details
        body.on("click", "[view_more]", function () {
            let $this = $(this);
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/transaction-view-more", "POST", data, true).then(function (data) {
                let res = data["data"];
                body.append(ViewMore(res["email"], res["category"], res["plan"], res["currency"], res["amount"], res["wallet"], res["status"], res["roi"], res["expiration"], res["wallet_address"]))
            });

        });

        // close the view more transaction details
        body.on("click", "[close_receipt]", function (e) {
            body.find("[confirm_receipt]").remove();
        });

        // changing the status of the ticket slip
        body.on("change", "[ChangeStatus]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-approve-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `Ticket status has been changed successfully to ${value}`);
                }

            });
        });

    };

    let users_ = () => {

        let ViewMore = (firstname, lastname, email, gender, referral, wallet_name, wallet, phone, total_invest, total_refferal, contact_address,referredby,referredTo) => {
            return `<div class="confirm_receipt" confirm_receipt>
            <div class="box" confirm_box>
                <div class="title">User Details
                    <div class="btns">
                        <button class="cancel" close_receipt>Close</button>
                    </div>
                </div>
                <div class="confirmation" confirmation>
                    <div class="des_box">
                        <p class="name">firstname</p>
                        <p class="value">${firstname}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">lastname</p>
                        <p class="value">${lastname}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">email</p>
                        <p class="value">${email}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">gender</p>
                        <p class="value">${gender}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">referral</p>
                        <p class="value">${referral}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Wallet Name</p>
                        <p class="value">${wallet_name}</p>
                    </div>  <div class="des_box">
                        <p class="name">Wallet</p>
                        <p class="value">${wallet}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">phone</p>
                        <p class="value">${phone}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">total investment</p>
                        <p class="value">${total_invest}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">total referrals</p>
                        <p class="value">${total_refferal}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">My address</p>
                        <p class="value">${contact_address}</p>
                    </div>  
                    <div class="des_box">
                        <p class="name">Referred By : </p>
                        <p class="value">${referredby}</p>
                    </div>
                     <div class="des_box">
                        <p class="name">People Referred To : </p>
                        <p class="value">${referredTo}</p>
                    </div>
    
                </div>
            </div>
        </div>`
        }

        setInterval(function () {
            body.find("[ChangeStatus]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected")
            });
        }, 100);


        setInterval(function () {
            body.find("[isAdmin]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected");
            });
        }, 100);

        setInterval(function () {
            body.find("[withdraw_ban]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected");
            });
        }, 100);


        //View more user view details
        body.on("click", "[view_more]", function () {
            let $this = $(this);
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/individual-details", "POST", data, true).then(function (data) {
                let res = data["data"];
                body.append(ViewMore(res[0]["firstname"], res[0]["lastname"], res[0]["email"], res[0]["gender"], res[0]["referral"], res[0]["wallet_name"], res[0]["wallet"], res[0]["phone"], res[0]["total_investements"], res[0]["total_referral"], res[0]["contact_address"],res[1],res[2]))
            });

        });

        // close the view more user details details
        body.on("click", "[close_receipt]", function (e) {
            body.find("[confirm_receipt]").remove();
        });

        // changing the User ban option on users
        body.on("change", "[ChangeStatus]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-disabled-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `This user disabled status has been successfully changed to ${value}`);
                }

            });
        });

        // changing the IsAdmin option on users
        body.on("change", "[isAdmin]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-IsAdmin-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `This user IsAdmin status has been successfully changed to ${value}`);
                }

            });
        });

        // changing the Withdraw ban option on users
        body.on("change", "[withdraw_ban]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-withdraw_ban-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `This user IsAdmin status has been successfully changed to ${value}`);
                }

            });
        });


        // create a new packages new pop form
        body.on("click", "[add_balance]", function (e) {
            e.preventDefault();
            let id = $(this).attr("id");
            body.find(".confirm_receipt").css("display", "flex").attr('id', id);
        });

        // close the  new packages new pop form
        body.find("[AddPackage]").on("click", "[close_property]", function (e) {
            body.find("[AddPackage]").fadeOut("300");
        });


        body.find("[editbalanceform]").on("submit", function (e) {
            e.preventDefault();
            let form = new FormData(this);
            let id = body.find(".confirm_receipt").attr("id");
            form.append("id", id);
            let btn = $(this);
            btn.find("button").html("Editing Balance...").prop("disabled", true);
            AjaxSubmit('/edit-user-balance', "POST", form, false).then(function (result) {
                let data = result["data"]
                btn.find("button").html("SAVE").prop("disabled", false);
                if (data === "success") {
                    CustomAlert("success", "Balance has been added successfully");
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            })

        });

    };

    let withdrawal_ = () => {
        // Assigning values to the ticket status automatically

        setInterval(function () {
            body.find("[ChangeStatus]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected")
            });

        }, 100);

        // changing the status of the ticket slip
        body.on("change", "[ChangeStatus]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-withdraw-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `Ticket status has been changed successfully to ${value}`);
                }

            });
        });
    };

    let packages = () => {
        //View more user view details
        body.on("click", "[delete]", function () {
            let tablerow = $(this);
            let table = $(".lms_table_active3 ").DataTable();

            let $this = $(this);
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/delete-package", "POST", data, true).then(function (data) {
                let res = data["data"];
                if (res === "success") {
                    table.row(tablerow.parents('tr')).remove().draw();
                    CustomAlert("success", "Package has been successfully deleted!");
                }
            });

        });

        // create a new packages new pop form
        body.on("click", "[add_package]", function (e) {
            e.preventDefault();
            body.find(".confirm_receipt").css("display", "flex");
        });

        // close the  new packages new pop form
        body.find("[AddPackage]").on("click", "[close_property]", function (e) {
            body.find("[AddPackage]").fadeOut("300");
        });

        body.find("[newpackageform]").on("submit", function (e) {
            e.preventDefault();
            let form = new FormData(this);
            let btn = $(this);
            btn.find("button").html("Adding package...").prop("disabled", true);
            AjaxSubmit('/create-new-package', "POST", form, false).then(function (result) {
                let data = result["data"]
                btn.find("button").html("UPLOAD PACKAGE").prop("disabled", false);
                if (data === "success") {
                    CustomAlert("success", "Package has been added successfully");
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            })

        });

    };

    changeURLCss();

    switch (body.attr("app-page")) {
        case "transactions":
            Transaction_();
            break;
        case "users":
            users_();
            break;
        case "withdrawal":
            withdrawal_();
            break;
        case "packages":
            packages();
            break;
        default:
            console.log("Check the general.js for debugging..")
    }
});
