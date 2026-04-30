<%@ Page Language="VB" AutoEventWireup="false" CodeFile="SolicitudElectronica.aspx.vb" Inherits="SolicitudElectronica" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Solicitud electronica</title>
    <link rel="stylesheet" href="Styles/solicitud.css" />
    <script src="Scripts/solicitud.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />

        <main class="container">
            <header class="header">
                <h1>Solicitud electronica</h1>
                <p>Canal digital - Sprint 1</p>
            </header>

            <ul class="stepper" id="wizardStepper">
                <li class="active" data-step="1">Encabezado</li>
                <li data-step="2">Asegurado</li>
                <li data-step="3">Direccion</li>
            </ul>

            <asp:Label ID="lblMensaje" runat="server" CssClass="message" EnableViewState="false" />

            <section class="wizard-step active" data-step="1">
                <h2>Datos de encabezado</h2>

                <div class="grid two-col">
                    <div class="field">
                        <label for="ddlTipoFormulario">Tipo de formulario <span class="required">*</span></label>
                        <asp:DropDownList ID="ddlTipoFormulario" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="txtNombreContratante">Nombre del contratante <span class="required">*</span></label>
                        <asp:TextBox ID="txtNombreContratante" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtNumeroPoliza">No. de poliza <span class="required">*</span></label>
                        <asp:TextBox ID="txtNumeroPoliza" runat="server" CssClass="input" MaxLength="40" />
                    </div>
                    <div class="field">
                        <label for="txtSumaAsegurada">Suma asegurada <span class="required">*</span></label>
                        <asp:TextBox ID="txtSumaAsegurada" runat="server" CssClass="input" MaxLength="18" />
                    </div>
                </div>
            </section>

            <section class="wizard-step" data-step="2">
                <h2>Datos generales del asegurado</h2>

                <div class="grid two-col">
                    <div class="field">
                        <label for="txtPrimerApellido">Primer apellido <span class="required">*</span></label>
                        <asp:TextBox ID="txtPrimerApellido" runat="server" CssClass="input" MaxLength="60" />
                    </div>
                    <div class="field">
                        <label for="txtSegundoApellido">Segundo apellido</label>
                        <asp:TextBox ID="txtSegundoApellido" runat="server" CssClass="input" MaxLength="60" />
                    </div>
                    <div class="field">
                        <label for="txtPrimerNombre">Primer nombre <span class="required">*</span></label>
                        <asp:TextBox ID="txtPrimerNombre" runat="server" CssClass="input" MaxLength="60" />
                    </div>
                    <div class="field">
                        <label for="txtSegundoNombre">Segundo nombre</label>
                        <asp:TextBox ID="txtSegundoNombre" runat="server" CssClass="input" MaxLength="60" />
                    </div>
                    <div class="field">
                        <label for="ddlTipoDocumento">Tipo documento <span class="required">*</span><span class="help" title="Seleccione el tipo de documento antes de ingresar el numero.">?</span></label>
                        <asp:DropDownList ID="ddlTipoDocumento" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="txtNumeroDocumento">No. identificacion <span class="required">*</span><span class="help" title="El formato cambia segun tipo de documento (DNI/Carnet/Pasaporte).">?</span></label>
                        <asp:TextBox ID="txtNumeroDocumento" runat="server" CssClass="input" MaxLength="30" />
                    </div>
                    <div class="field">
                        <label for="txtLugarNacimiento">Lugar de nacimiento <span class="required">*</span></label>
                        <asp:TextBox ID="txtLugarNacimiento" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtNacionalidad">Nacionalidad <span class="required">*</span></label>
                        <asp:TextBox ID="txtNacionalidad" runat="server" CssClass="input" MaxLength="80" />
                    </div>
                    <div class="field">
                        <label for="txtProfesionOficio">Profesion u oficio <span class="required">*</span></label>
                        <asp:TextBox ID="txtProfesionOficio" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtEstaturaMetros">Estatura en metros <span class="required">*</span></label>
                        <asp:TextBox ID="txtEstaturaMetros" runat="server" CssClass="input" MaxLength="10" />
                    </div>
                    <div class="field">
                        <label for="txtPesoLibras">Peso en libras <span class="required">*</span></label>
                        <asp:TextBox ID="txtPesoLibras" runat="server" CssClass="input" MaxLength="10" />
                    </div>
                    <div class="field">
                        <label for="txtCargoDesempena">Cargo que desempena <span class="required">*</span></label>
                        <asp:TextBox ID="txtCargoDesempena" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtSueldoMensual">Sueldo mensual <span class="required">*</span></label>
                        <asp:TextBox ID="txtSueldoMensual" runat="server" CssClass="input" MaxLength="18" />
                    </div>
                </div>
            </section>

            <section class="wizard-step" data-step="3">
                <h2>Direccion del asegurado</h2>

                <div class="grid two-col">
                    <div class="field">
                        <label for="ddlPais">Pais <span class="required">*</span></label>
                        <asp:DropDownList ID="ddlPais" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="ddlDepartamento">Departamento <span class="required">*</span></label>
                        <asp:DropDownList ID="ddlDepartamento" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="ddlCiudad">Ciudad <span class="required">*</span><span class="help" title="Mantener campo separado de municipio.">?</span></label>
                        <asp:DropDownList ID="ddlCiudad" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="ddlMunicipio">Municipio <span class="required">*</span><span class="help" title="Mantener campo separado de ciudad.">?</span></label>
                        <asp:DropDownList ID="ddlMunicipio" runat="server" CssClass="input" />
                    </div>
                    <div class="field">
                        <label for="txtCalle">Calle <span class="help" title="Mantener campo separado de avenida.">?</span></label>
                        <asp:TextBox ID="txtCalle" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtAvenida">Avenida <span class="help" title="Mantener campo separado de calle.">?</span></label>
                        <asp:TextBox ID="txtAvenida" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtCelular">Celular <span class="required">*</span></label>
                        <asp:TextBox ID="txtCelular" runat="server" CssClass="input" MaxLength="20" />
                    </div>
                    <div class="field">
                        <label for="txtEmail">E-mail</label>
                        <asp:TextBox ID="txtEmail" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                </div>
            </section>

            <section class="wizard-nav">
                <button type="button" id="btnPrev" class="btn light" disabled="disabled">Anterior</button>
                <button type="button" id="btnNext" class="btn primary">Siguiente</button>
            </section>

            <section class="actions">
                <asp:Button ID="btnGuardar" runat="server" CssClass="btn light" Text="Guardar borrador" />
                <asp:Button ID="btnEnviar" runat="server" CssClass="btn primary" Text="Enviar" />
            </section>
        </main>
    </form>
</body>
</html>
