/** Menu Toggle */
toggleMenuBtn = $('.main-header__menu-btn');
header = $('.main-header');
headerLogo = $('.main-header__logo');
menuOptions = $('.main-menu__span');

toggleMenuBtn.click(function() {
    toggleMenu(header, headerLogo, menuOptions);
})

const toggleMenu = function(header, logo, options) {
    if(header.hasClass('small')) {
        header.removeClass('small')
        logo.show("fast")
        options.each(function() {
            $(this).show("fast")
        })
    } else {
        header.addClass('small')
        logo.hide("fast")
        options.each(function() {
            $(this).hide("fast")
        })
    }
}

/** Show Client Menu */
const   clientMenuBtn = document.getElementById('clientMenuBtn'),
        clientMenu = document.querySelector('.client-bar__menu'),
        showClientMenu = () => clientMenu.classList.toggle('active')

clientMenuBtn.addEventListener('click', showClientMenu)

/** Input Description alt */
$('.field-description').on('keyup', function() {
    val = $(this).val();
    $(this).attr('title', val)
})

/** Switch buttons */
$('.switch').click(function(e) {
    e.preventDefault();

    var checkbox = $('.switch__checkbox');
    var checkbox = $(this).find(checkbox);
    var slider = $('.slider');
    var slider = $(this).find(slider);

    if(checkbox.attr('checked') == null) {
        checkbox.attr('checked', true);
        slider.addClass('active');
    } else {
        checkbox.attr('checked', false);
        slider.removeClass('active');
    }
})


/** Select Definitivo */
// const initSelect = function() {
//     $('.select').each(function() {
//         var selectList = $(this).children('.select__list'),
//             defaultValue = $(this).data('default'),
//             realValue = $(this).find($('.select__hidden')).val();
//             selected = $(this).children('.select__selected');
        
//             if(realValue == '') {
//                 selected.html(defaultValue)
//             } else {
//                 var realValueTag = '';
//                 selectList.children('.select__item').each(function() {
//                     if( $(this).data('value') == realValue ) {
//                         realValueTag = $(this).html();
//                     }
//                 })
//                 selected.html(realValueTag)
//             }
//     })
// }

// if($('.select').length > 0) {
//     initSelect()
// }

// $(document).on('click', '.select', function(e) {
//     var select = $(this),
//         selectList = $(this).children('.select__list'),
//         defaultValue = select.data('default'),
//         selected = select.find($('.select__selected')),
//         elementClicked = $(e.target),
//         inputHidden = select.find($('.select__hidden'));

//     if(select.hasClass('active')) {        
        
//         if(elementClicked.hasClass('select__item')) {
//             var newValue = elementClicked.data('value'),
//                 newValueTag = elementClicked.html();

//             selected.html(newValueTag);
//             inputHidden.val(newValue);
//             select.removeClass('active');
//         }
        
//         // Cerrar si se hace click en selected
//         if(elementClicked.hasClass('select__selected')) {
//             if(inputHidden.val() == '') {
//                 selected.html(defaultValue);
//                 inputHidden.val('');
                
//             } else {
//                 var realValueTag = '';
//                 selectList.children('.select__item').each(function() {
//                     if( $(this).data('value') == inputHidden.val() ) {
//                         realValueTag = $(this).html();
//                     }
//                 })
//                 selected.html(realValueTag);
//             }
//             select.removeClass('active');
//         }
        
//     } else {
//         selected.html(defaultValue);
//         select.addClass('active');
//     }
// })

// // Cerrar select desplegado si se hace click afuera
// clickCount = 0;
// $(document).click(function(e) {

//     if(clickCount == 1) {
//         $('.select.active').removeClass('active')
//         clickCount = 0;
//     }

//     if($('.select.active').length > 0) {
//         clickCount++;
//     }
// })

// var tableRows = $('.table tr:last').index() + 1;
var tableRows = 3;

