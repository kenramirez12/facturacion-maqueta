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
            .fail(function() {
                inputRUC.disabled = ""
                if (inputRUC.classList.contains('success')) inputRUC.classList.remove('success')
                inputRUC.classList.add("error")
                spinner.style.display = "none"
            })

        } else {
            if(razonSocial.value != '') razonSocial.value = ''
            if(inputRUC.classList.contains('success')) inputRUC.classList.remove('success')
        }
    })

    calcularValores = function(that) {
        tr = $(that).parent().parent()
        cantidad = tr.children('td').eq(2).children().val()
        valorUnit = tr.children('td').eq(6).children().val()
        tipoIgv = tr.children('td').eq(5).children().val()
        campoIgv = tr.children('td').eq(7).children()
        campoTotal = tr.children('td').eq(8).children()

        valorIgv = 0 // Valor inicial de IGV
        valorUnitTotal = valorUnit * cantidad
        if(tipoIgv == 10) valorIgv = valorUnitTotal * 0.18 // Calcular IGV 
        valorTotal = valorUnitTotal + valorIgv

        // Setear valores
        campoIgv.val(valorIgv)
        campoTotal.val(valorTotal)
    }

    /* Cálculos según IGV */
    // function calcularValores(cantidad, valorUnit, tipoIgv, campoIgv, campoTotal) {
        
    //     valorIgv = 0 // Valor inicial de IGV
    //     valorUnitTotal = valorUnit * cantidad
    //     if(tipoIgv == 10) valorIgv = valorUnitTotal * 0.18 // Calcular IGV 
    //     valorTotal = valorUnitTotal + valorIgv

    //     // Setear valores
    //     campoIgv.value = valorIgv
    //     campoTotal.value = valorTotal
    // }

    // $("input[name^='cantidad-']").keyup(function(e) {

    //     cantidad = parseInt(this.value)
    //     valorUnit = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value
    //     tipoIgv = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value
    //     campoIgv = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0]
    //     campoTotal = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0]
        
    //     calcularValores($(this))
    // })

    // $("input[name^='valor-unit-']").keyup(function(e) {
    //     cantidad = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].value
    //     valorUnit = parseInt(this.value)
    //     tipoIgv = this.parentElement.previousElementSibling.children[0].value
    //     campoIgv = this.parentElement.nextElementSibling.children[0]
    //     campoTotal = this.parentElement.nextElementSibling.nextElementSibling.children[0]
        
    //     calcularValores($(this))

    // })

    // // $("select[name^='tipo-igv-']").change(function() {
    // $("select[name^='tipo-igv-']").change(function() {
    //     cantidad = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].value
    //     valorUnit = parseInt(this.parentElement.nextElementSibling.children[0].value)
    //     tipoIgv = this.value
    //     campoIgv = this.parentElement.nextElementSibling.nextElementSibling.children[0]
    //     campoTotal = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0]

    //     calcularValores($(this))

    // })


    /* Crear nueva columna de Producto */
    var tableRows = 3;

    const uMedidaArray = [
        {
            value: 1, umedida: 'Kg'
        },
        {
            value: 2, umedida: 'Mts'
        },
        {
            value: 3, umedida: 'UND'
        }
    ]

    const tiposIGVArray = [
        {
            value: 10, type: 'Gravado - Operación Onerosa'
        },
        {
            value: 11, type: 'Gravado – Retiro por premio'
        },
        {
            value: 12, type: 'Gravado – Retiro por donación'
        },
        {
            value: 13, type: 'Gravado – Retiro '
        },
        {
            value: 14, type: 'Gravado – Retiro por publicidad'
        },
        {
            value: 15, type: 'Gravado – Bonificaciones'
        },
        {
            value: 16, type: 'Gravado – Retiro por entrega a trabajadores'
        },
        {
            value: 17, type: 'Gravado – IVAP'
        },
        {
            value: 20, type: 'Exonerado - Operación Onerosa'
        },
        {
            value: 21, type: 'Exonerado – Transferencia Gratuita'
        },
        {
            value: 30, type: 'Inafecto - Operación Onerosa'
        },
        {
            value: 31, type: 'Inafecto – Retiro por Bonificación'
        },
        {
            value: 32, type: 'Inafecto – Retiro'
        },
        {
            value: 33, type: 'Inafecto – Retiro por Muestras Médicas'
        },
        {
            value: 34, type: 'Inafecto - Retiro por Convenio Colectivo'
        },
        {
            value: 35, type: 'Inafecto – Retiro por premio'
        },
        {
            value: 36, type: 'Inafecto - Retiro por publicidad'
        },
        {
            value: 37, type: 'Exportación'
        }
    ]

    createNewProduct = function() {
        let rowId = tableRows + 1,
            newRow = `
            <tr>
                <td>
                    <input class="field default block" type="text" name="servicio-${rowId}">
                </td>
                <td>
                    <select class="native-select default" name="unid-medida-${rowId}">
                        <option value="" disabled="disabled" selected="selected">—</option>`;

                        for(i = 0; i < uMedidaArray.length; i++) {
                            newRow += `<option value="${uMedidaArray[i]['value']}">${uMedidaArray[i]['umedida']}</option>`
                        }

                    newRow += `</select>
                </td>
                <td>
                    <input class="field default block" type="text" name="cantidad-${rowId}" value="1" onkeyup="calcularValores(this)">
                </td>
                <td>
                <input class="field-description field default block" type="text" name="description-${rowId}">
                </td>
                <td>
                    <input class="field default block" type="text" name="cod-${rowId}">
                </td>
                <td>
                <select class="native-select default" name="tipo-igv-${rowId}" onchange="calcularValores(this)">
                    <option value="" disabled="disabled" selected="selected">Seleccionar</option>`;


                for(i = 0; i < tiposIGVArray.length; i++) {
                    newRow += `<option value="${tiposIGVArray[i]['value']}">${tiposIGVArray[i]['type']}</option>`
                }

                newRow += `</select>
                </td>
                <td>
                    <input class="field default block" type="text" name="valor-unit-${rowId}" onkeyup="calcularValores(this)">
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
        $('#products-table > tbody > tr').each(function() {
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
                //Form Reset
                $('input[type=text], input[type=number], input[type=hidden], select').val('')

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
            if(fechaEmisionValue != '') {
                fechaEmisionValue = fechaEmisionValue.split("-")
                fechaEmisionValue = fechaEmisionValue[2] + "/" + fechaEmisionValue[1] + "/" + fechaEmisionValue[0]
            }

            fechaVencimientoValue = $('input[name=fecha-vencimiento]').val()
            if(fechaVencimientoValue != '') {
                fechaVencimientoValue = fechaVencimientoValue.split("-")
                fechaVencimientoValue = fechaVencimientoValue[1] + "-" + fechaVencimientoValue[2] + "-" + fechaVencimientoValue[0]
            }

            observacionValue = $('textarea[name=observacion]').val()        

            // Productos
            productos = '';
            $('#products-table > tbody > tr').each(function() {
                cantidad = $(this).children('td').eq(2).children().val()
                uMedida = $(this).children('td').eq(1).children().val()
                descripcion = $(this).children('td').eq(3).children().val()
                valorUnit = $(this).children('td').eq(6).children().val()
                importe = $(this).children('td').eq(8).children().val()

                console.log(cantidad)

                productos += `
                <tr>
                    <td class="text-center">${cantidad}</td>
                    <td class="text-center">${uMedida}</td>
                    <td class="text-center">${descripcion}</td>
                    <td class="text-center">${valorUnit}</td>
                    <td class="text-center">${importe}</td>
                </tr>
                `
            })


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

        $('#products-table-p > tbody').html(productos)
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
        } else {
        }
    })


    /** Calculos sub totales */
    // Gravado - Operación Onerosa , value 10
    // Gravado – Retiro por premio , value 11
    // Gravado – Retiro por donación , value 12
    // Gravado – Retiro, value 13
    // Gravado – Retiro por publicidad , value 14
    // Gravado – Bonificaciones , value 15
    // Gravado – Retiro por entrega a trabajadores , value 16
    // Gravado – IVAP , value 17 ESTE FALTA
    // Exonerado - Operación Onerosa , value 20
    // Exonerado – Transferencia Gratuita , value 21 ESTE FALTA
    // Inafecto - Operación Onerosa , value 30
    // Inafecto – Retiro por Bonificación , value 31
    // Inafecto – Retiro , value 32
    // Inafecto – Retiro por Muestras Médicas , value 33
    // Inafecto - Retiro por Convenio Colectivo , value 34
    // Inafecto – Retiro por premio , value 35
    // Inafecto - Retiro por publicidad , value 36
    // Exportación, value 37

    // % Descuento
    // Anticipo (-)
    // Exonerada 20
    // Inafecta 37, 30
    // Gravada 10
    // IGV
    // Gratuita 11, 12, 13, 14, 15, 16, 36, 35, 34, 33, 32, 31
    // Otros cargos
    // Descuento total (-)
    // TOTAL

    
    function actualizarSubtotales() {
        tiposParaExonerada = ['20']
        tiposParaInafecta = [30, 37]
        tiposParaGravada = [10]
        tiposParaGratuita = [11, 12, 13, 14, 15, 16, 31, 32, 33, 34, 35, 36]
        subtotalExonerada = '',
        subtotalInafecta = '',
        subtotalGravada = '',
        subtotalGratuita = ''

        $('select[name^=tipo-igv-').each(function() {
            total = $(this).parent().next().next().next().children().val()
            parseFloat(subtotalExonerada)
            parseFloat(total)

            if(jQuery.inArray('10', tiposParaExonerada)) subtotalExonerada += total
            if(jQuery.inArray('10', tiposParaInafecta)) subtotalInafecta += total
            if(jQuery.inArray('10', tiposParaGravada)) subtotalGravada += total
            if(jQuery.inArray('10', tiposParaGratuita)) subtotalGratuita += total
        })

        console.log(`Exonerada es: ${subtotalExonerada}`)
        console.log(`Inafecta es: ${subtotalInafecta}`)
        console.log(`Gravada es: ${subtotalGravada}`)
        console.log(`Gratuita es: ${subtotalGratuita}`)
    }
    
    $('select[name^=tipo-igv-').change(function() { actualizarSubtotales() })
})