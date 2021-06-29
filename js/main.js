$(document).ready(function(){
    $('#section7 .alert').hide();
    $('form.needs-validation button').click(e => {
    const invalids = $('form.needs-validation :invalid');
    const alert = $('#section7 .alert');
    if (invalids.length === 0) {
        alert.removeClass('alert-warning').removeClass('alert-danger').addClass('alert-success');
        alert.find('span').first().text('Все поля заполнены');
    }
    else {
        let count = 0;
        invalids.each(i => {
            invalids[i].value !== '' && count++;
        });
        if (count == invalids.length && $('form.needs-validation').find('input[type="radio"]:checked').length != 0) {
            alert.removeClass('alert-warning').addClass('alert-danger').removeClass('alert-success');
            alert.find('span').first().text('Некорректные данные.');
        }
        else {
            alert.addClass('alert-warning').removeClass('alert-danger').removeClass('alert-success');
            alert.find('span').first().text('Не все поля заполнены!');
        }
    }
    alert.show();
    });

    $('form#search').submit(function (e) {
    e.preventDefault();
    $('div.modal-body').empty();

    let term = $('input[type="search"]')[0].value.trim();
    if (!term)
        return;

    const arr_p = $(`p:contains('${term}')`);

    const pattern = new RegExp('(' + term + ')', 'gi');
    if (!arr_p.length) {
        $('div.modal-body').append('<p>Ничего не найдено.</p>');
    }
    $.each(arr_p, (i, value) => {
        str = $(value).html();
        str = str.replace(pattern, '<mark rel=\'tooltip\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Результат поиска\'>$1</mark>');
        $('div.modal-body').append(`<p>${str}</p>`);
    })

    $(function () {
        $('[rel="tooltip"]').tooltip();
    });

    $('#modal').modal('show');
});

$('form.needs-validation').submit((e) => {
    if (e.target.checkValidity() === false) {
        e.stopPropagation();
    }
    e.preventDefault();
    $(e.target).addClass('was-validated');
});
});