createNewProduct = function() {
    let rowId = tableRows + 1,
        newRow = `
        <tr>
            <td>
                <input class="field default block" type="text" name="servicio-${rowId}">
            </td>
            <td>
                <select class="native-select default" name="unid-medida-${rowId}">
                    <option value="" disabled="disabled" selected="selected">—</option>
                    <option value="1">Kg</option>
                    <option value="2">Mts</option>
                    <option value="3">UND</option>
                </select>
            </td>
            <td>
                <input class="field default block" type="text" name="cantidad-${rowId}">
            </td>
            <td>
            <input class="field-description field default block" type="text" name="description-${rowId}">
            </td>
            <td>
                <input class="field default block" type="text" name="cod-${rowId}">
            </td>
            <td>
            <select class="native-select default" name="tipo-igv-${rowId}">
                <option value="" disabled="disabled" selected="selected">Seleccionar</option>
                <option value="10">Gravado - Operación Onerosa</option>
                <option value="11">Gravado – Retiro por premio</option>
                <option value="12">Gravado – Retiro por donación</option>
                <option value="13">Gravado – Retiro </option>
                <option value="14">Gravado – Retiro por publicidad</option>
                <option value="15">Gravado – Bonificaciones</option>
                <option value="16">Gravado – Retiro por entrega a trabajadores</option>
                <option value="17">Gravado – IVAP</option>
                <option value="20">Exonerado - Operación Onerosa</option>
                <option value="21">Exonerado – Transferencia Gratuita</option>
                <option value="30">Inafecto - Operación Onerosa</option>
                <option value="31">Inafecto – Retiro por Bonificación</option>
                <option value="32">Inafecto – Retiro</option>
                <option value="33">Inafecto – Retiro por Muestras Médicas</option>
                <option value="34">Inafecto - Retiro por Convenio Colectivo</option>
                <option value="35">Inafecto – Retiro por premio</option>
                <option value="36">Inafecto - Retiro por publicidad</option>
                <option value="36">Exportación</option>
            </select>
            </td>
            <td>
                <input class="field default block" type="text" name="valor-unit-${rowId}">
            </td>
            <td>
                <input class="field default block" type="text" name="igv-${rowId}" disabled>
            </td>
            <td>
                <input class="field default block" type="text" name="total-${rowId}" disabled>
            </td>
            <td>
                <a class="delete-product" href="#"><img class="delete-product__icon" src="./img/trash.svg" alt=""></a>
            </td>
        </tr>
        `;
    // // 1
    // var newRow = document.createElement('tr');

    // var newCol1 = document.createElement('td');
    // var input1 = document.createElement('input');
    // input1.setAttribute('type', 'text');
    // input1.setAttribute('name', 'producto-' + (tableRows + 1));
    // input1.classList.add('field', 'default', 'block');
    // newCol1.appendChild(input1);
    
    // // 2
    // var newCol2 = document.createElement('td');
    // var select2 = document.createElement('div');
    // select2.setAttribute('data-default', 'Selec')
    // select2.classList.add('select', 'select-default', 'select-default--small', 'block');

    // var select2Selected = document.createElement('div');
    // select2Selected.classList.add('select__selected', 'select-default__selected');

    // var select2Input = document.createElement('input');
    // select2Input.setAttribute('type', 'hidden');
    // select2Input.setAttribute('name', 'unid-medida-' + (tableRows + 1));
    // select2Input.classList.add('select__hidden');

    // var select2List = document.createElement('div');
    // select2List.classList.add('select__list', 'select-default__list');

    // var options = [
    //     {
    //         'optionTag' : 'Kgs',
    //         'optionValue' : 1,
    //     },
    //     {
    //         'optionTag' : 'Mts',
    //         'optionValue' : 2,
    //     }
    // ];
    // for(option in options) {
    //     var selectOption = document.createElement('div');
    //     selectOption.classList.add('select__item', 'select-default__item');
    //     selectOption.setAttribute('data-value', options[option].optionValue);
    //     selectOption.innerHTML = options[option].optionTag;

    //     select2List.appendChild(selectOption);
    // }

    // select2.appendChild(select2Selected);
    // select2.appendChild(select2Input);
    // select2.appendChild(select2List);
    // newCol2.appendChild(select2);
    
    // // 3
    // var newCol3 = document.createElement('td');
    // var input3 = document.createElement('input');
    // input3.setAttribute('type', 'text');
    // input3.setAttribute('name', 'descripcion-' + (tableRows + 1));
    // input3.classList.add('field', 'default', 'block');
    // newCol3.appendChild(input3);

    // // 4
    // var newCol4 = document.createElement('td');
    // var input4 = document.createElement('input');
    // input4.setAttribute('type', 'text');
    // input4.setAttribute('name', 'cod-' + (tableRows + 1));
    // input4.classList.add('field', 'default', 'block');
    // newCol4.appendChild(input4);
    
    // // 5
    // var newCol5 = document.createElement('td');
    // var select5 = document.createElement('div');
    // select5.setAttribute('data-default', 'Seleccionar')
    // select5.classList.add('select', 'select-default', 'block');

    // var select5Selected = document.createElement('div');
    // select5Selected.classList.add('select__selected', 'select-default__selected');

    // var select5Input = document.createElement('input');
    // select5Input.setAttribute('type', 'hidden');
    // select5Input.setAttribute('name', 'tipo-igv-' + (tableRows + 1));
    // select5Input.classList.add('select__hidden');

    // var select5List = document.createElement('div');
    // select5List.classList.add('select__list', 'select-default__list');

    // var options = [
    //     {
    //         "optionTag" : "Gravado - Operación Onerosa",
    //         "optionValue" : "10"
    //     },
    //     {
    //         "optionTag" : "Gravado – Retiro por premio",
    //         "optionValue" : "11"
    //     },
    //     {
    //         "optionTag" : "Gravado – Retiro por donación",
    //         "optionValue" : "12"
    //     },
    //     {
    //         "optionTag" : "Gravado – Retiro ",
    //         "optionValue" : "13"
    //     },
    //     {
    //         "optionTag" : "Gravado – Retiro por publicidad",
    //         "optionValue" : "14"
    //     },
    //     {
    //         "optionTag" : "Gravado – Bonificaciones",
    //         "optionValue" : "15"
    //     },
    //     {
    //         "optionTag" : "Gravado – Retiro por entrega a trabajadores",
    //         "optionValue" : "16"
    //     },
    //     {
    //         "optionTag" : "Gravado – IVAP",
    //         "optionValue" : "17"
    //     },
    //     {
    //         "optionTag" : "Exonerado - Operación Onerosa",
    //         "optionValue" : "20"
    //     },
    //     {
    //         "optionTag" : "Exonerado – Transferencia Gratuita",
    //         "optionValue" : "21"
    //     },
    //     {
    //         "optionTag" : "Inafecto - Operación Onerosa",
    //         "optionValue" : "30"
    //     },
    //     {
    //         "optionTag" : "Inafecto – Retiro por Bonificación",
    //         "optionValue" : "31"
    //     },
    //     {
    //         "optionTag" : "Inafecto – Retiro",
    //         "optionValue" : "32"
    //     },
    //     {
    //         "optionTag" : "Inafecto – Retiro por Muestras Médicas",
    //         "optionValue" : "33"
    //     },
    //     {
    //         "optionTag" : "Inafecto - Retiro por Convenio Colectivo",
    //         "optionValue" : "34"
    //     },
    //     {
    //         "optionTag" : "Inafecto – Retiro por premio",
    //         "optionValue" : "35"
    //     },
    //     {
    //         "optionTag" : "Inafecto - Retiro por publicidad",
    //         "optionValue" : "36"
    //     },
    //     {
    //         "optionTag" : "Exportación",
    //         "optionValue" : "36"
    //     },
    // ];
    // for(option in options) {
    //     var selectOption = document.createElement('div');
    //     selectOption.classList.add('select__item', 'select-default__item');
    //     selectOption.setAttribute('data-value', options[option].optionValue);
    //     selectOption.innerHTML = options[option].optionTag;

    //     select5List.appendChild(selectOption);
    // }

    // select5.appendChild(select5Selected);
    // select5.appendChild(select5Input);
    // select5.appendChild(select5List);
    // newCol5.appendChild(select5);

    // // 6
    // var newCol6 = document.createElement('td');
    // var input6 = document.createElement('input');
    // input6.setAttribute('type', 'text');
    // input6.setAttribute('name', 'valor-unit-' + (tableRows + 1));
    // input6.classList.add('field', 'default', 'block');
    // newCol6.appendChild(input6);

    // // 7
    // var newCol7 = document.createElement('td');
    // var input7 = document.createElement('input');
    // input7.setAttribute('type', 'text');
    // input7.setAttribute('name', 'igv-' + (tableRows + 1));
    // input7.classList.add('field', 'default', 'block');
    // newCol7.appendChild(input7);

    // // 8
    // var newCol8 = document.createElement('td');
    // var input8 = document.createElement('input');
    // input8.setAttribute('type', 'text');
    // input8.setAttribute('name', 'total-' + (tableRows + 1));
    // input8.classList.add('field', 'default', 'block');
    // newCol8.appendChild(input8);

    // // 9
    // var newCol9 = document.createElement('td');
    // var deleteAnchor = document.createElement('a');
    // deleteAnchor.setAttribute('href', '#');
    // deleteAnchor.classList.add('delete-product');
    // var deleteIcon = document.createElement('img');
    // deleteIcon.setAttribute('src', './img/trash.svg');
    // deleteIcon.classList.add('delete-product__icon');
    // deleteAnchor.appendChild(deleteIcon);
    // newCol9.appendChild(deleteAnchor);

    // newRow.appendChild(newCol1);
    // newRow.appendChild(newCol2);
    // newRow.appendChild(newCol3);
    // newRow.appendChild(newCol4);
    // newRow.appendChild(newCol5);
    // newRow.appendChild(newCol6);
    // newRow.appendChild(newCol7);
    // newRow.appendChild(newCol8);
    // newRow.appendChild(newCol9);

    tableRows++;
    return newRow;
}

