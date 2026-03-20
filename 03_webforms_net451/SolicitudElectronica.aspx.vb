Imports System
Imports System.Collections.Generic
Imports System.Globalization
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
        CargarLista(ddlVidaParentesco1, _catalogos.ObtenerParentescos())
        CargarLista(ddlVidaParentesco2, _catalogos.ObtenerParentescos())
        CargarLista(ddlVidaParentesco3, _catalogos.ObtenerParentescos())
        CargarLista(ddlContParentesco1, _catalogos.ObtenerParentescos())
        CargarLista(ddlContParentesco2, _catalogos.ObtenerParentescos())
        CargarLista(ddlContParentesco3, _catalogos.ObtenerParentescos())
        CargarLista(ddlDepParentesco1, _catalogos.ObtenerParentescos())
        CargarLista(ddlDepParentesco2, _catalogos.ObtenerParentescos())
        CargarLista(ddlDepParentesco3, _catalogos.ObtenerParentescos())
        CargarLista(ddlDepGenero1, _catalogos.ObtenerGeneros())
        CargarLista(ddlDepGenero2, _catalogos.ObtenerGeneros())
        CargarLista(ddlDepGenero3, _catalogos.ObtenerGeneros())
        CargarLista(ddlSaludCorta1, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta2, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta3, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludCorta4, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludLarga1, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludLarga2, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludLarga3, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludLarga4, _catalogos.ObtenerSiNo())
        CargarLista(ddlSaludLarga5, _catalogos.ObtenerSiNo())
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

    Protected Sub btnGuardar_Click(sender As Object, e As EventArgs) Handles btnGuardar.Click
        Dim dto = ConstruirSolicitud()

        If Not _repositorio.GuardarBorrador(dto) Then
            lblMensaje.Text = "No fue posible guardar el borrador."
            lblMensaje.CssClass = "message error"
            Return
        End If

        lblMensaje.Text = "Borrador guardado correctamente."
        lblMensaje.CssClass = "message ok"
    End Sub

    Protected Sub btnEnviar_Click(sender As Object, e As EventArgs) Handles btnEnviar.Click
        Dim dto = ConstruirSolicitud()
        Dim errores As List(Of String) = _validacion.ValidarSprint1(dto)
        errores.AddRange(_validacion.ValidarSprint2(dto))
        errores.AddRange(_validacion.ValidarSprint3(dto))

        If errores.Count > 0 Then
            lblMensaje.Text = String.Join(" ", errores.ToArray())
            lblMensaje.CssClass = "message error"
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
        dto.NombreContratante = txtNombreContratante.Text.Trim()
        dto.NumeroPoliza = txtNumeroPoliza.Text.Trim()
        dto.SumaAsegurada = ParseDecimal(txtSumaAsegurada.Text)

        dto.PrimerApellido = txtPrimerApellido.Text.Trim()
        dto.SegundoApellido = txtSegundoApellido.Text.Trim()
        dto.PrimerNombre = txtPrimerNombre.Text.Trim()
        dto.SegundoNombre = txtSegundoNombre.Text.Trim()
        dto.TipoDocumento = ddlTipoDocumento.SelectedValue
        dto.NumeroDocumento = txtNumeroDocumento.Text.Trim()
        dto.LugarNacimiento = txtLugarNacimiento.Text.Trim()
        dto.Nacionalidad = txtNacionalidad.Text.Trim()
        dto.ProfesionOficio = txtProfesionOficio.Text.Trim()
        dto.EstaturaMetros = ParseDecimal(txtEstaturaMetros.Text)
        dto.PesoLibras = ParseDecimal(txtPesoLibras.Text)
        dto.CargoDesempena = txtCargoDesempena.Text.Trim()
        dto.SueldoMensual = ParseDecimal(txtSueldoMensual.Text)

        dto.Pais = ddlPais.SelectedValue
        dto.Departamento = ddlDepartamento.SelectedValue
        dto.Ciudad = ddlCiudad.SelectedValue
        dto.Municipio = ddlMunicipio.SelectedValue
        dto.Calle = txtCalle.Text.Trim()
        dto.Avenida = txtAvenida.Text.Trim()
        dto.Celular = txtCelular.Text.Trim()
        dto.Email = txtEmail.Text.Trim()

        dto.TotalBeneficiariosVida = ParseDecimal(txtVidaPct1.Text) + ParseDecimal(txtVidaPct2.Text) + ParseDecimal(txtVidaPct3.Text)
        dto.TotalBeneficiariosContingencia = ParseDecimal(txtContPct1.Text) + ParseDecimal(txtContPct2.Text) + ParseDecimal(txtContPct3.Text)

        dto.DependienteGenero1 = ddlDepGenero1.SelectedValue
        dto.DependienteGenero2 = ddlDepGenero2.SelectedValue
        dto.DependienteGenero3 = ddlDepGenero3.SelectedValue
        dto.DependienteNombre1 = txtDepNombre1.Text.Trim()
        dto.DependienteNombre2 = txtDepNombre2.Text.Trim()
        dto.DependienteNombre3 = txtDepNombre3.Text.Trim()

        dto.SaludCorta1 = ddlSaludCorta1.SelectedValue
        dto.SaludCorta2 = ddlSaludCorta2.SelectedValue
        dto.SaludCorta3 = ddlSaludCorta3.SelectedValue
        dto.SaludCorta4 = ddlSaludCorta4.SelectedValue
        dto.SaludCortaDetalle = txtSaludCortaDetalle.Text.Trim()

        dto.SaludLarga1 = ddlSaludLarga1.SelectedValue
        dto.SaludLarga2 = ddlSaludLarga2.SelectedValue
        dto.SaludLarga3 = ddlSaludLarga3.SelectedValue
        dto.SaludLarga4 = ddlSaludLarga4.SelectedValue
        dto.SaludLarga5 = ddlSaludLarga5.SelectedValue
        dto.SaludLargaDetalle = txtSaludLargaDetalle.Text.Trim()

        dto.TomaMedicamentos = ddlMedicamentos.SelectedValue
        dto.MedicamentosDetalle = txtMedicamentosDetalle.Text.Trim()

        dto.AceptaDeclaracion = chkAceptaDeclaracion.Checked
        dto.FirmaSolicitante = txtFirmaSolicitante.Text.Trim()
        dto.FirmaPatrono = txtFirmaPatrono.Text.Trim()
        dto.FechaFirma = txtFechaFirma.Text.Trim()
        dto.ObservacionesFinales = txtObservacionesFinales.Text.Trim()

        Return dto
    End Function

    Private Function ParseDecimal(raw As String) As Decimal
        Dim value As Decimal
        Dim normalized = raw.Replace(",", ".")

        If Decimal.TryParse(normalized, NumberStyles.Any, CultureInfo.InvariantCulture, value) Then
            Return value
        End If

        Return 0D
    End Function
End Class
