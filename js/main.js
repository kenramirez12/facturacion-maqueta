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

/** Alerts */
$('.alert__close-btn').click(function() {
    $(this).parent().remove()
})

/** Copiar texto */
$('.to-clipboard').click(function(e) {
    temp = $('<input>')
    copiar = $(this).text()

    $('body').append(temp)
    temp.val(copiar).select()
    document.execCommand("copy")

    toast = $(`<div class="toast" style="top: ${e.pageY}px; left: ${e.pageX}px;">Copiado!</div>`)
    slideDuration = 200

    $('body').append(toast)
    toast.fadeIn('fast')
    setTimeout(function() {
        toast.fadeOut('fast')
    }, 500)

    temp.remove()
})

/** Show Client Menu */
const   clientMenuBtn = document.getElementById('clientMenuBtn'),
        clientMenu = document.querySelector('.client-bar__menu'),
        clientMenuFlag = 0

        showClientMenu = function() {
            clientMenu.classList.toggle('active')
        }

clientMenuBtn.addEventListener('click', function() {
    showClientMenu()

    if(clientMenuFlag == 1) {
        document.addEventListener('click', function() {
            if(clientMenu.classList.contains('active')) {
                clientMenu.classList.remove('active')
                clientMenuFlag = 0
            }
        })
    }

    clientMenuFlag = 1
})

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


const noConnAlert = function() {
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

/** Cálculos de tabla totales */
    // Gravado - Operación Onerosa , value 10
    // Gravado – Retiro por premio , value 11
    // Gravado – Retiro por donación , value 12
    // Gravado – Retiro  , value 13
    // Gravado – Retiro por publicidad , value 14
    // Gravado – Bonificaciones , value 15
    // Gravado – Retiro por entrega a trabajadores , value 16
    // Gravado – IVAP , value 17
    // Exonerado - Operación Onerosa , value 20
    // Exonerado – Transferencia Gratuita , value 21
    // Inafecto - Operación Onerosa , value 30
    // Inafecto – Retiro por Bonificación , value 31
    // Inafecto – Retiro , value 32
    // Inafecto – Retiro por Muestras Médicas , value 33
    // Inafecto - Retiro por Convenio Colectivo , value 34
    // Inafecto – Retiro por premio , value 35
    // Inafecto - Retiro por publicidad , value 36

    // % Descuento
    // Anticipo (-)
    // Exonerada 
    // Inafecta 
    // Gravada
    // IGV
    // Gratuita 36, 35, 34, 33, 
    // Otros cargos
    // Descuento total (-)
    // TOTAL