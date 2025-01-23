let formElements;
var passwordRegex, passwordDesc;

$(function() {
    formElements = {
        form: $('#auth-form'),
        email: $('#inlineFormInputGroupEmail'),
        password: $('#inlineFormInputPassword'),
        remember: $('#autoSizingCheck2')
    };

    formElements.password.on('focusout', function() {
        if($(this).val() === '') return;
        validatePassword($(this).val());
    });

    formElements.form.on('submit', async function(e) {
        e.preventDefault();

        const url = $(this).attr('action');

        if(!await validatePassword(formElements.password.val())) return;

        $.ajax({
            type: 'POST',
            url: url,
            data: { 
                email: formElements.email.val(),
                password: formElements.password.val(),
                remember: formElements.remember.is(':checked')
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 201) {
                    document.cookie = `loginToken=${data.token}; path=/`;

                    let params = new URLSearchParams(document.location.search);
                    let destination = '/explorer';
                    if(params.get('destination')) {
                        destination = "/" + params.get('destination');
                    }

                    setTimeout(() => {
                        window.location.href =
                        destination
                        + '?alert=' 
                        + encodeURI("Login success!")
                        + '&type='
                        + encodeURI("success");
                    }, 1500);
                } else {
                    showAlert(response, "danger");
                }
            },
            error: function(err) {
                if (!err) return;
                console.error(err);
                const errorMessage = err.responseJSON?.error || 'Registration failed. Please try again.';
                showAlert(errorMessage, "danger");
            }
        });
    });
});

function getRegex() {
    if(passwordRegex) return;
    return $.ajax({
        type: 'GET',
        url: '/api/validations',
        success: function(response) {
            passwordDesc = response.password.description;
            passwordRegex = new RegExp(response.password.regexStr);
        },
        error: function(error) {
            console.error(error);
            showAlert(error.responseJSON.error, "danger");
        }
    });
}

async function validatePassword(psw) {
    await getRegex();
    if(!passwordRegex.test(psw)) {
        showAlert(passwordDesc, "warning");
        return false;
    } else {
        return true;
    }
}
