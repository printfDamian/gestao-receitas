$("#register-form").on('submit', function(e) {
    e.preventDefault();

    const form = $(this);
    const url = form.attr('action');

    const name = form.find('input[name="name"]').val();
    const email = form.find('input[name="email"]').val();
    const password = form.find('input[name="password"]').val();
    const confirmPassword = form.find('input[name="confirmPassword"]').val();
    const remember = form.find('input[name="remember"]').is(':checked');

    if(password != confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: { 
            email: email,
            name: name,
            password: password 
        },
        success: function(response) {
            console.log(response);
            if(response == 'ok') {
                showAlert("Register success!", "success");
                setTimeout(() => {
                    window.location.href = '/explorer';
                }, 1500);
            } else {
                showAlert(response, "danger");
            }
        },
        error: function(error) {
            console.error(error);
            showAlert(error.responseJSON.error, "danger");
        }
    });
});
