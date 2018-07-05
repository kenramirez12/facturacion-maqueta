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

    /** Cálculo de valores */

    // Array de correspondencias tipo igv - campos subtotales
    tiposParaExonerada = [20]
    tiposParaInafecta = [30, 37]
    tiposParaGravada = [10]
    tiposParaGratuita = [11, 12, 13, 14, 15, 16, 31, 32, 33, 34, 35, 36]

    exonerada = $('input[name=exonerada]')
    inafecta = $('input[name=inafecta]')
    gravada = $('input[name=gravada]')
    gratuita = $('input[name=gratuita]')
    igv = $('input[name=igv]')
    total = $('input[name=total]')

    porcentajeIgv = 0.18;

    informaciondeProducto = function(e) {
        tr = e.parent().parent()
        cantidad = tr.children('td').eq(0).children().val()
        tipoIgv = parseInt(tr.children('td').eq(4).children().val())
        valorUnit = tr.children('td').eq(5).children().val()
        campoIgv = tr.children('td').eq(7).children()
        campoTotal = tr.children('td').eq(8).children()
    }

    calcularValores = function(that) {
        informaciondeProducto($(that))

        valorIgv = 0 // Valor inicial de IGV
        valorUnitTotal = valorUnit * cantidad
        if(tipoIgv == 10) valorIgv = valorUnitTotal * porcentajeIgv // Calcular IGV 
        valorTotal = valorUnitTotal + valorIgv

        // Setear valores en grilla de productos
        campoIgv.val(valorIgv.toFixed(2))
        campoTotal.val(valorTotal.toFixed(2))

        // Setear valores en sub totales
        if(tipoIgv) {
            //Resetear sub totales
            exonerada.val(0)
            inafecta.val(0)
            gravada.val(0)
            gratuita.val(0)

            arrayGravada = []

            $('select[name^=tipoIgv-').each(function() {
                that = $(this)
                thatVal = parseInt(that.val())
                thatValorUnit = that.parent().parent().children('td').eq(5).children().val()

                //Sumar
                if(that.val()) {

                    if ($.inArray(thatVal, tiposParaExonerada) != -1) {
                        
                        subtotalExonerada = parseFloat(exonerada.val()) + parseFloat(thatValorUnit)
                        exonerada.val(subtotalExonerada.toFixed(2))
                        
                    } else if ($.inArray(thatVal, tiposParaInafecta) != -1) {
                        
                        subtotalInafecta = parseFloat(inafecta.val()) + parseFloat(thatValorUnit)
                        inafecta.val(subtotalInafecta.toFixed(2))
                        
                    } else if ($.inArray(thatVal, tiposParaGravada) != -1) {
                        
                        subtotalGravada = parseFloat(gravada.val()) + parseFloat(thatValorUnit)
                        gravada.val(subtotalGravada.toFixed(2))
        
                    } else if ($.inArray(thatVal, tiposParaGratuita) != -1) {
        
                        subtotalGratuita = parseFloat(gratuita.val()) + parseFloat(thatValorUnit)
                        gratuita.val(subtotalGratuita.toFixed(2))
        
                    } else {
                        console.log('El tipo de IGV seleccionado no tiene una correspondencia')
                    }
                }
            })

        } else {
            console.log('No se ha definido el tipo de IGV')
        }

        // Recalcular IGV total
        subtotalIgv = 0
        $('input[name^=igv-').each(function() {
            console.log('se suma' + $(this).val())
            subtotalIgv = parseFloat(subtotalIgv) + parseFloat($(this).val())
        })
        
        igv.val(subtotalIgv.toFixed(2))

        //Setear Total
        valorTotalFinal = 0
        $('input[name^=total-').each(function() {
            if($(this).val() != '' || $(this).val() != 0) {
                valorTotalFinal = valorTotalFinal + parseFloat($(this).val())
            }
        })
        total.val(valorTotalFinal)
    }


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
                    <input class="field default block" type="number" name="cantidad-${rowId}" value="1" onkeyup="calcularValores(this)">
                </td>
                <td>
                    <input type="text" name="unidMedida-${rowId}" class="field default block">
                </td>
                <td>
                    <input class="field-description field default block" type="text" name="description-${rowId}">
                </td>
                <td>
                    <input class="field default block" type="text" name="cod-${rowId}">
                </td>
                <td>
                <select class="native-select default" name="tipoIgv-${rowId}" onchange="calcularValores(this)">
                    <option value="" disabled="disabled" selected="selected">Seleccionar</option>`;


                for(i = 0; i < tiposIGVArray.length; i++) {
                    newRow += `<option value="${tiposIGVArray[i]['value']}">${tiposIGVArray[i]['type']}</option>`
                }

                newRow += `</select>
                </td>
                <td>
                    <input class="field default block" type="number" name="valorUnit-${rowId}" onkeyup="calcularValores(this)" placeholder="0">
                </td>
                <td>
                    <input class="field default block" type="number" name="descuento-${rowId}" onkeyup="calcularValores(this)" placeholder="0">
                </td>
                <td>
                    <input class="field default block" type="number" name="igv-${rowId}" disabled>
                </td>
                <td>
                    <input class="field default block" type="number" name="total-${rowId}" disabled>
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
            // var servicio = $(this).children('td').eq(0).children().val(),
            var cantidad = $(this).children('td').eq(2).children().val(),    
                unidMedida = $(this).children('td').eq(1).children().val(),
                descripcion = $(this).children('td').eq(0).children().val(),
                cod = $(this).children('td').eq(3).children().val(),
                tipoIgv = $(this).children('td').eq(4).children().val(),
                valorUnit = $(this).children('td').eq(5).children().val(),
                descuento = $(this).children('td').eq(6).children().val(),
                igv = $(this).children('td').eq(7).children().val(),
                total = $(this).children('td').eq(8).children().val(),

            newInvoice = {
                'order': invoiceDetailsCount,
                'cantidad': cantidad,
                'unid-medida': unidMedida,
                'descripcion': descripcion,
                'cod': cod,
                'tipo-igv': tipoIgv,
                // 'servicio' : servicio,
                'valor-unit': valorUnit,
                'descuento': descuento,
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
                $('input[type=text], input[type=number], input[type=date], input[type=hidden], textarea, select').val('')
                if ($('input[name=numero-documento]').hasClass('success')) $('input[name=numero-documento]').removeClass('success')
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
                fechaVencimientoValue = fechaVencimientoValue[1] + "/" + fechaVencimientoValue[2] + "/" + fechaVencimientoValue[0]
            }

            observacionValue = $('textarea[name=observacion]').val()        

            // Productos
            productos = '';
            $('#products-table > tbody > tr').each(function() {
                cantidad = $(this).children('td').eq(0).children().val()
                uMedida = $(this).children('td').eq(1).children().val()
                uMedida = (uMedida != '') ? uMedida : '—'
                descripcion = $(this).children('td').eq(2).children().val()
                valorUnit = $(this).children('td').eq(5).children().val()
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

            //Subtotales
            exonerada = $('input[name=exonerada]').val()
            inafecta = $('input[name=inafecta]').val()
            gravada = $('input[name=gravada]').val()
            gratuita = $('input[name=gratuita]').val()
            total = $('input[name=total]').val()


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

        $('.total-to-text').html(NumeroALetras(total))

        $('input[name=exonerada-p]').val(exonerada)
        $('input[name=inafecta-p]').val(inafecta)
        $('input[name=gravada-p]').val(gravada)
        $('input[name=gratuita-p]').val(gratuita)
        $('input[name=total-p]').val(total)
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

})