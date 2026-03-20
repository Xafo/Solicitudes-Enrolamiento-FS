Imports System.Collections.Generic
Imports System.Web.Script.Serialization

Public Class ClassSolicitudValidacion
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
        If String.IsNullOrWhiteSpace(dto.NumeroDocumento) Then errores.Add(New ValidationError("Ingrese numero de identificacion.", "txtNumeroDocumento", 2))
        If String.IsNullOrWhiteSpace(dto.LugarNacimiento) Then errores.Add(New ValidationError("Ingrese lugar de nacimiento.", "txtLugarNacimiento", 2))
        If String.IsNullOrWhiteSpace(dto.Nacionalidad) Then errores.Add(New ValidationError("Ingrese nacionalidad.", "txtNacionalidad", 2))
        If String.IsNullOrWhiteSpace(dto.ProfesionOficio) Then errores.Add(New ValidationError("Ingrese profesion u oficio.", "txtProfesionOficio", 2))
        If dto.EstaturaMetros <= 0D Then errores.Add(New ValidationError("Ingrese estatura valida.", "txtEstaturaMetros", 2))
        If dto.PesoLibras <= 0D Then errores.Add(New ValidationError("Ingrese peso valido.", "txtPesoLibras", 2))
        If String.IsNullOrWhiteSpace(dto.CargoDesempena) Then errores.Add(New ValidationError("Ingrese cargo que desempena.", "txtCargoDesempena", 2))
        If dto.SueldoMensual <= 0D Then errores.Add(New ValidationError("Ingrese sueldo mensual valido.", "txtSueldoMensual", 2))
    End Sub

    Private Sub ValidarPaso3(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If String.IsNullOrWhiteSpace(dto.Pais) Then errores.Add(New ValidationError("Seleccione pais.", "ddlPais", 3))
        If String.IsNullOrWhiteSpace(dto.Departamento) Then errores.Add(New ValidationError("Seleccione departamento.", "ddlDepartamento", 3))
        If String.IsNullOrWhiteSpace(dto.Ciudad) Then errores.Add(New ValidationError("Seleccione ciudad.", "ddlCiudad", 3))
        If String.IsNullOrWhiteSpace(dto.Municipio) Then errores.Add(New ValidationError("Seleccione municipio.", "ddlMunicipio", 3))
        If String.IsNullOrWhiteSpace(dto.Celular) Then errores.Add(New ValidationError("Ingrese celular.", "txtCelular", 3))
    End Sub

    Private Sub ValidarPaso4(dto As SolicitudFormularioDto, errores As List(Of ValidationError))
        If dto.TotalBeneficiariosVida <> 100D Then
            errores.Add(New ValidationError("Beneficiarios de vida deben sumar 100%.", "hfTotalVida", 4))
        End If

        If dto.TotalBeneficiariosContingencia <> 100D Then
            errores.Add(New ValidationError("Beneficiarios de contingencia deben sumar 100%.", "hfTotalCont", 4))
        End If

        Dim requiereDependientes = dto.TipoFormulario = "101" OrElse dto.TipoFormulario = "63" OrElse dto.TipoFormulario = "64"
        If requiereDependientes Then
            Dim serializer As New JavaScriptSerializer()
            Dim rows As List(Of Dictionary(Of String, String))

            Try
                rows = serializer.Deserialize(Of List(Of Dictionary(Of String, String)))(If(dto.DependientesJson, "[]"))
            Catch
                rows = New List(Of Dictionary(Of String, String))()
            End Try

            For Each row In rows
                Dim nombre = ObtenerValor(row, "nombre")
                Dim genero = ObtenerValor(row, "genero")
                If Not String.IsNullOrWhiteSpace(nombre) AndAlso String.IsNullOrWhiteSpace(genero) Then
                    errores.Add(New ValidationError("Debe seleccionar genero M/F para cada dependiente registrado.", "bodyDep", 4))
                    Exit For
                End If
            Next
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
        End If
    End Sub

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

        Return If(row(key), String.Empty)
    End Function
End Class
