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


// Activar por defecto Select personalizado
// if($('.select-field')) {
//     $('.select-field__selected').click(function() {
//         $(this).parent().toggleClass('active') 
//     })
    
//     $('.select-field__item').click(function() {
//         selectedVal = $(this).children().html();
    
//         $(this).parent().prev().html(selectedVal)
//         $(this).parent().parent().removeClass('active')
//     })
// }


/** Select Definitivo */
const initSelect = function() {
    $('.select').each(function() {
        var defaultValue = $(this).data('default'),
            realValue = $(this).find($('.select__hidden')).val();
            selected = $(this).children('.select__selected');
        
        selected.html( (realValue == '') ? defaultValue : realValue )
    })
}

if($('.select').length > 0) {
    initSelect()
}

$(document).on('click', '.select', function(e) {
    var select = $(this),
        defaultValue = select.data('default'),
        selected = select.find($('.select__selected'));

    if(select.hasClass('active')) {        
        var elementClicked = $(e.target),
        inputHidden = select.find($('.select__hidden'));
        
        if(elementClicked.hasClass('select__item')) {
            var newValue = elementClicked.html();
            selected.html(newValue);
            inputHidden.val(newValue);
            select.removeClass('active');
        }
        
        // Cerrar si se hace click en selected
        if(elementClicked.hasClass('select__selected')) {
            select.removeClass('active');
            if(!inputHidden.val()) {
                selected.html(defaultValue);
            } else {
                selected.html(inputHidden.val());
            }
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

    var options = ['kg', 'mts'];
    for(option in options) {
        var selectOption = document.createElement('div');
        selectOption.classList.add('select__item', 'select-default__item');
        selectOption.innerHTML = options[option];

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

    var options = ['Tipo 1', 'Tipo 2'];
    for(option in options) {
        var selectOption = document.createElement('div');
        selectOption.classList.add('select__item', 'select-default__item');
        selectOption.innerHTML = options[option];

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
$('form').submit(function(e) {
    e.preventDefault();

    console.log($(this).serializeArray());
})