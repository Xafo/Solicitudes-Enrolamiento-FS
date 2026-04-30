Imports System.Collections.Generic

Public Class ClassSolicitudValidacion
    Public Function ValidarSprint1(dto As SolicitudFormularioDto) As List(Of String)
        Dim errores As New List(Of String)()

        If String.IsNullOrWhiteSpace(dto.TipoFormulario) Then errores.Add("Seleccione tipo de formulario.")
        If String.IsNullOrWhiteSpace(dto.NombreContratante) Then errores.Add("Ingrese nombre del contratante.")
        If String.IsNullOrWhiteSpace(dto.NumeroPoliza) Then errores.Add("Ingrese numero de poliza.")
        If dto.SumaAsegurada <= 0D Then errores.Add("Ingrese suma asegurada valida.")

        If String.IsNullOrWhiteSpace(dto.PrimerApellido) Then errores.Add("Ingrese primer apellido.")
        If String.IsNullOrWhiteSpace(dto.PrimerNombre) Then errores.Add("Ingrese primer nombre.")
        If String.IsNullOrWhiteSpace(dto.TipoDocumento) Then errores.Add("Seleccione tipo de documento.")
        If String.IsNullOrWhiteSpace(dto.NumeroDocumento) Then errores.Add("Ingrese numero de identificacion.")
        If String.IsNullOrWhiteSpace(dto.LugarNacimiento) Then errores.Add("Ingrese lugar de nacimiento.")
        If String.IsNullOrWhiteSpace(dto.Nacionalidad) Then errores.Add("Ingrese nacionalidad.")
        If String.IsNullOrWhiteSpace(dto.ProfesionOficio) Then errores.Add("Ingrese profesion u oficio.")
        If dto.EstaturaMetros <= 0D Then errores.Add("Ingrese estatura valida.")
        If dto.PesoLibras <= 0D Then errores.Add("Ingrese peso valido.")
        If String.IsNullOrWhiteSpace(dto.CargoDesempena) Then errores.Add("Ingrese cargo que desempena.")
        If dto.SueldoMensual <= 0D Then errores.Add("Ingrese sueldo mensual valido.")

        If String.IsNullOrWhiteSpace(dto.Pais) Then errores.Add("Seleccione pais.")
        If String.IsNullOrWhiteSpace(dto.Departamento) Then errores.Add("Seleccione departamento.")
        If String.IsNullOrWhiteSpace(dto.Ciudad) Then errores.Add("Seleccione ciudad.")
        If String.IsNullOrWhiteSpace(dto.Municipio) Then errores.Add("Seleccione municipio.")
        If String.IsNullOrWhiteSpace(dto.Celular) Then errores.Add("Ingrese celular.")

        Return errores
    End Function

    Public Function ValidarTotalBeneficiarios(totalVida As Decimal, totalContingencia As Decimal) As Boolean
        Return totalVida = 100D AndAlso totalContingencia = 100D
    End Function

    Public Function ValidarSprint2(dto As SolicitudFormularioDto) As List(Of String)
        Dim errores As New List(Of String)()

        If dto.TotalBeneficiariosVida <> 100D Then
            errores.Add("Beneficiarios de vida deben sumar 100%.")
        End If

        If dto.TotalBeneficiariosContingencia <> 100D Then
            errores.Add("Beneficiarios de contingencia deben sumar 100%.")
        End If

        Dim requiereDependientes = dto.TipoFormulario = "101" OrElse dto.TipoFormulario = "63" OrElse dto.TipoFormulario = "64"
        If requiereDependientes Then
            ValidarGeneroDependiente(dto.DependienteNombre1, dto.DependienteGenero1, errores)
            ValidarGeneroDependiente(dto.DependienteNombre2, dto.DependienteGenero2, errores)
            ValidarGeneroDependiente(dto.DependienteNombre3, dto.DependienteGenero3, errores)
        End If

        If dto.TipoFormulario = "61" OrElse dto.TipoFormulario = "62" Then
            If String.IsNullOrWhiteSpace(dto.SaludCorta1) OrElse String.IsNullOrWhiteSpace(dto.SaludCorta2) OrElse String.IsNullOrWhiteSpace(dto.SaludCorta3) OrElse String.IsNullOrWhiteSpace(dto.SaludCorta4) Then
                errores.Add("Complete las respuestas de salud corta.")
            End If

            If TieneRespuestaSi(dto.SaludCorta1, dto.SaludCorta2, dto.SaludCorta3, dto.SaludCorta4) AndAlso String.IsNullOrWhiteSpace(dto.SaludCortaDetalle) Then
                errores.Add("Complete detalle para respuestas afirmativas de salud corta.")
            End If
        End If

        If dto.TipoFormulario = "63" OrElse dto.TipoFormulario = "64" Then
            If String.IsNullOrWhiteSpace(dto.SaludLarga1) OrElse String.IsNullOrWhiteSpace(dto.SaludLarga2) OrElse String.IsNullOrWhiteSpace(dto.SaludLarga3) OrElse String.IsNullOrWhiteSpace(dto.SaludLarga4) OrElse String.IsNullOrWhiteSpace(dto.SaludLarga5) Then
                errores.Add("Complete las respuestas de salud larga.")
            End If

            If TieneRespuestaSi(dto.SaludLarga1, dto.SaludLarga2, dto.SaludLarga3, dto.SaludLarga4, dto.SaludLarga5) AndAlso String.IsNullOrWhiteSpace(dto.SaludLargaDetalle) Then
                errores.Add("Complete detalle para respuestas afirmativas de salud larga.")
            End If

            If dto.TomaMedicamentos = "SI" AndAlso String.IsNullOrWhiteSpace(dto.MedicamentosDetalle) Then
                errores.Add("Complete detalle de medicamentos.")
            End If
        End If

        Return errores
    End Function

    Private Sub ValidarGeneroDependiente(nombre As String, genero As String, errores As List(Of String))
        If Not String.IsNullOrWhiteSpace(nombre) AndAlso String.IsNullOrWhiteSpace(genero) Then
            errores.Add("Debe seleccionar genero M/F para cada dependiente registrado.")
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
End Class
