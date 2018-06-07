$(document).ready(function() {
    const tipoDocumento = $('select[name=tipo-documento]'),
        serieCod = $('input[name=serie-cod]'),
        searchBtn = $('button[name=search]'),
        spinner = $('.spinner')

    tipoDocumento.change(function() {
        updateSerie(tipoDocumento.val())
        $('input[name=serie]').prop('disabled', false)
    })
    
    updateSerie = function(tipoDocumento) {
        (tipoDocumento == 1) ? serieCod.val('F001') : serieCod.val('B001')
    }

    $('input[name=serie]').on('keyup', function() { // Activar botón Buscar

        if($(this).val() != '' && searchBtn.is(':disabled')) searchBtn.prop('disabled', false)
        if($(this).val() == '') searchBtn.prop('disabled', true)
    })

    searchBtn.on('click', function() { // Validar serie
        spinner.show()

        setTimeout(function() {
            spinner.hide()
            searchBtn.html('Visualizar')
            $('input[name=serie]').addClass('success')
        }, 2000)
    })
})