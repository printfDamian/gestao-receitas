let formElements;
var passwordRegex, passwordDesc;

$(function() {
    formElements = {
        form: $('#register-form'),
        name: $('#inlineFormInputName'),
        email: $('#inlineFormInputGroupEmail'),
        password: $('#inlineFormInputPassword'),
        confirmPassword: $('#inlineFormInputConfPassword'),
        remember: $('#autoSizingCheck2')
    };

    formElements.password.on('focusout', function() {
        validatePassword($(this).val());
    });

    formElements.form.on('submit', async function(e) {
        e.preventDefault();

        const url = $(this).attr('action');

        if(!await validatePassword(formElements.password.val())) return;
        if(formElements.password.val() != formElements.confirmPassword.val()) {
            showAlert("Passwords don't match!", "danger");
            return;
        }

        $.ajax({
            type: 'POST',
            url: url,
            data: { 
                email: formElements.email.val(),
                name: formElements.name.val(),
                password: formElements.password.val(),
                remember: formElements.remember.is(':checked')
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 201) {

                    document.cookie = `loginToken=${data.token}; path=/`;

                    setTimeout(() => {
                        window.location.href = '/explorer?alert=' 
                        + encodeURI("Register success!")
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
