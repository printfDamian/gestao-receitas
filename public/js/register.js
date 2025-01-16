// utilizar ajax + jquery para validação de dados do cliente, envio, receber e tratar resposta do servidor



$("#register-form").submit(function(e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr('action');

    const name = form.find('input[name="name"]').val();
    const email = form.find('input[name="email"]').val();
    const password = form.find('input[name="password"]').val();
    const confirmPassword = form.find('input[name="confirmPassword"]').val();
    const remember = form.find('input[name="remember"]').is(':checked');

    if(password != confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    $.post(
        url,
        { 
            email: email,
            name: name,
            password: password 
        },
        function(response, status, err) {
            console.log(response);
            console.log(status);
            console.log(err);
            if(err) return alert(JSON.stringify(err));

            if(response == 'ok') {
                alert("Register success!");
                console.log("Register success!")
                window.location.href = '/explorer';
            } else {
                alert(response);
            }
        }
    );
});