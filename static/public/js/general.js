$(document).ready(function () {

    let body = $("body");
    let app_name = body.find("[app-page]");
    $("a").addClass("active-link-on-window-ready");

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

    let SignUp = () => {
        let SignupForm = body.find("[SignupForm]");

        let select2 = () => {
            $(".gender_select").select2({
                placeholder: "Select Gender"
            });
            $(".country_select").select2({
                placeholder: "Select Country"
            });
        }

        let sign_up_sliding = () => {
            let firstslide = SignupForm.find("[firstslide]");
            let secondslide = SignupForm.find("[secondslide]");

            SignupForm.find("button").on("click", function () {
                if ($(this).is("[Next]")) {
                    firstslide.css("display", "none");
                    secondslide.fadeIn("300");

                } else if ($(this).is("[Previous]")) {
                    secondslide.css("display", "none");
                    firstslide.fadeIn("300");
                }
            })
        }

        let Add_referral = () => {
            let AddReferral = body.find("[addreferral]");

            AddReferral.on("click", function () {
                $(this).replaceWith('<label for="referral_code">Referral Code</label><input required="" type="text"\n' +
                    '                                                                          class=" input w-full input--lg border border-gray-300 block mb-4"\n' +
                    '                                                                          name="referral" id="referral" title="referral"\n' +
                    '                                                                          placeholder="Referral Code"\n' +
                    '                                                                          value="">');
            });
        }

        select2();
        sign_up_sliding();
        Add_referral();
    };

    // CustomAlert("warning", "how are you");


    // THIS IS THE SCRIPT THAT RUNS THE WHOLE PAGE
    switch (app_name.attr("app-page")) {
        case "signup" :
            SignUp()
    }
});