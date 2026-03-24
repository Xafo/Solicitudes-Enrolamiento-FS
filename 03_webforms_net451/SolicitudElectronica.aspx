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
                <p>Canal digital - validaciones finales</p>
            </header>

            <ul class="stepper" id="wizardStepper">
                <li class="active step-tab" data-step="1" tabindex="0">Encabezado</li>
                <li class="step-tab" data-step="2" tabindex="0">Asegurado</li>
                <li class="step-tab" data-step="3" tabindex="0">Direccion</li>
                <li class="step-tab" data-step="4" tabindex="0">Beneficiarios</li>
                <li class="step-tab" data-step="5" tabindex="0">Salud</li>
                <li class="step-tab" data-step="6" tabindex="0">Consentimiento</li>
            </ul>

            <asp:Label ID="lblMensaje" runat="server" CssClass="message" EnableViewState="false" />
            <asp:BulletedList ID="bltErrores" runat="server" CssClass="error-list" Visible="false" />

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
                        <asp:TextBox ID="txtEstaturaMetros" runat="server" CssClass="input decimal" MaxLength="10" />
                    </div>
                    <div class="field">
                        <label for="txtPesoLibras">Peso en libras <span class="required">*</span></label>
                        <asp:TextBox ID="txtPesoLibras" runat="server" CssClass="input decimal" MaxLength="10" />
                    </div>
                    <div class="field">
                        <label for="txtCargoDesempena">Cargo que desempena <span class="required">*</span></label>
                        <asp:TextBox ID="txtCargoDesempena" runat="server" CssClass="input" MaxLength="120" />
                    </div>
                    <div class="field">
                        <label for="txtSueldoMensual">Sueldo mensual <span class="required">*</span></label>
                        <asp:TextBox ID="txtSueldoMensual" runat="server" CssClass="input decimal" MaxLength="18" />
                    </div>
                    <div class="field">
                        <label for="txtCelularMfa">Celular principal para MFA <span class="required">*</span></label>
                        <asp:TextBox ID="txtCelularMfa" runat="server" CssClass="input" MaxLength="20" />
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

            <section class="wizard-step" data-step="4">
                <h2>Beneficiarios y dependientes</h2>

                <div class="card">
                    <h3>Beneficiarios del seguro de vida</h3>
                    <div class="table-wrap">
                    <table class="table-grid">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Fecha nacimiento</th>
                                <th>Porcentaje*</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="bodyVida"></tbody>
                    </table>
                    </div>
                    <div class="row-actions">
                        <button type="button" id="btnAddVida" class="btn light small">Agregar beneficiario vida</button>
                    </div>
                    <p class="total">Total Vida: <span id="totalVida">0</span>% <span class="help" title="La suma de porcentajes debe ser exactamente 100%.">?</span></p>
                </div>

                <div class="card">
                    <h3>Beneficiarios de contingencia</h3>
                    <div class="table-wrap">
                    <table class="table-grid">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Fecha nacimiento</th>
                                <th>Porcentaje*</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="bodyCont"></tbody>
                    </table>
                    </div>
                    <div class="row-actions">
                        <button type="button" id="btnAddCont" class="btn light small">Agregar beneficiario contingencia</button>
                    </div>
                    <p class="total">Total Contingencia: <span id="totalCont">0</span>% <span class="help" title="La suma de porcentajes debe ser exactamente 100%.">?</span></p>
                </div>

                <div class="card" id="cardDependientes">
                    <h3>Dependientes economicos</h3>
                    <div class="table-wrap">
                    <table class="table-grid table-dependientes">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Genero</th>
                                <th>Fecha nacimiento</th>
                                <th>Peso (Lbs)</th>
                                <th>Estatura (m)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="bodyDep"></tbody>
                    </table>
                    </div>
                    <div class="row-actions">
                        <button type="button" id="btnAddDep" class="btn light small">Agregar dependiente</button>
                    </div>
                </div>
            </section>

            <section class="wizard-step" data-step="5">
                <h2>Declaracion de salud</h2>

                <div class="card" id="saludCortaBlock">
                    <h3>Cuestionario corto (61/62)</h3>
                    <div class="grid one-col">
                        <div id="saludCortaPreguntas"></div>
                    </div>
                </div>

                <div class="card" id="saludLargaBlock">
                    <h3>Cuestionario largo (63/64)</h3>
                    <div class="grid one-col">
                        <div id="saludLargaPreguntas"></div>
                        <div class="field"><label>Esta tomando medicamentos en la actualidad?</label><asp:DropDownList ID="ddlMedicamentos" runat="server" CssClass="input" /></div>
                        <div class="card" id="medicamentosBlock">
                            <label>Detalle de medicamentos</label>
                            <div class="table-wrap">
                                <table class="table-grid table-medicamentos">
                                    <thead>
                                        <tr>
                                            <th>Nombre del asegurado</th>
                                            <th>Diagnostico</th>
                                            <th>Nombre del medicamento</th>
                                            <th>Dosis</th>
                                            <th>Desde</th>
                                            <th>Hasta</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyMed"></tbody>
                                </table>
                            </div>
                            <div class="row-actions">
                                <button type="button" id="btnAddMed" class="btn light small">Agregar medicamento</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="wizard-step" data-step="6">
                <h2>Consentimiento y firma electronica</h2>

                <div class="card">
                    <div class="field">
                        <label for="chkAceptaDeclaracion">Acepto la declaracion legal <span class="required">*</span></label>
                        <asp:CheckBox ID="chkAceptaDeclaracion" runat="server" />
                    </div>

                    <div class="grid two-col">
                        <div class="field">
                            <label for="txtFirmaSolicitante">Firma solicitante (nombre completo) <span class="required">*</span></label>
                            <asp:TextBox ID="txtFirmaSolicitante" runat="server" CssClass="input" MaxLength="120" />
                        </div>
                        <div class="field">
                            <label for="txtFechaFirma">Fecha de firma <span class="required">*</span></label>
                            <asp:TextBox ID="txtFechaFirma" runat="server" CssClass="input no-manual-date" TextMode="Date" />
                        </div>
                        <div class="field">
                            <label for="txtObservacionesFinales">Observaciones</label>
                            <asp:TextBox ID="txtObservacionesFinales" runat="server" CssClass="input" TextMode="MultiLine" Rows="3" />
                        </div>
                    </div>

                    <div class="card mfa-card">
                        <h3>Validacion MFA para firma electronica <span class="help" title="La validacion MFA realizada en este proceso funcionara como firma digital/electronica de conformidad con la normativa aplicable en Honduras.">?</span></h3>
                        <p class="mfa-channels">Canales: <asp:Literal ID="litMfaChannels" runat="server" /></p>
                        <div class="grid two-col">
                            <div class="field">
                                <label for="txtOtpCodigo">Codigo OTP <span class="required">*</span></label>
                                <asp:TextBox ID="txtOtpCodigo" runat="server" CssClass="input" MaxLength="6" />
                            </div>
                            <div class="field">
                                <label>Estado MFA</label>
                                <asp:Label ID="lblMfaStatus" runat="server" CssClass="message" />
                            </div>
                        </div>
                        <div class="actions">
                            <asp:Button ID="btnEnviarOtp" runat="server" CssClass="btn light" Text="Enviar OTP" />
                            <asp:Button ID="btnValidarOtp" runat="server" CssClass="btn primary" Text="Validar OTP" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="wizard-nav">
                <button type="button" id="btnPrev" class="btn light" disabled="disabled">Anterior</button>
                <button type="button" id="btnNext" class="btn primary">Siguiente</button>
            </section>

            <section class="actions">
                <asp:Button ID="btnEnviar" runat="server" CssClass="btn primary" Text="Enviar" />
            </section>

            <asp:HiddenField ID="hfVidaJson" runat="server" />
            <asp:HiddenField ID="hfContJson" runat="server" />
            <asp:HiddenField ID="hfDepJson" runat="server" />
            <asp:HiddenField ID="hfTotalVida" runat="server" />
            <asp:HiddenField ID="hfTotalCont" runat="server" />
            <asp:HiddenField ID="hfSaludLargaJson" runat="server" />
            <asp:HiddenField ID="hfMedicamentosJson" runat="server" />
            <asp:HiddenField ID="hfSaludCortaJson" runat="server" />
            <asp:HiddenField ID="hfMfaValidado" runat="server" Value="N" />
            <asp:HiddenField ID="hfMfaTxnId" runat="server" />
        </main>
    </form>
</body>
</html>
