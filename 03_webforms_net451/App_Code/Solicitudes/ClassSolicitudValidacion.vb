Imports System
Imports System.Collections.Generic
Imports System.Globalization
Imports System.Text.RegularExpressions
Imports System.Web.Script.Serialization

Public Class ClassSolicitudValidacion
    Private Const MaxRows As Integer = 50

    Public Function Validar(dto As SolicitudFormularioDto) As List(Of ValidationError)
        Dim errores As New List(Of ValidationError)()

        ValidarPaso1(dto, errores)
        ValidarPaso2(dto, errores)
        ValidarPaso3(dto, errores)
        ValidarPaso4(dto, errores)
        ValidarPaso5(dto, errores)
        ValidarPaso6(dto, errores)

        Return errores
    End Function

    Private Sub ValidarPaso1(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If String.IsNullOrWhiteSpace(dto.TipoFormulario) Then errores.Add(New ValidationError("Seleccione tipo de formulario.", "ddlTipoFormulario", 1))
        If String.IsNullOrWhiteSpace(dto.NombreContratante) Then errores.Add(New ValidationError("Ingrese nombre del contratante.", "txtNombreContratante", 1))
        If String.IsNullOrWhiteSpace(dto.NumeroPoliza) Then errores.Add(New ValidationError("Ingrese numero de poliza.", "txtNumeroPoliza", 1))
        If dto.SumaAsegurada <= 0D Then errores.Add(New ValidationError("Ingrese suma asegurada valida.", "txtSumaAsegurada", 1))
    End Sub

    Private Sub ValidarPaso2(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If String.IsNullOrWhiteSpace(dto.PrimerApellido) Then errores.Add(New ValidationError("Ingrese primer apellido.", "txtPrimerApellido", 2))
        If String.IsNullOrWhiteSpace(dto.PrimerNombre) Then errores.Add(New ValidationError("Ingrese primer nombre.", "txtPrimerNombre", 2))
        If String.IsNullOrWhiteSpace(dto.TipoDocumento) Then errores.Add(New ValidationError("Seleccione tipo de documento.", "ddlTipoDocumento", 2))
        If String.IsNullOrWhiteSpace(dto.NumeroDocumento) Then
            errores.Add(New ValidationError("Ingrese numero de identificacion.", "txtNumeroDocumento", 2))
        ElseIf Not ValidarDocumento(dto.TipoDocumento, dto.NumeroDocumento) Then
            errores.Add(New ValidationError("Numero de identificacion invalido para el tipo seleccionado.", "txtNumeroDocumento", 2))
        End If

        If String.IsNullOrWhiteSpace(dto.LugarNacimiento) Then errores.Add(New ValidationError("Ingrese lugar de nacimiento.", "txtLugarNacimiento", 2))
        If String.IsNullOrWhiteSpace(dto.Nacionalidad) Then errores.Add(New ValidationError("Ingrese nacionalidad.", "txtNacionalidad", 2))
        If String.IsNullOrWhiteSpace(dto.ProfesionOficio) Then errores.Add(New ValidationError("Ingrese profesion u oficio.", "txtProfesionOficio", 2))
        If dto.EstaturaMetros < 0.5D OrElse dto.EstaturaMetros > 2.5D Then errores.Add(New ValidationError("Estatura debe estar entre 0.50 y 2.50 metros.", "txtEstaturaMetros", 2))
        If dto.PesoLibras < 20D OrElse dto.PesoLibras > 600D Then errores.Add(New ValidationError("Peso debe estar entre 20 y 600 libras.", "txtPesoLibras", 2))
        If String.IsNullOrWhiteSpace(dto.CargoDesempena) Then errores.Add(New ValidationError("Ingrese cargo que desempena.", "txtCargoDesempena", 2))
        If dto.SueldoMensual <= 0D OrElse dto.SueldoMensual > 99999999D Then errores.Add(New ValidationError("Sueldo mensual invalido.", "txtSueldoMensual", 2))
    End Sub

    Private Sub ValidarPaso3(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If String.IsNullOrWhiteSpace(dto.Pais) Then errores.Add(New ValidationError("Seleccione pais.", "ddlPais", 3))
        If String.IsNullOrWhiteSpace(dto.Departamento) Then errores.Add(New ValidationError("Seleccione departamento.", "ddlDepartamento", 3))
        If String.IsNullOrWhiteSpace(dto.Ciudad) Then errores.Add(New ValidationError("Seleccione ciudad.", "ddlCiudad", 3))
        If String.IsNullOrWhiteSpace(dto.Municipio) Then errores.Add(New ValidationError("Seleccione municipio.", "ddlMunicipio", 3))
        If String.IsNullOrWhiteSpace(dto.Celular) Then
            errores.Add(New ValidationError("Ingrese celular.", "txtCelular", 3))
        ElseIf Not Regex.IsMatch(dto.Celular, "^[0-9\-\s\+\(\)]{7,20}$") Then
            errores.Add(New ValidationError("Celular tiene formato invalido.", "txtCelular", 3))
        End If

        If Not String.IsNullOrWhiteSpace(dto.Email) AndAlso Not Regex.IsMatch(dto.Email, "^[^@\s]+@[^@\s]+\.[^@\s]+$") Then
            errores.Add(New ValidationError("E-mail invalido.", "txtEmail", 3))
        End If
    End Sub

    Private Sub ValidarPaso4(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        Dim vidaRows = ParseRows(dto.BeneficiariosVidaJson)
        If vidaRows Is Nothing Then
            errores.Add(New ValidationError("Beneficiarios de vida contiene formato invalido.", "bodyVida", 4))
        Else
            ValidarFilasBeneficiarios(vidaRows, "vida", errores)
        End If

        Dim contRows = ParseRows(dto.BeneficiariosContingenciaJson)
        If contRows Is Nothing Then
            errores.Add(New ValidationError("Beneficiarios de contingencia contiene formato invalido.", "bodyCont", 4))
        Else
            ValidarFilasBeneficiarios(contRows, "cont", errores)
        End If

        If Decimal.Round(dto.TotalBeneficiariosVida, 2) <> 100D Then
            errores.Add(New ValidationError("Beneficiarios de vida deben sumar 100%.", "hfTotalVida", 4))
        End If

        If Decimal.Round(dto.TotalBeneficiariosContingencia, 2) <> 100D Then
            errores.Add(New ValidationError("Beneficiarios de contingencia deben sumar 100%.", "hfTotalCont", 4))
        End If

        Dim requiereDependientes = dto.TipoFormulario = "101" OrElse dto.TipoFormulario = "63" OrElse dto.TipoFormulario = "64"
        If requiereDependientes Then
            Dim depRows = ParseRows(dto.DependientesJson)
            If depRows Is Nothing Then
                errores.Add(New ValidationError("Dependientes contiene formato invalido.", "bodyDep", 4))
            Else
                ValidarFilasDependientes(depRows, dto.TipoFormulario, errores)
            End If
        End If
    End Sub

    Private Sub ValidarPaso5(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If dto.TipoFormulario = "101" Then
            Return
        End If

        If dto.TipoFormulario = "61" OrElse dto.TipoFormulario = "62" Then
            If String.IsNullOrWhiteSpace(dto.SaludCorta1) Then errores.Add(New ValidationError("Complete salud corta 1.", "ddlSaludCorta1", 5))
            If String.IsNullOrWhiteSpace(dto.SaludCorta2) Then errores.Add(New ValidationError("Complete salud corta 2.", "ddlSaludCorta2", 5))
            If String.IsNullOrWhiteSpace(dto.SaludCorta3) Then errores.Add(New ValidationError("Complete salud corta 3.", "ddlSaludCorta3", 5))
            If String.IsNullOrWhiteSpace(dto.SaludCorta4) Then errores.Add(New ValidationError("Complete salud corta 4.", "ddlSaludCorta4", 5))

            If TieneRespuestaSi(dto.SaludCorta1, dto.SaludCorta2, dto.SaludCorta3, dto.SaludCorta4) AndAlso String.IsNullOrWhiteSpace(dto.SaludCortaDetalle) Then
                errores.Add(New ValidationError("Complete detalle para respuestas afirmativas de salud corta.", "txtSaludCortaDetalle", 5))
            End If
        End If

        If dto.TipoFormulario = "63" OrElse dto.TipoFormulario = "64" Then
            If String.IsNullOrWhiteSpace(dto.SaludLarga1) Then errores.Add(New ValidationError("Complete salud larga 1.", "ddlSaludLarga1", 5))
            If String.IsNullOrWhiteSpace(dto.SaludLarga2) Then errores.Add(New ValidationError("Complete salud larga 2.", "ddlSaludLarga2", 5))
            If String.IsNullOrWhiteSpace(dto.SaludLarga3) Then errores.Add(New ValidationError("Complete salud larga 3.", "ddlSaludLarga3", 5))
            If String.IsNullOrWhiteSpace(dto.SaludLarga4) Then errores.Add(New ValidationError("Complete salud larga 4.", "ddlSaludLarga4", 5))
            If String.IsNullOrWhiteSpace(dto.SaludLarga5) Then errores.Add(New ValidationError("Complete salud larga 5.", "ddlSaludLarga5", 5))

            If TieneRespuestaSi(dto.SaludLarga1, dto.SaludLarga2, dto.SaludLarga3, dto.SaludLarga4, dto.SaludLarga5) AndAlso String.IsNullOrWhiteSpace(dto.SaludLargaDetalle) Then
                errores.Add(New ValidationError("Complete detalle para respuestas afirmativas de salud larga.", "txtSaludLargaDetalle", 5))
            End If

            If dto.TomaMedicamentos = "SI" AndAlso String.IsNullOrWhiteSpace(dto.MedicamentosDetalle) Then
                errores.Add(New ValidationError("Complete detalle de medicamentos.", "txtMedicamentosDetalle", 5))
            End If
        End If
    End Sub

    Private Sub ValidarPaso6(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If Not dto.AceptaDeclaracion Then
            errores.Add(New ValidationError("Debe aceptar la declaracion legal.", "chkAceptaDeclaracion", 6))
        End If

        If String.IsNullOrWhiteSpace(dto.FirmaSolicitante) Then
            errores.Add(New ValidationError("Ingrese firma del solicitante.", "txtFirmaSolicitante", 6))
        End If

        If String.IsNullOrWhiteSpace(dto.FirmaPatrono) Then
            errores.Add(New ValidationError("Ingrese firma del patrono/contratante.", "txtFirmaPatrono", 6))
        End If

        If String.IsNullOrWhiteSpace(dto.FechaFirma) Then
            errores.Add(New ValidationError("Ingrese fecha de firma.", "txtFechaFirma", 6))
        Else
            Dim parsed As DateTime
            If Not DateTime.TryParseExact(dto.FechaFirma, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, parsed) Then
                errores.Add(New ValidationError("Fecha de firma invalida.", "txtFechaFirma", 6))
            End If
        End If
    End Sub

    Private Sub ValidarFilasBeneficiarios(rows As List(Of Dictionary(Of String, String)), section As String, errores As List(Of ValidationError))
        If rows.Count = 0 Then
            Dim fieldId = If(section = "vida", "bodyVida", "bodyCont")
            Dim msg = If(section = "vida", "Agregue al menos un beneficiario de vida.", "Agregue al menos un beneficiario de contingencia.")
            errores.Add(New ValidationError(msg, fieldId, 4))
            Return
        End If

        For Each row In rows
            Dim nombre = ObtenerValor(row, "nombre")
            Dim parentesco = ObtenerValor(row, "parentesco")
            Dim fecha = ObtenerValor(row, "fecha")
            Dim porcentajeRaw = ObtenerValor(row, "porcentaje")

            If String.IsNullOrWhiteSpace(nombre) Then
                errores.Add(New ValidationError("Cada beneficiario debe tener nombre.", If(section = "vida", "bodyVida", "bodyCont"), 4))
                Exit For
            End If

            If String.IsNullOrWhiteSpace(parentesco) Then
                errores.Add(New ValidationError("Cada beneficiario debe tener parentesco.", If(section = "vida", "bodyVida", "bodyCont"), 4))
                Exit For
            End If

            Dim parsedFecha As DateTime
            If String.IsNullOrWhiteSpace(fecha) OrElse Not DateTime.TryParseExact(fecha, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, parsedFecha) Then
                errores.Add(New ValidationError("Cada beneficiario debe tener fecha valida.", If(section = "vida", "bodyVida", "bodyCont"), 4))
                Exit For
            End If

            Dim pct As Decimal
            If Not Decimal.TryParse(porcentajeRaw.Replace(",", "."), NumberStyles.Any, CultureInfo.InvariantCulture, pct) OrElse pct <= 0D OrElse pct > 100D Then
                errores.Add(New ValidationError("Porcentaje de beneficiario invalido.", If(section = "vida", "bodyVida", "bodyCont"), 4))
                Exit For
            End If
        Next
    End Sub

    Private Sub ValidarFilasDependientes(rows As List(Of Dictionary(Of String, String)), tipoFormulario As String, errores As List(Of ValidationError))
        For Each row In rows
            Dim nombre = ObtenerValor(row, "nombre")
            Dim genero = ObtenerValor(row, "genero")
            Dim fecha = ObtenerValor(row, "fecha")
            Dim pesoRaw = ObtenerValor(row, "peso")
            Dim estaturaRaw = ObtenerValor(row, "estatura")

            If String.IsNullOrWhiteSpace(nombre) Then
                errores.Add(New ValidationError("Dependiente con nombre vacio no es valido.", "bodyDep", 4))
                Exit For
            End If

            If String.IsNullOrWhiteSpace(genero) Then
                errores.Add(New ValidationError("Debe seleccionar genero M/F para cada dependiente registrado.", "bodyDep", 4))
                Exit For
            End If

            Dim parsedFecha As DateTime
            If Not String.IsNullOrWhiteSpace(fecha) AndAlso Not DateTime.TryParseExact(fecha, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, parsedFecha) Then
                errores.Add(New ValidationError("Fecha de dependiente invalida.", "bodyDep", 4))
                Exit For
            End If

            If tipoFormulario = "63" OrElse tipoFormulario = "64" Then
                If Not String.IsNullOrWhiteSpace(pesoRaw) Then
                    Dim peso As Decimal
                    If Not Decimal.TryParse(pesoRaw.Replace(",", "."), NumberStyles.Any, CultureInfo.InvariantCulture, peso) OrElse peso < 5D OrElse peso > 600D Then
                        errores.Add(New ValidationError("Peso de dependiente invalido.", "bodyDep", 4))
                        Exit For
                    End If
                End If

                If Not String.IsNullOrWhiteSpace(estaturaRaw) Then
                    Dim estatura As Decimal
                    If Not Decimal.TryParse(estaturaRaw.Replace(",", "."), NumberStyles.Any, CultureInfo.InvariantCulture, estatura) OrElse estatura < 0.3D OrElse estatura > 2.5D Then
                        errores.Add(New ValidationError("Estatura de dependiente invalida.", "bodyDep", 4))
                        Exit For
                    End If
                End If
            End If
        Next
    End Sub

    Private Function ParseRows(raw As String) As List(Of Dictionary(Of String, String))
        If String.IsNullOrWhiteSpace(raw) Then
            Return New List(Of Dictionary(Of String, String))()
        End If

        If raw.Length > 30000 Then
            Return Nothing
        End If

        Dim serializer As New JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, String))

        Try
            rows = serializer.Deserialize(Of List(Of Dictionary(Of String, String)))(raw)
        Catch
            Return Nothing
        End Try

        If rows Is Nothing Then
            Return New List(Of Dictionary(Of String, String))()
        End If

        If rows.Count > MaxRows Then
            Return Nothing
        End If

        Return rows
    End Function

    Private Function TieneRespuestaSi(ParamArray respuestas As String()) As Boolean
        For Each r As String In respuestas
            If r = "SI" Then
                Return True
            End If
        Next

        Return False
    End Function

    Private Function ObtenerValor(row As Dictionary(Of String, String), key As String) As String
        If row Is Nothing OrElse Not row.ContainsKey(key) Then
            Return String.Empty
        End If

        Return If(row(key), String.Empty).Trim()
    End Function

    Private Function ValidarDocumento(tipo As String, numero As String) As Boolean
        If tipo = "DNI" Then
            Return Regex.IsMatch(numero, "^[0-9]{13}$")
        End If

        If tipo = "CR" Then
            Return Regex.IsMatch(numero, "^[A-Za-z0-9\-]{6,20}$")
        End If

        If tipo = "PAS" Then
            Return Regex.IsMatch(numero, "^[A-Za-z0-9]{6,20}$")
        End If

        Return False
    End Function
End Class