$('.new-product-row').click(function() {
    // Agregar nueva columna de producto
    $('.table > tbody:last-child').append(createNewProduct);

    // // Iniciar selects de nueva columna
    // initSelect();
})

$(document).on('click', '.delete-product', function(e) {
    e.preventDefault();
    if(confirm('Seguro que deseas eliminar esta fila?')) {
        $(this).parent().parent().remove()
    } else {
        //
    }
})

/** Form */
invoiceDetailsCount = 1;
invoiceDetails = [];

$('form').submit(function(e) {
    e.preventDefault();
    const invoiceForm = $(this);

    // Resetear variables cada vez que se haga submit
    invoiceDetailsCount = 1;
    invoiceDetails = [];

    // Elaborar array invoiceDetails
    $('.table > tbody > tr').each(function() {
        var servicio = $(this).children('td:nth-child(1)').children('input').val(),
            unidMedida = $(this).children('td:nth-child(2)').children('div').children('input').val(),
            descripcion = $(this).children('td:nth-child(3)').children('input').val(),
            cod = $(this).children('td:nth-child(4)').children('input').val(),
            tipoIgv = $(this).children('td:nth-child(5)').children('div').children('input').val(),
            valorUnit = $(this).children('td:nth-child(6)').children('input').val(),
            igv = $(this).children('td:nth-child(7)').children('input').val(),
            total = $(this).children('td:nth-child(8)').children('input').val(),

        newInvoice = {
            'order': invoiceDetailsCount,
            'servicio' : servicio,
            'unid-medida': unidMedida,
            'descripcion': descripcion,
            'cod': cod,
            'tipo-igv': tipoIgv,
            'valor-unit': valorUnit,
            'igv': igv,
            'total': total,
        }

        invoiceDetails.push(newInvoice);
        invoiceDetailsCount++;
    })

    // Obtener valores del formulario
    var numeroDocumento = $('input[name="numero-documento"]').val(),
        razonSocial = $('input[name="razon-social"]').val(),
        serie = $('input[name="serie"]').val(),
        fechaVencimiento = $('input[name="fecha-vencimiento"]').val(),
        fechaEmision = $('input[name="fecha-emision"]').val(),
        tipoMoneda = $('input[name="tipo-moneda"]').val(),
        tipoFactura = $('input[name="tipo-factura"]').val(),
        establecimientoEmisor = $('input[name="establecimiento-emisor"]').val(),
        pagadoSwitch = $('input[name="pagado"]'),
        pagado = pagadoSwitch.attr('checked') ? pagadoSwitch.val() : 0,
        detraccionSwitch = $('input[name="detraccion"]'),
        detraccion = detraccionSwitch.attr('checked') ? detraccionSwitch.val() : 0;
        observacion = $('textarea[name="observacion"]').val(),
        descuento = $('input[name="descuento"]').val(),
        anticipo = $('input[name="anticipo"]').val(),
        exonerada = $('input[name="exonerada"]').val(),
        inafecta = $('input[name="inafecta"]').val(),
        gravada = $('input[name="gravada"]').val(),
        igv = $('input[name="igv"]').val(),
        gratuita = $('input[name="gratuita"]').val(),
        otrosCargos = $('input[name="otros-cargos"]').val(),
        descuentoTotal = $('input[name="descuento-total"]').val(),
        total = $('input[name="total"]').val()


    // Elabora JSON
    var data1 = new Object();
    data1.numeroDocumento = numeroDocumento;
    data1.razonSocial = razonSocial;
    data1.serie = serie;
    data1.fechaVencimiento = fechaVencimiento;
    data1.fechaEmision = fechaEmision;
    data1.tipoMoneda = tipoMoneda;
    data1.tipoFactura = tipoFactura;
    data1.establecimientoEmisor = establecimientoEmisor;
    data1.pagado = pagado;
    data1.detraccion = detraccion;
    data1.invoiceDetails = invoiceDetails;
    data1.observacion = observacion;
    data1.descuento = descuento;
    data1.anticipo = anticipo;
    data1.exonerada = exonerada;
    data1.inafecta = inafecta;
    data1.gravada = gravada;
    data1.igv = igv;
    data1.gratuita = gratuita;
    data1.otrosCargos = otrosCargos;
    data1.descuentoTotal = descuentoTotal;
    data1.total = total;

    data1 = JSON.stringify(data1);

    $.ajax({
        method: 'POST',
        dataType : 'json',
        url: invoiceForm.attr('action'),
        data: data1,
        beforeSend: function () {
            console.log("data1: "+data1);
        },
        success: function (data) {
            alert("data.status : "+ data);
        }
    }); 
});

