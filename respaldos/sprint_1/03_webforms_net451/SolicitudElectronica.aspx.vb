Imports System
Imports System.Collections.Generic
Imports System.Globalization

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
        CargarLista(ddlPais, _catalogos.ObtenerPaises())
        CargarLista(ddlDepartamento, _catalogos.ObtenerDepartamentos())
        CargarLista(ddlCiudad, _catalogos.ObtenerCiudades())
        CargarLista(ddlMunicipio, _catalogos.ObtenerMunicipios())
    End Sub

    Private Sub CargarLista(control As WebControls.DropDownList, data As List(Of ListItemDto))
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

        If errores.Count > 0 Then
            lblMensaje.Text = String.Join(" ", errores.ToArray())
            lblMensaje.CssClass = "message error"
            Return
        End If

        lblMensaje.Text = "Validacion Sprint 1 completada. Listo para Sprint 2."
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

        Return dto
    End Function

    Private Function ParseDecimal(raw As String) As Decimal
        Dim value As Decimal
        Dim normalized = raw.Replace(",", ".")

        If Decimal.TryParse(normalized, NumberStyles.Any, CultureInfo.InvariantCulture, value) Then
            Return value
        End If

        Return 0D
    End Sub
End Class
