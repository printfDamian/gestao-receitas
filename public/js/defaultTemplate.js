let params = new URLSearchParams(document.location.search);

$(function() {
    if (params.get('alert')) {
        let type = params.get('type') || 'info';
        showAlert(params.get('alert'), type);
    }
});

function showAlert(message, type = 'danger') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show fixed-top " role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', alertHTML);

    params.delete('alert');
    params.delete('type');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, document.title, newUrl);

    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

$.ajaxSetup({
    beforeSend: function(xhr) {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('loginToken='))
            ?.split('=')[1];
        if (token) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    }
});
