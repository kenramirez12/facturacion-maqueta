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
    e.preventDefault();

    if($('.toast').length == 0) {
        temp = $('<input class="temp">')
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
            $('.toast').remove()
            $('.temp').remove()
        }, 500)
    
    }

})

/** Show Client Menu */
const   clientMenuBtn = document.getElementById('clientMenuBtn'),
        clientMenu = document.querySelector('.client-bar__menu')

let clientMenuFlag = 0

    showClientMenu = function() {
        clientMenu.classList.add('active')
        clientMenuFlag = 1
        console.log(clientMenuFlag)
    }
    hideClientMenu = function() {
        clientMenu.classList.remove('active')
        clientMenuFlag = 0
        console.log(clientMenuFlag)
    }

    
    clientMenuBtn.addEventListener('click', function() {
        (clientMenu.classList.contains('active')) ? hideClientMenu() : showClientMenu()
    })
    
    document.body.addEventListener('click', function(e) {
        if(
            e.target.classList.contains('client-bar__name') || 
            e.target.classList.contains('client-bar__avatar') || 
            e.target.classList.contains('client-bar__info') || 
            e.target.classList.contains('client-bar__menu-btn')
        ) {
            // Se intentó desplegar el menú
        } else {
            if(clientMenuFlag == 1) hideClientMenu()
        }
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

/** Setear HOY como default value en Fecha de emisión */
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

$('input[name=fecha-emision]').val(new Date().toDateInputValue());
