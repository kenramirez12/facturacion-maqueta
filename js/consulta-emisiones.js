$(document).ready(function() {

    $('#consulta-emisiones > tbody > tr > td').click(function() {
        popup.fadeIn('fast')
    });

    var tipoDocumentoArray = ['Nulo', 'Factura', 'Boleta', 'Nota de Crédito', 'Nota de Débito', 'Bajas']

    console.log(tipoDocumentoArray[0])

    var data = [
        {
           "fecha":"13/03/2018",
           "tipoDocumento":"1",
           "entidad":"GM CONTRATISTA",
           "monto":300.00,
           "estado":null,
           "sunat":null
        },
        {
           "fecha":"13/03/2018",
           "tipoDocumento":"1",
           "entidad":"GM CONTRATISTA",
           "monto":300.00,
           "estado":null,
           "sunat":null
        }
    ];

    // Resetear resultados antes de pintar los nuevos
    $('#consulta-emisiones > tbody').html('')
    
    // Pintar resultados
    $.each(data, function(i, item) {
        newItem = `
        <tr>
        <td>${item.fecha}</td>
        <td>${item.tipoDocumento}</td>
        <td>${tipoDocumentoArray[item.tipoDocumento]}</td>
        <td>${item.entidad}</td>
        <td>${item.monto}</td>
        <td>${item.estado}</td>
        <td>${item.sunat}</td>
        </tr>
        `
        $('#consulta-emisiones > tbody').append(newItem)
    });


    // $("select[name^='tipo-documento']").change(function () {
    //     let documentTypeVal = $(this).val();
    //     getDocumentJson();
    // });
    $('#consultar').click(function() {
        getDocumentJson()
    })

    function getDocumentJson() {
        var consultaEmisionesForm = $('#consultaEmisiones-frm');
        var ajaxUrl = consultaEmisionesForm.attr('action');

        // Obtener valores del formulario
        var tipoDocumento = $('input[name="tipo-documento"]').val(),
            //numeroDocumento = $('input[name="tipo-documento"]').val(),
            fechaDesde = $('input[name="fecha-desde"]').val(),
            fechaHasta = $('input[name="fecha-hasta"]').val();
            //nombreCliente = $('input[name="tipo-documento"]').val(),
            //estadoDocumento = $('input[name="tipo-documento"]').val(),
            //estadoSunat = $('input[name="tipo-documento"]').val(),
            //nroDocCliente = $('input[name="tipo-documento"]').val();

        // Elabora JSON
        var jsonData = new Object();
        jsonData.sunat_doc_type= tipoDocumento;
        jsonData.issue_date_begin= fechaDesde;
        jsonData.issue_date_end= fechaHasta;

        jsonData = JSON.stringify(jsonData);

        $.ajax({
            method: 'POST',
            dataType: 'json',
            // url: ajaxUrl,
            url: 'js/json_ejemplo.json',
            data: jsonData,
            contentType: "application/json",
            cache: false,
            timeout: 60000,
            beforeSend: function () {
                console.log("jsonData: " + jsonData);
                //cargando gif
                $('body').css('cursor', 'wait')
            },
            success: function (data) {
                //agregar efecto en la grilla, de cargado
                console.log("data: " + data);
                $('body').css('cursor', 'default')
            },
            error: function (e) {
                $('body').css('cursor', 'default')
                var response;
                if (e.status == "400") {
                    response = jQuery.parseJSON(e.responseText);
                    console.log("response-error: " +response);
                    $.each(response.errorMessages, function (key, value) {
                        //si key comienza con detailForm, debe obtener el key interno
                        //luego recorrer la grilla completa y setear segun indice
                        $('#' + key).addClass("error");
                        $('#error_' + key).text(value).show();
                    });
                } else if (e.status == "401") {
                    window.location.href = e.redirect;
                }
            }
        });

        return false;
    }
});