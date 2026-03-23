Imports System
Imports System.Collections.Generic
Imports System.Globalization
Imports System.Linq
Imports System.Text.RegularExpressions
Imports System.Web.Script.Serialization
Imports System.Web.UI.WebControls

Partial Class SolicitudElectronica
    Inherits System.Web.UI.Page

    Private ReadOnly _catalogos As New ClassSolicitudCatalogos()
    Private ReadOnly _validacion As New ClassSolicitudValidacion()
    Private ReadOnly _repositorio As New ClassSolicitudRepositorio()

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        If Not IsPostBack Then
            CargarCatalogosBase()
        End If
    End Sub

    Private Sub CargarCatalogosBase()
        CargarLista(ddlTipoFormulario, _catalogos.ObtenerTiposFormulario())
        CargarLista(ddlTipoDocumento, _catalogos.ObtenerTiposDocumento())
        CargarLista(ddlSaludCorta1, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta2, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta3, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta4, _catalogos.ObtenerSiNo())
        CargarLista(ddlMedicamentos, _catalogos.ObtenerSiNo())
        CargarLista(ddlPais, _catalogos.ObtenerPaises())
        CargarLista(ddlDepartamento, _catalogos.ObtenerDepartamentos())
        CargarLista(ddlCiudad, _catalogos.ObtenerCiudades())
        CargarLista(ddlMunicipio, _catalogos.ObtenerMunicipios())
    End Sub

    Private Sub CargarLista(control As DropDownList, data As List(Of ListItemDto))
        control.DataSource = data
        control.DataTextField = "Text"
        control.DataValueField = "Value"
        control.DataBind()
    End Sub

    Protected Sub btnEnviar_Click(sender As Object, e As EventArgs) Handles btnEnviar.Click
        bltErrores.Visible = False
        Dim dto = ConstruirSolicitud()
        Dim errores = _validacion.Validar(dto)

        If errores.Count > 0 Then
            MostrarPrimerError(errores)
            Return
        End If

        If Not _repositorio.EnviarSolicitud(dto) Then
            lblMensaje.Text = "No fue posible enviar la solicitud."
            lblMensaje.CssClass = "message error"
            Return
        End If

        lblMensaje.Text = "Solicitud enviada correctamente."
        lblMensaje.CssClass = "message ok"
    End Sub

    Private Function ConstruirSolicitud() As SolicitudFormularioDto
        Dim dto As New SolicitudFormularioDto()

        dto.TipoFormulario = ddlTipoFormulario.SelectedValue
        dto.NombreContratante = SanitizarTexto(txtNombreContratante.Text, 120)
        dto.NumeroPoliza = SanitizarTexto(txtNumeroPoliza.Text, 40)
        dto.SumaAsegurada = ParseDecimal(txtSumaAsegurada.Text)

        dto.PrimerApellido = SanitizarTexto(txtPrimerApellido.Text, 60)
        dto.SegundoApellido = SanitizarTexto(txtSegundoApellido.Text, 60)
        dto.PrimerNombre = SanitizarTexto(txtPrimerNombre.Text, 60)
        dto.SegundoNombre = SanitizarTexto(txtSegundoNombre.Text, 60)
        dto.TipoDocumento = ddlTipoDocumento.SelectedValue
        dto.NumeroDocumento = SanitizarTexto(txtNumeroDocumento.Text, 30)
        dto.LugarNacimiento = SanitizarTexto(txtLugarNacimiento.Text, 120)
        dto.Nacionalidad = SanitizarTexto(txtNacionalidad.Text, 80)
        dto.ProfesionOficio = SanitizarTexto(txtProfesionOficio.Text, 120)
        dto.EstaturaMetros = ParseDecimal(txtEstaturaMetros.Text)
        dto.PesoLibras = ParseDecimal(txtPesoLibras.Text)
        dto.CargoDesempena = SanitizarTexto(txtCargoDesempena.Text, 120)
        dto.SueldoMensual = ParseDecimal(txtSueldoMensual.Text)

        dto.Pais = ddlPais.SelectedValue
        dto.Departamento = ddlDepartamento.SelectedValue
        dto.Ciudad = ddlCiudad.SelectedValue
        dto.Municipio = ddlMunicipio.SelectedValue
        dto.Calle = SanitizarTexto(txtCalle.Text, 120)
        dto.Avenida = SanitizarTexto(txtAvenida.Text, 120)
        dto.Celular = SanitizarTexto(txtCelular.Text, 20)
        dto.Email = SanitizarTexto(txtEmail.Text, 120)

        dto.TotalBeneficiariosVida = ParseDecimal(hfTotalVida.Value)
        dto.TotalBeneficiariosContingencia = ParseDecimal(hfTotalCont.Value)
        dto.BeneficiariosVidaJson = SanitizarJson(hfVidaJson.Value)
        dto.BeneficiariosContingenciaJson = SanitizarJson(hfContJson.Value)
        dto.DependientesJson = SanitizarJson(hfDepJson.Value)

        dto.SaludCorta1 = ValorSiNo(ddlSaludCorta1.SelectedValue)
        dto.SaludCorta2 = ValorSiNo(ddlSaludCorta2.SelectedValue)
        dto.SaludCorta3 = ValorSiNo(ddlSaludCorta3.SelectedValue)
        dto.SaludCorta4 = ValorSiNo(ddlSaludCorta4.SelectedValue)
        dto.SaludCortaDetalle = SanitizarTexto(txtSaludCortaDetalle.Text, 1200)

        dto.SaludLargaJson = SanitizarJson(hfSaludLargaJson.Value)

        dto.TomaMedicamentos = ValorSiNo(ddlMedicamentos.SelectedValue)
        dto.MedicamentosJson = SanitizarJson(hfMedicamentosJson.Value)

        dto.AceptaDeclaracion = chkAceptaDeclaracion.Checked
        dto.FirmaSolicitante = SanitizarTexto(txtFirmaSolicitante.Text, 120)
        dto.FirmaPatrono = SanitizarTexto(txtFirmaPatrono.Text, 120)
        dto.FechaFirma = txtFechaFirma.Text.Trim()
        dto.ObservacionesFinales = SanitizarTexto(txtObservacionesFinales.Text, 1000)

        LimpiarBloquesNoAplicables(dto)

        Return dto
    End Function

    Private Sub MostrarPrimerError(errores As List(Of SolicitudValidationError))
        Dim first = errores(0)
        lblMensaje.Text = first.Message
        lblMensaje.CssClass = "message error"

        bltErrores.DataSource = errores.Select(Function(x) x.Message).Distinct().ToList()
        bltErrores.DataBind()
        bltErrores.Visible = True

        Dim serializer As New JavaScriptSerializer()
        Dim fieldIds = errores.Select(Function(x) x.FieldId).Distinct().ToArray()
        Dim serializedFields = serializer.Serialize(fieldIds)
        Dim script = String.Format("goToStepAndFocus({0}, '{1}', {2});", first.StepNumber, first.FieldId, serializedFields)
        ScriptManager.RegisterStartupScript(Me, Me.GetType(), "focus-error", script, True)
    End Sub

    Private Function ParseDecimal(raw As String) As Decimal
        If String.IsNullOrWhiteSpace(raw) Then
            Return 0D
        End If

        Dim value As Decimal
        Dim normalized = raw.Replace(",", ".")

        If Decimal.TryParse(normalized, NumberStyles.Any, CultureInfo.InvariantCulture, value) Then
            Return Decimal.Round(value, 2, MidpointRounding.AwayFromZero)
        End If

        Return 0D
    End Function

    Private Sub LimpiarBloquesNoAplicables(dto As SolicitudFormularioDto)
        If dto.TipoFormulario = "101" Then
            dto.SaludCorta1 = String.Empty
            dto.SaludCorta2 = String.Empty
            dto.SaludCorta3 = String.Empty
            dto.SaludCorta4 = String.Empty
            dto.SaludCortaDetalle = String.Empty
            dto.SaludLargaJson = "[]"
            dto.TomaMedicamentos = String.Empty
            dto.MedicamentosJson = "[]"
        End If

        If dto.TipoFormulario = "61" OrElse dto.TipoFormulario = "62" Then
            dto.SaludLargaJson = "[]"
            dto.TomaMedicamentos = String.Empty
            dto.MedicamentosJson = "[]"
            dto.DependientesJson = "[]"
        End If

        If dto.TipoFormulario <> "101" AndAlso dto.TipoFormulario <> "63" AndAlso dto.TipoFormulario <> "64" Then
            dto.DependientesJson = "[]"
        End If
    End Sub

    Private Function ValorSiNo(raw As String) As String
        If raw = "SI" OrElse raw = "NO" Then
            Return raw
        End If

        Return String.Empty
    End Function

    Private Function SanitizarTexto(raw As String, maxLen As Integer) As String
        If String.IsNullOrWhiteSpace(raw) Then
            Return String.Empty
        End If

        Dim clean = raw.Trim()
        clean = Regex.Replace(clean, "[\u0000-\u001F]", String.Empty)
        clean = clean.Replace("<", String.Empty).Replace(">", String.Empty)

        If clean.Length > maxLen Then
            clean = clean.Substring(0, maxLen)
        End If

        Return clean
    End Function

    Private Function SanitizarJson(raw As String) As String
        If String.IsNullOrWhiteSpace(raw) Then
            Return "[]"
        End If

        Dim clean = raw.Trim()
        If clean.Length > 30000 Then
            Return "[]"
        End If

        Return clean
    End Function
End Class
