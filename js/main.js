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

clientMenuBtn = $('.client-bar__menu-btn');

clientMenuBtn.click(function() {
    toggleClientMenu()
})

const toggleClientMenu = function() {
    clientBarMenu = $('.client-bar__menu');

    if(clientBarMenu.hasClass('active')) {
        clientBarMenu.removeClass('active')
    } else {
        clientBarMenu.addClass('active')
    }
}

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
const initSelect = function() {
    $('.select').each(function() {
        var selectList = $(this).children('.select__list'),
            defaultValue = $(this).data('default'),
            realValue = $(this).find($('.select__hidden')).val();
            selected = $(this).children('.select__selected');
        
            if(realValue == '') {
                selected.html(defaultValue)
            } else {
                var realValueTag = '';
                selectList.children('.select__item').each(function() {
                    if( $(this).data('value') == realValue ) {
                        realValueTag = $(this).html();
                    }
                })
                selected.html(realValueTag)
            }
    })
}

if($('.select').length > 0) {
    initSelect()
}

$(document).on('click', '.select', function(e) {
    var select = $(this),
        selectList = $(this).children('.select__list'),
        defaultValue = select.data('default'),
        selected = select.find($('.select__selected')),
        elementClicked = $(e.target),
        inputHidden = select.find($('.select__hidden'));

    if(select.hasClass('active')) {        
        
        if(elementClicked.hasClass('select__item')) {
            var newValue = elementClicked.data('value'),
                newValueTag = elementClicked.html();

            selected.html(newValueTag);
            inputHidden.val(newValue);
            select.removeClass('active');
        }
        
        // Cerrar si se hace click en selected
        if(elementClicked.hasClass('select__selected')) {
            if(inputHidden.val() == '') {
                selected.html(defaultValue);
                inputHidden.val('');
                
            } else {
                var realValueTag = '';
                selectList.children('.select__item').each(function() {
                    if( $(this).data('value') == inputHidden.val() ) {
                        realValueTag = $(this).html();
                    }
                })
                selected.html(realValueTag);
            }
            select.removeClass('active');
        }
        
    } else {
        selected.html(defaultValue);
        select.addClass('active');
    }
})

// Cerrar select desplegado si se hace click afuera
clickCount = 0;
$(document).click(function(e) {

    if(clickCount == 1) {
        $('.select.active').removeClass('active')
        clickCount = 0;
    }

    if($('.select.active').length > 0) {
        clickCount++;
    }
})

// var tableRows = $('.table tr:last').index() + 1;
var tableRows = 3;

