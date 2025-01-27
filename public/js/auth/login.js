let formElements;

$(function() {
    formElements = {
        form: $('#auth-form'),
        email: $('#inlineFormInputGroupEmail'),
        password: $('#inlineFormInputPassword'),
        remember: $('#autoSizingCheck2')
    };

    formElements.form.on('submit', async function(e) {
        e.preventDefault();

        const url = $(this).attr('action');

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
                    showAlert(data.error, "danger");
                }
            },
            error: function(err) {
                if (!err) return;
                console.error(err);
                const errorMessage = err.responseJSON?.error || 'Login failed. Please try again.';
                showAlert(errorMessage, "danger");
            }
        });
    });
});
