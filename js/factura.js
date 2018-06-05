$(document).ready(function() {
    /* Validar RUC */
    const   inputRUC = document.getElementsByName('numero-documento')[0],
        razonSocial = document.getElementsByName('razon-social')[0],
        spinner = document.getElementsByClassName('spinner')[0],
        maxLength = 11

    inputRUC.addEventListener('keyup', function() {
        if(inputRUC.value.length == maxLength) {

            inputRUC.disabled = "disabled"
            spinner.style.display = "block"

            rucRequested = inputRUC.value
            url = 'https://www.api.sunat.recave.pe/v1/ruc/' + rucRequested
            datosEmpresa = {}

            $.getJSON(url, datosEmpresa, function(response){

                if(response['error']) {
                    inputRUC.disabled = ""
                    if (inputRUC.classList.contains('success')) inputRUC.classList.remove('success')
                    inputRUC.classList.add("error")
                    spinner.style.display = "none"
                } else {
                    inputRUC.disabled = ""
                    if (inputRUC.classList.contains('error')) inputRUC.classList.remove('error')
                    inputRUC.classList.add("success")
                    spinner.style.display = "none"

                    $("input[name='razon-social']").val(response['razon_social'])
                    $("input[name='direccion']").val(response['direccion'])
                }
            })

        } else {
            if(razonSocial.value != '') razonSocial.value = ''
            if(inputRUC.classList.contains('success')) inputRUC.classList.remove('success')
        }
    })


    /* Cálculos según IGV */
    function calcularValores(cantidad, valorUnit, tipoIgv, campoIgv, campoTotal) {

        valorIgv = 0 // Valor inicial de IGV
        valorUnitTotal = valorUnit * cantidad
        if(tipoIgv == 10) valorIgv = valorUnitTotal * 0.18 // Calcular IGV 
        valorTotal = valorUnitTotal + valorIgv

        // Setear valores
        campoIgv.value = valorIgv
        campoTotal.value = valorTotal
    }


    $("input[name^='cantidad-']").keyup(function(e) {
        cantidad = parseInt(this.value)
        valorUnit = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value
        tipoIgv = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value
        campoIgv = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0]
        campoTotal = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0]
        
        calcularValores(cantidad, valorUnit, tipoIgv, campoIgv, campoTotal)
    })

    $("input[name^='valor-unit-']").keyup(function(e) {
        cantidad = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].value
        valorUnit = parseInt(this.value)
        tipoIgv = this.parentElement.previousElementSibling.children[0].value
        campoIgv = this.parentElement.nextElementSibling.children[0]
        campoTotal = this.parentElement.nextElementSibling.nextElementSibling.children[0]
        
        calcularValores(cantidad, valorUnit, tipoIgv, campoIgv, campoTotal)

    })

    $("select[name^='tipo-igv-']").change(function() {
        cantidad = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].value
        valorUnit = parseInt(this.parentElement.nextElementSibling.children[0].value)
        tipoIgv = this.value
        campoIgv = this.parentElement.nextElementSibling.nextElementSibling.children[0]
        campoTotal = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0]

        calcularValores(cantidad, valorUnit, tipoIgv, campoIgv, campoTotal)

    })


    /* Crear nueva columna de Producto */
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
                    <input class="field default block" type="text" name="cantidad-${rowId}" value="1">
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

        tableRows++;
        return newRow;
    }

    $('.new-product-row').click(function() { // Agregar nueva columna de producto al DOM
        $('#products-table > tbody:last-child').append(createNewProduct);
    })

    $(document).on('click', '.delete-product', function(e) {
        e.preventDefault();
        if(confirm('Seguro que deseas eliminar esta fila?')) {
            $(this).parent().parent().remove()
        }
    })

    /** Form Submit */
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
            var servicio = $(this).children('td').eq(0).children().val(),
                unidMedida = $(this).children('td').eq(1).children().val(),
                cantidad = $(this).children('td').eq(2).children().val(),
                descripcion = $(this).children('td').eq(3).children().val(),
                cod = $(this).children('td').eq(4).children().val(),
                tipoIgv = $(this).children('td').eq(5).children().val(),
                valorUnit = $(this).children('td').eq(6).children().val(),
                igv = $(this).children('td').eq(7).children().val(),
                total = $(this).children('td').eq(8).children().val(),

            newInvoice = {
                'order': invoiceDetailsCount,
                'servicio' : servicio,
                'unid-medida': unidMedida,
                'cantidad': cantidad,
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
            // serie = $('input[name="serie"]').val(),
            fechaVencimiento = $('input[name="fecha-vencimiento"]').val(),
            fechaEmision = $('input[name="fecha-emision"]').val(),
            tipoMoneda = $('select[name="tipo-moneda"]').val(),
            tipoFactura = $('select[name="tipo-factura"]').val(),
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
        // data1.serie = serie;
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

    /* Elaborar vista previa */

    // recorrer productos
    $('.table.products tbody tr').each(function() {
        // En proceso...
    })

    // Insertar datos en Pop Up
    $('.preview').click(function() {

        // Obtener Data
            // Información del usuario
            razonSocialLocalValue = $('input[name=razon-social-local]').val()
            ruclocalValue = $('input[name=ruc-local]').val()
            direccionLocalValue= $('input[name=direccion-local]').val()
    
            // Información del cliente
            rucValue = $('input[name=numero-documento]').val()
            razonSocialValue = $('input[name=razon-social]').val()
            direccionValue = $('input[name=direccion]').val()
    
            // Datos de la Factura
            // serieValue = $('input[name=serie]').val()
            fechaEmisionValue = $('input[name=fecha-emision]').val()
            fechaVencimientoValue = $('input[name=fecha-vencimiento]').val()
            observacionValue = $('textarea[name=observacion]').val()        


        $('.razon-social-local-p').text(razonSocialLocalValue)
        $('.direccion-local-p').text(direccionLocalValue)
        $('.ruc-local-p').text(ruclocalValue)

        $('.ruc-p').text(rucValue)
        $('.razon-social-p').text(razonSocialValue)
        $('.direccion-p').text(direccionValue)

        $('.serie-p').html("###")
        $('.fecha-emision-p').html(fechaEmisionValue)
        $('.fecha-vencimiento-p').html(fechaVencimientoValue)
        $('textarea[name=observacion-p]').html(observacionValue)
    })

    obtenerProductos = function() {
        $('#products-table > tbody > tr').each(function() {
            cantidad = $(this).children('td').eq(2).children().val()
            uMedida = $(this).children('td').eq(1).children().val()
            descripcion = $(this).children('td').eq(3).children().val()
            valorUnit = $(this).children('td').eq(6).children().val()
        })
    }

    $('#getProducts').click(function(e) {
        e.preventDefault
        obtenerProductos()
    })

    $('#primerboton, #segundoboton').click(function() {
        // e.preventDefault
        if($(this).is('#primerboton')) {
            console.log('ola')
        } else {
            console.log('chao')
        }
    })
})