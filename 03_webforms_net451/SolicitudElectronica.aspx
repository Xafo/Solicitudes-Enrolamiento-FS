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
                <p>Canal digital - Sprint 2</p>
            </header>

            <ul class="stepper" id="wizardStepper">
                <li class="active" data-step="1">Encabezado</li>
                <li data-step="2">Asegurado</li>
                <li data-step="3">Direccion</li>
                <li data-step="4">Beneficiarios</li>
                <li data-step="5">Salud</li>
                <li data-step="6">Consentimiento</li>
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

            <section class="wizard-step" data-step="4">
                <h2>Beneficiarios y dependientes</h2>

                <div class="card">
                    <h3>Beneficiarios del seguro de vida</h3>
                    <table class="table-grid">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Fecha nacimiento</th>
                                <th>Porcentaje*</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><asp:TextBox ID="txtVidaNombre1" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlVidaParentesco1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaFecha1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaPct1" runat="server" CssClass="input pct-vida" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtVidaNombre2" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlVidaParentesco2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaFecha2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaPct2" runat="server" CssClass="input pct-vida" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtVidaNombre3" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlVidaParentesco3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaFecha3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtVidaPct3" runat="server" CssClass="input pct-vida" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="total">Total Vida: <span id="totalVida">0</span>% <span class="help" title="La suma de porcentajes debe ser exactamente 100%.">?</span></p>
                </div>

                <div class="card">
                    <h3>Beneficiarios de contingencia</h3>
                    <table class="table-grid">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Fecha nacimiento</th>
                                <th>Porcentaje*</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><asp:TextBox ID="txtContNombre1" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlContParentesco1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContFecha1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContPct1" runat="server" CssClass="input pct-cont" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtContNombre2" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlContParentesco2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContFecha2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContPct2" runat="server" CssClass="input pct-cont" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtContNombre3" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlContParentesco3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContFecha3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtContPct3" runat="server" CssClass="input pct-cont" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="total">Total Contingencia: <span id="totalCont">0</span>% <span class="help" title="La suma de porcentajes debe ser exactamente 100%.">?</span></p>
                </div>

                <div class="card" id="cardDependientes">
                    <h3>Dependientes economicos</h3>
                    <table class="table-grid">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                <th>Parentesco</th>
                                <th>Genero</th>
                                <th>Fecha nacimiento</th>
                                <th>Peso (Lbs)</th>
                                <th>Estatura (m)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><asp:TextBox ID="txtDepNombre1" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepParentesco1" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepGenero1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepFecha1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepPeso1" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepEstatura1" runat="server" CssClass="input" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtDepNombre2" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepParentesco2" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepGenero2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepFecha2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepPeso2" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepEstatura2" runat="server" CssClass="input" /></td>
                            </tr>
                            <tr>
                                <td><asp:TextBox ID="txtDepNombre3" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepParentesco3" runat="server" CssClass="input" /></td>
                                <td><asp:DropDownList ID="ddlDepGenero3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepFecha3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepPeso3" runat="server" CssClass="input" /></td>
                                <td><asp:TextBox ID="txtDepEstatura3" runat="server" CssClass="input" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="wizard-step" data-step="5">
                <h2>Declaracion de salud</h2>

                <div class="card" id="saludCortaBlock">
                    <h3>Cuestionario corto (61/62)</h3>
                    <div class="grid one-col">
                        <div class="field"><label>1. Ha sido victima de accidente?</label><asp:DropDownList ID="ddlSaludCorta1" runat="server" CssClass="input" /></div>
                        <div class="field"><label>2. Ha sido sometido a intervencion quirurgica?</label><asp:DropDownList ID="ddlSaludCorta2" runat="server" CssClass="input" /></div>
                        <div class="field"><label>3. Su capacidad de trabajo ha sido reducida?</label><asp:DropDownList ID="ddlSaludCorta3" runat="server" CssClass="input" /></div>
                        <div class="field"><label>4. Usa drogas de prescripcion medica?</label><asp:DropDownList ID="ddlSaludCorta4" runat="server" CssClass="input" /></div>
                        <div class="field"><label>Detalle respuestas afirmativas</label><asp:TextBox ID="txtSaludCortaDetalle" runat="server" CssClass="input" TextMode="MultiLine" Rows="3" /></div>
                    </div>
                </div>

                <div class="card" id="saludLargaBlock">
                    <h3>Cuestionario largo (63/64)</h3>
                    <div class="grid one-col">
                        <div class="field"><label>1. Enfermedades o trastornos previos</label><asp:DropDownList ID="ddlSaludLarga1" runat="server" CssClass="input" /></div>
                        <div class="field"><label>2. Intervenciones o accidentes graves</label><asp:DropDownList ID="ddlSaludLarga2" runat="server" CssClass="input" /></div>
                        <div class="field"><label>3. Tratamiento por otro medico</label><asp:DropDownList ID="ddlSaludLarga3" runat="server" CssClass="input" /></div>
                        <div class="field"><label>4. Preguntas de salud femenina</label><asp:DropDownList ID="ddlSaludLarga4" runat="server" CssClass="input" /></div>
                        <div class="field"><label>5. Antecedentes Covid-19</label><asp:DropDownList ID="ddlSaludLarga5" runat="server" CssClass="input" /></div>
                        <div class="field"><label>Detalle respuestas afirmativas <span class="help" title="Si responde Si en salud, debe completar detalle.">?</span></label><asp:TextBox ID="txtSaludLargaDetalle" runat="server" CssClass="input" TextMode="MultiLine" Rows="4" /></div>
                        <div class="field"><label>Esta tomando medicamentos en la actualidad?</label><asp:DropDownList ID="ddlMedicamentos" runat="server" CssClass="input" /></div>
                        <div class="field"><label>Detalle de medicamentos <span class="help" title="Si indica que toma medicamentos, debe agregar detalle.">?</span></label><asp:TextBox ID="txtMedicamentosDetalle" runat="server" CssClass="input" TextMode="MultiLine" Rows="3" /></div>
                    </div>
                </div>
            </section>

            <section class="wizard-step" data-step="6">
                <h2>Consentimiento y firma</h2>

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
                            <label for="txtFirmaPatrono">Firma y sello patrono/contratante (nombre completo) <span class="required">*</span></label>
                            <asp:TextBox ID="txtFirmaPatrono" runat="server" CssClass="input" MaxLength="120" />
                        </div>
                        <div class="field">
                            <label for="txtFechaFirma">Fecha de firma <span class="required">*</span></label>
                            <asp:TextBox ID="txtFechaFirma" runat="server" CssClass="input" MaxLength="10" placeholder="dd/mm/aaaa" />
                        </div>
                        <div class="field">
                            <label for="txtObservacionesFinales">Observaciones</label>
                            <asp:TextBox ID="txtObservacionesFinales" runat="server" CssClass="input" TextMode="MultiLine" Rows="3" />
                        </div>
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
