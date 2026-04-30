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
End Class
