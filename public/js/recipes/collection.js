function showInputModal(title, value = '', callback) {
    const modalHtml = `
        <div class="modal fade" id="inputModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" value="${value}">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary confirm-btn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const $modal = $(modalHtml);
    $('body').append($modal);
    
    $modal.on('click', '.confirm-btn', function() {
        const value = $modal.find('input').val().trim();
        if (value) {
            callback(value);
            $modal.modal('hide');
        }
    });

    $modal.on('hidden.bs.modal', function() {
        $modal.remove();
    });

    $modal.modal('show');
}

$(document).on('click', '.collection', async function(e) {
    e.preventDefault();
    
    if (!document.cookie.includes("loginToken")) {
        showAlert("Please login to manage collections", "danger");
        return;
    }

    const recipeId = $(this).closest('.card-footer').find('a').attr('href').split('=')[1];
    const $modal = $(`#collectionsModal-${recipeId}`);
    const $list = $modal.find('.collections-list');
    const $noCollections = $modal.find('.no-collections-message');
    
    try {
        const collections = await $.ajax({
            url: '/api/collections',
            method: 'GET'
        });
        
        $list.empty();
        if (collections.length === 0) {
            $noCollections.show();
        } else {
            $noCollections.hide();
            collections.forEach(collection => {
                $list.append(`
                    <div class="collection-item d-flex justify-content-between align-items-center mb-2" data-id="${collection.id}">
                        <button class="btn btn-outline-primary flex-grow-1 me-2 add-to-collection">
                            ${collection.name}
                        </button>
                    </div>
                `);
            });
        }
        
        $modal.modal('show');
    } catch (error) {
        console.error("Error loading collections:", error);
        showAlert("Error loading collections", "danger");
    }
});

$(document).on('click', '.create-collection', function() {
    const $modal = $(this).closest('.modal');
    const $input = $modal.find('input');
    const name = $input.val();
    
    if (!name) return;
    
    $.ajax({
        url: '/api/collections',
        method: 'POST',
        data: { name },
        success: function(collection) {
            const $list = $modal.find('.collections-list');
            $list.append(`
                <div class="collection-item" data-id="${collection.id}">
                    <button class="btn btn-outline-primary w-100 mb-2 add-to-collection">
                        ${collection.name}
                    </button>
                </div>
            `);
            $input.val('');
        }
    });
});

$(document).on('click', '.add-to-collection', function() {
    const collectionId = $(this).parent().data('id');
    const recipeId = $(this).closest('.modal').attr('id').split('-')[1];
    
    $.ajax({
        url: `/api/collections/${collectionId}/recipes`,
        method: 'POST',
        data: { recipeId },
        success: function() {
            showAlert('Recipe added to collection', 'success');
            $(`#collectionsModal-${recipeId}`).modal('hide');
        }
    });
});

$(document).on('click', '.remove-from-collection', async function() {
    const collectionId = $(this).closest('.collection-item').data('id');
    const recipeId = $(this).closest('.modal').attr('id').split('-')[1];
    
    try {
        await $.ajax({
            url: `/api/collections/${collectionId}/recipes/${recipeId}`,
            method: 'DELETE'
        });
        showAlert('Recipe removed from collection', 'success');
        $(this).closest('.modal').modal('hide');
    } catch (error) {
        console.error("Error removing from collection:", error);
        showAlert("Error removing from collection", "danger");
    }
});

$(document).on('click', '.add-collection', function() {
    $('#addCollectionModal').modal('show');
});

$(document).on('click', '#createCollectionBtn', function() {
    const name = $('#collectionName').val().trim();
    
    if (!name) {
        showAlert('Please enter a collection name', 'warning');
        return;
    }
    
    $.ajax({
        url: '/api/collections',
        method: 'POST',
        data: { name },
        success: function(collection) {
            showAlert('Collection created successfully', 'success');
            $('#addCollectionModal').modal('hide');
            location.reload();
        },
        error: function(error) {
            showAlert('Error creating collection', 'danger');
        }
    });
});

$(document).on('click', '.edit-collection', function(e) {
    e.preventDefault();
    const $section = $(this).closest('.collection-section');
    const collectionId = $section.data('id');
    const currentName = $section.find('.collection-title').text().trim();
    
    showInputModal('Edit Collection Name', currentName, function(newName) {
        $.ajax({
            url: `/api/collections/${collectionId}`,
            method: 'PUT',
            data: { name: newName },
            success: function() {
                $section.find('.collection-title').text(newName);
                showAlert('Collection renamed successfully', 'success');
            },
            error: function() {
                showAlert('Error renaming collection', 'danger');
            }
        });
    });
});

$(document).on('click', '.delete-collection', function(e) {
    e.preventDefault();
    
    const $section = $(this).closest('.collection-section');
    const collectionId = $section.data('id');
    
    $.ajax({
        url: `/api/collections/${collectionId}`,
        method: 'DELETE',
        success: function() {
            $section.remove();
            showAlert('Collection deleted successfully', 'success');
            if ($('.collection-section').length === 0) {
                location.reload();
            }
        },
        error: function() {
            showAlert('Error deleting collection', 'danger');
        }
    });
});

$(document).on('click', '.remove-recipe', function(e) {
    e.preventDefault();
    const $button = $(this);
    const collectionId = $button.data('collection-id');
    const recipeId = $button.data('recipe-id');
    
    $.ajax({
        url: `/api/collections/${collectionId}/recipes/${recipeId}`,
        method: 'DELETE',
        success: function() {
            $button.closest('.recipe-card').fadeOut(400, function() {
                $(this).remove();
                
                const $container = $button.closest('.cardContainer');
                if ($container.find('.recipe-card').length === 0) {
                    $container.html('<p class="text-muted">No recipes in this collection</p>');
                }
            });
            showAlert('Recipe removed from collection', 'success');
        },
        error: function() {
            showAlert('Error removing recipe from collection', 'danger');
        }
    });
});