const noConnAlert = () => {
    var alert = `<div class="client-bar__response">
        <p class="client-bar__response-p">No se ha detectado conexión a internet. El Software intentará volver a conectarse y envíar tus emisiones automaticante cuando detecte una conexión a internet, se recomienda llenar los campos de forma manual.</p>
        <a class="client-bar__response-btn" href="#"><img src="./img/close-response.png"></a>
    </div>`;
    
    $('.client-bar__info').before(alert);
    close = $('.client-bar__response-btn').click(function(e) {
        e.preventDefault();
        $('.client-bar__response').remove();
    })
}

$(window).ready(function() {
    noConnAlert();
})

/* Validate RUC */
const   inputRUC = document.getElementsByName('numero-documento')[0],
        spinner = document.getElementsByClassName('spinner')[0],
        maxLength = 11

inputRUC.addEventListener('keyup', () => {
    if(inputRUC.value.length == maxLength) {

        inputRUC.disabled = "disabled"
        spinner.style.display = "block"
        
        setTimeout(() => {
            inputRUC.disabled = ""
            inputRUC.classList.add("success")
            spinner.style.display = "none"
        }, 1000)
    } else {
        if(inputRUC.classList.contains('success')) inputRUC.classList.remove('success')
    }
})

/* Pop up*/
const popup = $('.popup');
$('.preview').click((e) => {
    e.preventDefault()
    popup.fadeIn('fast')
})

