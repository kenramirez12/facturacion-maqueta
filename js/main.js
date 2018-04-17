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

// Agregar y quitar productos
// var newProductItem = 

// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<div class="select-default block" data-default="Seleccionar" data-value="">';
// newProductRow += '<div class="select-default__selected"></div>';
// newProductRow += '<input class="select__hidden" type="hidden"/>';
// newProductRow += '<div class="select-default__list">';
// newProductRow += '<div class="select-default__item">Kg</div>';
// newProductRow += '<div class="select-default__item">Mts</div>';
// newProductRow += '</div>';
// newProductRow += '</div>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<div class="select-default block" data-default="Seleccionar" data-value="">';
// newProductRow += '<div class="select-default__selected"></div>';
// newProductRow += '<input class="select__hidden" type="hidden"/>';
// newProductRow += '<div class="select-default__list">';
// newProductRow += '<div class="select-default__item">Tipo 1</div>';
// newProductRow += '<div class="select-default__item">Tipo 2</div>';
// newProductRow += '</div>';
// newProductRow += '</div>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td>';
// newProductRow += '<input class="field default block" type="text"/>';
// newProductRow += '</td>';
// newProductRow += '<td><a class="delete-product" href="#"><img class="delete-product__icon" src="./img/trash.svg" alt=""/></a></td>';
// newProductRow += '</tr>';

createNewProduct = function() {
    var newRow = document.createElement('tr');

    var newCol1 = document.createElement('td');
    var input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.classList.add('field', 'default', 'block');
    newCol1.appendChild(input1);
    
    var newCol2 = document.createElement('td');
    
    
    var newCol3 = document.createElement('td');
    var input3 = document.createElement('input');
    input3.setAttribute('type', 'text');
    input3.classList.add('field', 'default', 'block');
    newCol3.appendChild(input3);
    var newCol4 = document.createElement('td');
    var input4 = document.createElement('input');
    input4.setAttribute('type', 'text');
    input4.classList.add('field', 'default', 'block');
    newCol4.appendChild(input4);
    
    var newCol5 = document.createElement('td');

    var newCol6 = document.createElement('td');
    var input6 = document.createElement('input');
    input6.setAttribute('type', 'text');
    input6.classList.add('field', 'default', 'block');
    newCol6.appendChild(input6);
    var newCol7 = document.createElement('td');
    var input7 = document.createElement('input');
    input7.setAttribute('type', 'text');
    input7.classList.add('field', 'default', 'block');
    newCol7.appendChild(input7);
    var newCol8 = document.createElement('td');
    var input8 = document.createElement('input');
    input8.setAttribute('type', 'text');
    input8.classList.add('field', 'default', 'block');
    newCol8.appendChild(input8);

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

    return newRow;
}

$('.new-product-row').click(function() {
    $('.table > tbody:last-child').append(createNewProduct);
    
    $('.delete-product').click(function() {
        $(this).parent().parent().remove()
    })
})

$('.delete-product').click(function() {
    $(this).parent().parent().remove()
})