Public Class SolicitudFormularioDto
    Public Property TipoFormulario As String
    Public Property NombreContratante As String
    Public Property NumeroPoliza As String
    Public Property SumaAsegurada As Decimal

    Public Property PrimerApellido As String
    Public Property SegundoApellido As String
    Public Property PrimerNombre As String
    Public Property SegundoNombre As String
    Public Property TipoDocumento As String
    Public Property NumeroDocumento As String
    Public Property LugarNacimiento As String
    Public Property Nacionalidad As String
    Public Property ProfesionOficio As String
    Public Property EstaturaMetros As Decimal
    Public Property PesoLibras As Decimal
    Public Property CargoDesempena As String
    Public Property SueldoMensual As Decimal
    Public Property CelularMfa As String

    Public Property Pais As String
    Public Property Departamento As String
    Public Property Ciudad As String
    Public Property Municipio As String
    Public Property Calle As String
    Public Property Avenida As String
    Public Property Celular As String
    Public Property Email As String

    Public Property TotalBeneficiariosVida As Decimal
    Public Property TotalBeneficiariosContingencia As Decimal
    Public Property BeneficiariosVidaJson As String
    Public Property BeneficiariosContingenciaJson As String
    Public Property DependientesJson As String

    Public Property SaludCortaJson As String

    Public Property SaludLargaJson As String

    Public Property TomaMedicamentos As String
    Public Property MedicamentosJson As String

    Public Property AceptaDeclaracion As Boolean
    Public Property FirmaSolicitante As String
    Public Property FechaFirma As String
    Public Property ObservacionesFinales As String
    Public Property MfaValidado As Boolean
    Public Property MfaTxnId As String
End Class
