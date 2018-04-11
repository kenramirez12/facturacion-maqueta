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
$(document).ready(function() {
    if($('.select-default').length > 0) {
      $('.select-default').each(function() {
        var defaultVal = $(this).data('default'),
            selected = $(this).children('.select-default__selected');
        
        selected.html(defaultVal)
      })
    }
  
    $('.select-default').click(function() {
      var defaultVal = $(this).data('default'),
          actualVal =$(this).data('value'),
          isActive = ($(this).hasClass('active')) ? true : false,
          selected = $(this).children('.select-default__selected');
  
      if(isActive) {
        if(actualVal == "") {
          selected.html(defaultVal)
        } else {
          selected.html(actualVal)
        }
      } else {
        selected.html(defaultVal)
      }
  
      $(this).toggleClass('active')
      console.log('oli')
    })
  
    $('.select-default__item').click(function() {
      var actualVal = $(this).html(),
          thisParent = $(this).parent().parent();
  
      thisParent.data('value', actualVal)
    })
  })