const closePopup = p => p.fadeOut('fast')

$(document).keyup((e) => {
    if(e.keyCode == 27) closePopup(popup)
})

$(document).click((e) => {
    if(popup.is(':visible')) {
        if( $(e.target).hasClass('popup') ) closePopup(popup)
    }
})

    /* Popup autofill */
    const   fechaVencimiento = $('input[name=fecha-vencimiento]'),
            fechaEmision = $('input[name=fecha-emision]'),
            numeroDocumento = $('input[name=numero-documento]'),
            serie = $('input[name=serie]'),
            observacion = $('textarea[name=observacion]')

        // recorrer productos
        $('.table.products tbody tr').each(() => {
            // console.log($(this).find("td > input[name=^='servicio-']"))
            // console.log($(this).find("td:eq(0)"))
        })

    $('.preview').click(() => {
        $('.fecha-vencimiento-p').html(fechaVencimiento.val())
        $('.fecha-emision-p').html(fechaEmision.val())
        $('.ruc-p').html(numeroDocumento.val())
        $('.serie-p').html(serie.val())
        $('textarea[name=observacion-p]').html(observacion.val())
    })

/* Cálculos según IGV */
    function calcularValores(valorUnit, tipoIgv, campoIgv, campoTotal) {

        valorIgv = 0 // Valor inicial de IGV
        if(tipoIgv == 10) valorIgv = valorUnit * 0.18 // Calcular IGV 
        valorTotal = valorUnit + valorIgv // Calcular valor Total

        // Setear valores
        campoIgv.value = valorIgv
        campoTotal.value = valorTotal
    }

    $("input[name^='valor-unit-']").keyup(function(e) {
        tipoIgv = this.parentElement.previousElementSibling.children[0].value
        campoIgv = this.parentElement.nextElementSibling.children[0]
        campoTotal = this.parentElement.nextElementSibling.nextElementSibling.children[0]
        
        calcularValores(parseInt(this.value), tipoIgv, campoIgv, campoTotal)

    })

    $("select[name^='tipo-igv-']").change(function() {
        valorUnit = parseInt(this.parentElement.nextElementSibling.children[0].value)
        tipoIgv = this.value
        campoIgv = this.parentElement.nextElementSibling.nextElementSibling.children[0]
        campoTotial = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0]

        calcularValores(valorUnit, tipoIgv, campoIgv, campoTotal)

    })