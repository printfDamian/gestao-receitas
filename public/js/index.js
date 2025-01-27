const searchLocation = "/recipes/explore";
const searchInput = $('.search_input');
const searchIcon = $('.search_icon');

searchInput.on('keypress', function (e) {
    if (e.key === 'Enter') {
        window.location.href = searchLocation + '?search=' + encodeURI(searchInput.val());
    }
});

searchIcon.on('click', function () {
    window.location.href = searchLocation + '?search=' + encodeURI(searchInput.val());
});