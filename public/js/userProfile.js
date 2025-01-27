$(document).ready(function() {
    $('#updateProfileForm').on('submit', function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();

        $.ajax({
            url: '/profile/update',
            method: 'POST',
            data: { name, email },
            success: function(response) {
                alert('Profile updated successfully');
                location.reload();
            },
            error: function(error) {
                alert('Error updating profile');
            }
        });
    });
});