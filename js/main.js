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

// Switch checkbox
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


// Activar por defecto Select personalizado
if($('.select-field')) {
    $('.select-field__selected').click(function() {
        $(this).parent().toggleClass('active') 
    })
    
    $('.select-field__item').click(function() {
        selectedVal = $(this).children().html();
    
        $(this).parent().prev().html(selectedVal)
        $(this).parent().parent().removeClass('active')
    })
}


// Select default modified
// $(document).ready(function() {
    if($('.select-default').length > 0) {
      $('.select-default').each(function() {
        var defaultVal = $(this).data('default'),
            selected = $(this).children('.select-default__selected');
        
        selected.html(defaultVal)
      })
    }
  
//     $('.select-default').click(function() {
//       var defaultVal = $(this).data('default'),
//           actualVal =$(this).data('value'),
//           isActive = ($(this).hasClass('active')) ? true : false,
//           selected = $(this).children('.select-default__selected');
  
//       if(isActive) {
//         if(actualVal == "") {
//           selected.html(defaultVal)
//         } else {
//           selected.html(actualVal)
//         }
//       } else {
//         selected.html(defaultVal)
//       }
  
//       $(this).toggleClass('active')
//     })
  
//     $('.select-default__item').click(function() {
//       var actualVal = $(this).html(),
//           thisParent = $(this).parent().parent();
  
//       thisParent.data('value', actualVal)
//     })
//   })

// Select updated
$('.select-default').click(function(e) {
    var selectDefault = $(this),
        defaultValue = selectDefault.data('default'),
        selected = selectDefault.find($('.select-default__selected'));

    if(selectDefault.hasClass('active')) {
        var elementClicked = $(e.target),
            inputHidden = selectDefault.find($('.select__hidden'));

            if(elementClicked.hasClass('select-default__item')) {
                var newValue = elementClicked.html();
                selected.html(newValue);
                inputHidden.val(newValue);
                selectDefault.removeClass('active');
            }

            // Cerrar si se hace click en selected
            if(elementClicked.hasClass('select-default__selected')) {
                selectDefault.removeClass('active');
                if(!inputHidden.val()) {
                    selected.html(defaultValue);
                } else {
                    selected.html(inputHidden.val());
                }
            }

    } else {
        selected.html(defaultValue);
        selectDefault.addClass('active');
    }

})

// Cerrar select desplegado si se hace click afuera
clickCount = 0;
$(document).click(function(e) {

    if(clickCount == 1) {
        $('.select-default.active').removeClass('active')
        clickCount = 0;
    }

    if($('.select-default.active').length > 0) {
        clickCount++;
    }
})