createNewProduct = function() {
    // 1
    var newRow = document.createElement('tr');

    var newCol1 = document.createElement('td');
    var input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'producto-' + (tableRows + 1));
    input1.classList.add('field', 'default', 'block');
    newCol1.appendChild(input1);
    
    // 2
    var newCol2 = document.createElement('td');
    var select2 = document.createElement('div');
    select2.setAttribute('data-default', 'Seleccionar')
    select2.classList.add('select', 'select-default', 'block');

    var select2Selected = document.createElement('div');
    select2Selected.classList.add('select__selected', 'select-default__selected');

    var select2Input = document.createElement('input');
    select2Input.setAttribute('type', 'hidden');
    select2Input.setAttribute('name', 'unid-medida-' + (tableRows + 1));
    select2Input.classList.add('select__hidden');

    var select2List = document.createElement('div');
    select2List.classList.add('select__list', 'select-default__list');

    var options = [
        {
            'optionTag' : 'Kgs',
            'optionValue' : 1,
        },
        {
            'optionTag' : 'Mts',
            'optionValue' : 2,
        }
    ];
    for(option in options) {
        var selectOption = document.createElement('div');
        selectOption.classList.add('select__item', 'select-default__item');
        selectOption.setAttribute('data-value', options[option].optionValue);
        selectOption.innerHTML = options[option].optionTag;

        select2List.appendChild(selectOption);
    }

    select2.appendChild(select2Selected);
    select2.appendChild(select2Input);
    select2.appendChild(select2List);
    newCol2.appendChild(select2);
    
    // 3
    var newCol3 = document.createElement('td');
    var input3 = document.createElement('input');
    input3.setAttribute('type', 'text');
    input3.setAttribute('name', 'descripcion-' + (tableRows + 1));
    input3.classList.add('field', 'default', 'block');
    newCol3.appendChild(input3);

    // 4
    var newCol4 = document.createElement('td');
    var input4 = document.createElement('input');
    input4.setAttribute('type', 'text');
    input4.setAttribute('name', 'cod-' + (tableRows + 1));
    input4.classList.add('field', 'default', 'block');
    newCol4.appendChild(input4);
    
    // 5
    var newCol5 = document.createElement('td');
    var select5 = document.createElement('div');
    select5.setAttribute('data-default', 'Seleccionar')
    select5.classList.add('select', 'select-default', 'block');

    var select5Selected = document.createElement('div');
    select5Selected.classList.add('select__selected', 'select-default__selected');

    var select5Input = document.createElement('input');
    select5Input.setAttribute('type', 'hidden');
    select5Input.setAttribute('name', 'tipo-igv-' + (tableRows + 1));
    select5Input.classList.add('select__hidden');

    var select5List = document.createElement('div');
    select5List.classList.add('select__list', 'select-default__list');

    var options = [
        {
            'optionTag' : 'Tipo 1',
            'optionValue' : 1,
        },
        {
            'optionTag' : 'Tipo 2',
            'optionValue' : 2,
        }
    ];
    for(option in options) {
        var selectOption = document.createElement('div');
        selectOption.classList.add('select__item', 'select-default__item');
        selectOption.setAttribute('data-value', options[option].optionValue);
        selectOption.innerHTML = options[option].optionTag;

        select5List.appendChild(selectOption);
    }

    select5.appendChild(select5Selected);
    select5.appendChild(select5Input);
    select5.appendChild(select5List);
    newCol5.appendChild(select5);

    // 6
    var newCol6 = document.createElement('td');
    var input6 = document.createElement('input');
    input6.setAttribute('type', 'text');
    input6.setAttribute('name', 'valor-unit-' + (tableRows + 1));
    input6.classList.add('field', 'default', 'block');
    newCol6.appendChild(input6);

    // 7
    var newCol7 = document.createElement('td');
    var input7 = document.createElement('input');
    input7.setAttribute('type', 'text');
    input7.setAttribute('name', 'igv-' + (tableRows + 1));
    input7.classList.add('field', 'default', 'block');
    newCol7.appendChild(input7);

    // 8
    var newCol8 = document.createElement('td');
    var input8 = document.createElement('input');
    input8.setAttribute('type', 'text');
    input8.setAttribute('name', 'total-' + (tableRows + 1));
    input8.classList.add('field', 'default', 'block');
    newCol8.appendChild(input8);

    // 9
    var newCol9 = document.createElement('td');
    var deleteAnchor = document.createElement('a');
    deleteAnchor.setAttribute('href', '#');
    deleteAnchor.classList.add('delete-product');
    var deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', './img/trash.svg');
    deleteIcon.classList.add('delete-product__icon');
    deleteAnchor.appendChild(deleteIcon);
    newCol9.appendChild(deleteAnchor);

    newRow.appendChild(newCol1);
    newRow.appendChild(newCol2);
    newRow.appendChild(newCol3);
    newRow.appendChild(newCol4);
    newRow.appendChild(newCol5);
    newRow.appendChild(newCol6);
    newRow.appendChild(newCol7);
    newRow.appendChild(newCol8);
    newRow.appendChild(newCol9);

    tableRows++;
    return newRow;
}

$('.new-product-row').click(function() {
    // Agregar nueva columna de producto
    $('.table > tbody:last-child').append(createNewProduct);

    // Iniciar selects de nueva columna
    initSelect();
})

$(document).on('click', '.delete-product', function() {
    $(this).parent().parent().remove()
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
