$(function () {
    $('tbody tr').dblclick(function () {

        var tds = $(this).find('td');
        $('#sid').val($(tds[0]).text());
        $('#name').val($(tds[1]).text());
        $('#default').val($(tds[2]).text());
        $('#press').val($(tds[3]).text());
        $('#flashing').val($(tds[4]).text());
        $('#mapWSIDth').val($(tds[5]).text());
        $('#mapHeight').val($(tds[6]).text());
        $('#hide').val($(tds[7]).text());

        $('#update').show();
        $('#add').hide();
        $('.modal').modal('show');
    });


    $('#update').click(function () {
        $.ajax({
            url: '/model/update',
            type: 'POST',
            data: {
                _id: $('#hide').val(),
                SID: $('#sid').val(),
                name: $('#name').val(),
                default: $('#default').val(),
                press: $('#press').val(),
                flashing: $('#flashing').val(),
                mapWSIDth: $('#mapWSIDth').val(),
                mapHeight: $('#mapHeight').val()
            },
            success: function () {
                $('.modal').modal('hide');
                window.location.reload();
            }
        });
    });


    $('#btnAdd').click(function () {

        $('#update').hide();
        $('#add').show();
        $('.modal').modal('show');


    });

    $('#add').click(function () {
        $.ajax({
            url: '/model/add',
            type: 'POST',
            data: {
                _id: $('#hide').val(),
                SID: $('#sid').val(),
                name: $('#name').val(),
                default: $('#default').val(),
                press: $('#press').val(),
                flashing: $('#flashing').val(),
                mapWSIDth: $('#mapWSIDth').val(),
                mapHeight: $('#mapHeight').val()
            },
            success: function () {
                $('.modal').modal('hide');
                window.location.reload();
            }
        });

    });

    $('#close').click(function () {
        $('.modal').modal('hide');
    })
})