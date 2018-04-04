/* Animate input icon on focus and blur */
$('.login-field__input').focus(function() {
    $(this).prev().addClass('active')
    console.log($(this))
})

$('.login-field__input').blur(function() {
    $(this).prev().removeClass('active')
})

$('.login-field__input').on('keyup', function() {
    console.log($(this))

    if($(this).val() != '') {
        $(this).next().addClass('active')
    } else {
        $(this).next().removeClass('active')
    }
})

/* Animate when login */
$('#login-btn').click(function() {

    /* Login con Js */
    $('.login').addClass('waiting');
    $('.authent').addClass('active');

    setTimeout(function() { 
        $('.login').removeClass('waiting');
        $('.authent').removeClass('active');
        
        $('.login__title').html('Acceso Autorizado')
        $('.login__content').html('<p class="login__p">Bienvenido nuevamente, serás redireccionado en unos segundos...</p>')
    }, 2500)

    setTimeout(function() { // Redirecciona al dashboard
        window.location.replace("./");
    }, 3200)
    /* // */
    
    /* Login con Ajax */
    // $.ajax({
    //     method: '',
    //     url: '',
    //     data: '',
    //     beforeSend: function() {
    //         $('.login').removeClass('waiting');
    //         $('.authent').removeClass('active');
    //     },
    //     success: function(resp) {
    //         if(resp == 'verificado') { // Cambiar por la respuesta que se obtiene del servidor
    //             ('.login__title').html('Acceso Autorizado')
    //             $('.login__content').html('<p class="login__p">Bienvenido nuevamente, serás redireccionado en unos segundos...</p>')
                
    //             window.location.replace('./');
    //         } else {
    //             alert('Cuenta incorreta');
    //         }
            
    //     }
    // })
    /* // */
})

/* Show recover password form */
$('#recover-btn').click(function() {
    $('.login').addClass('waiting');
    $('.authent').addClass('active');

    setTimeout(function() {
        $('.login').removeClass('waiting');
        $('.authent').removeClass('active');

        $('#login-form').hide()
        $('.login__title').html('Recuperar contraseña')
        $('#recoverpw-form').show()
    }, 1000)
})

/* Hide recover password form and show login form */
$('#back-btn').click(function() {
    $('.login').addClass('waiting');
    $('.authent').addClass('active');

    setTimeout(function() {
        $('.login').removeClass('waiting');
        $('.authent').removeClass('active');

        $('#login-form').show()
        $('.login__title').html('Iniciar sesión')
        $('#recoverpw-form').hide()
    }, 1000)
})
