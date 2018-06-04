$(document).ready(function() {
    const tipoNota = $('select[name=tipo-nota]'),
        serieCod = $('input[name=serie-cod]')

    tipoNota.change(function() {
        updateSerie(tipoNota.val())
    })
    
    updateSerie = function(tipoNota) {
        (tipoNota == 1) ? serieCod.val('F001') : serieCod.val('B001')
    }
})