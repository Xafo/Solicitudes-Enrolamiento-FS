function initSolicitudElectronica() {
    var steps = Array.from(document.querySelectorAll(".wizard-step"));
    var tabs = Array.from(document.querySelectorAll("#wizardStepper li"));
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
    var ddlFormulario = document.getElementById("ddlTipoFormulario");
    var saludStep = document.querySelector('.wizard-step[data-step="5"]');
    var saludTab = document.querySelector('#wizardStepper li[data-step="5"]');
    var saludCorta = document.getElementById("saludCortaBlock");
    var saludLarga = document.getElementById("saludLargaBlock");
    var cardDependientes = document.getElementById("cardDependientes");
    var ddlMedicamentos = document.getElementById("ddlMedicamentos");
    var medicamentosBlock = document.getElementById("medicamentosBlock");
    var bodyMed = document.getElementById("bodyMed");
    var bodyVida = document.getElementById("bodyVida");
    var bodyCont = document.getElementById("bodyCont");
    var bodyDep = document.getElementById("bodyDep");
    var saludLargaPreguntas = document.getElementById("saludLargaPreguntas");
    var current = 1;

    var parentescos = ["Conyuge", "Hijo", "Padre", "Madre", "Hermano"];
    var generos = ["M", "F"];

    var longQuestions = [
        { id: "q1a", text: "1.a Ha padecido enfermedades del corazon?" },
        { id: "q1b", text: "1.b Ha padecido hipertension arterial o circulatoria?" },
        { id: "q1c", text: "1.c Ha padecido diabetes o problemas endocrinos?" },
        { id: "q1d", text: "1.d Ha padecido enfermedades respiratorias cronicas?" },
        { id: "q1e", text: "1.e Ha padecido trastornos neurologicos?" },
        { id: "q1f", text: "1.f Ha padecido enfermedades renales o urinarias?" },
        { id: "q1g", text: "1.g Ha padecido enfermedades digestivas cronicas?" },
        { id: "q1h", text: "1.h Ha padecido enfermedades autoinmunes?" },
        { id: "q1i", text: "1.i Ha padecido cancer o tumores?" },
        { id: "q1j", text: "1.j Ha padecido enfermedades de la sangre?" },
        { id: "q1k", text: "1.k Ha padecido trastornos musculoesqueleticos graves?" },
        { id: "q1l", text: "1.l Ha padecido otra enfermedad relevante?" },
        { id: "q2a", text: "2.a Ha sido hospitalizado en los ultimos 5 anos?" },
        { id: "q2b", text: "2.b Se ha sometido a cirugias en los ultimos 5 anos?" },
        { id: "q3", text: "3. Esta actualmente bajo evaluacion medica?" },
        { id: "q4a", text: "4.a (Mujer) Esta embarazada actualmente?" },
        { id: "q4b", text: "4.b (Mujer) Tiene complicaciones ginecologicas?" },
        { id: "q4c", text: "4.c (Mujer) Ha tenido parto o aborto reciente?" },
        { id: "q4d", text: "4.d (Mujer) Tiene tratamiento hormonal actual?" },
        { id: "q5", text: "5. Ha tenido diagnostico positivo o secuelas por COVID-19?" }
    ];

    function bySuffix(suffix) {
        return document.querySelector('[id$="' + suffix + '"]');
    }

    var hfVidaJson = bySuffix("hfVidaJson");
    var hfContJson = bySuffix("hfContJson");
    var hfDepJson = bySuffix("hfDepJson");
    var hfTotalVida = bySuffix("hfTotalVida");
    var hfTotalCont = bySuffix("hfTotalCont");
    var hfSaludLargaJson = bySuffix("hfSaludLargaJson");
    var hfMedicamentosJson = bySuffix("hfMedicamentosJson");

    function inArray(arr, value) {
        return Array.isArray(arr) && arr.indexOf(value) >= 0;
    }

    function findBy(list, predicate) {
        if (!Array.isArray(list)) {
            return null;
        }
        for (var i = 0; i < list.length; i += 1) {
            if (predicate(list[i])) {
                return list[i];
            }
        }
        return null;
    }

    function hasAnyValue(obj) {
        if (!obj) {
            return false;
        }
        for (var k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                var v = obj[k];
                if ((v || "").toString().trim() !== "") {
                    return true;
                }
            }
        }
        return false;
    }

    function createOptions(options, selected) {
        var html = '<option value="">Seleccione...</option>';
        options.forEach(function (item) {
            var isSelected = item === selected ? ' selected="selected"' : "";
            html += '<option value="' + item + '"' + isSelected + '>' + item + '</option>';
        });
        return html;
    }

    function createSiNoOptions(selected) {
        return '<option value="">Seleccione...</option>' +
            '<option value="SI"' + (selected === "SI" ? ' selected="selected"' : "") + '>Si</option>' +
            '<option value="NO"' + (selected === "NO" ? ' selected="selected"' : "") + '>No</option>';
    }

    function createVidaRow(data) {
        return '<tr class="row-vida">' +
            '<td><input class="input vida-nombre" type="text" maxlength="120" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input vida-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><input class="input vida-fecha no-manual-date" type="date" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input pct-vida decimal" type="text" inputmode="decimal" value="' + (data.porcentaje || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createContRow(data) {
        return '<tr class="row-cont">' +
            '<td><input class="input cont-nombre" type="text" maxlength="120" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input cont-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><input class="input cont-fecha no-manual-date" type="date" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input pct-cont decimal" type="text" inputmode="decimal" value="' + (data.porcentaje || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createDepRow(data) {
        return '<tr class="row-dep">' +
            '<td><input class="input dep-nombre" type="text" maxlength="120" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input dep-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><select class="input dep-genero">' + createOptions(generos, data.genero || "") + '</select></td>' +
            '<td><input class="input dep-fecha no-manual-date" type="date" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input dep-peso decimal" type="text" inputmode="decimal" value="' + (data.peso || "") + '" /></td>' +
            '<td><input class="input dep-estatura decimal" type="text" inputmode="decimal" value="' + (data.estatura || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createMedRow(data) {
        return '<tr class="row-med">' +
            '<td><input class="input med-asegurado" type="text" maxlength="120" value="' + (data.asegurado || "") + '" /></td>' +
            '<td><input class="input med-diagnostico" type="text" maxlength="120" value="' + (data.diagnostico || "") + '" /></td>' +
            '<td><input class="input med-medicamento" type="text" maxlength="120" value="' + (data.medicamento || "") + '" /></td>' +
            '<td><input class="input med-dosis" type="text" maxlength="80" value="' + (data.dosis || "") + '" /></td>' +
            '<td><input class="input med-desde no-manual-date" type="date" value="' + (data.desde || "") + '" /></td>' +
            '<td><input class="input med-hasta no-manual-date" type="date" value="' + (data.hasta || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createQuestionCard(question, data) {
        var answer = (data && data.answer) || "";
        var showDetail = answer === "SI";
        return '<div class="question-card" data-question-id="' + question.id + '">' +
            '<div class="field"><label>' + question.text + '</label>' +
            '<select class="input q-answer">' + createSiNoOptions(answer) + '</select></div>' +
            '<div class="question-detail' + (showDetail ? '' : ' is-hidden') + '">' +
            '<div class="grid two-col">' +
            '<div class="field"><label>Especifique enfermedad</label><input class="input q-enfermedad" type="text" maxlength="200" value="' + ((data && data.enfermedad) || '') + '" /></div>' +
            '<div class="field"><label>Nombre y direccion del medico tratante</label><input class="input q-medico" type="text" maxlength="200" value="' + ((data && data.medico) || '') + '" /></div>' +
            '<div class="field"><label>Cuando?, duracion, secuela?</label><input class="input q-cuando" type="text" maxlength="200" value="' + ((data && data.cuando) || '') + '" /></div>' +
            '<div class="field"><label>Paciente/asegurado</label><input class="input q-paciente" type="text" maxlength="120" value="' + ((data && data.paciente) || '') + '" /></div>' +
            '</div></div></div>';
    }

    function normalizeDecimal(raw) {
        if (!raw) {
            return "";
        }
        var cleaned = raw.toString().replace(/,/g, ".").replace(/[^0-9.\-]/g, "");
        var parsed = Number(cleaned);
        if (Number.isNaN(parsed)) {
            return "";
        }
        return parsed.toFixed(2);
    }

    function sumByClass(className) {
        var total = 0;
        document.querySelectorAll("." + className).forEach(function (input) {
            var raw = (input.value || "0").replace(",", ".");
            var num = Number(raw);
            if (!Number.isNaN(num)) {
                total += num;
            }
        });
        return total;
    }

    function paintTotals() {
        var vida = sumByClass("pct-vida");
        var cont = sumByClass("pct-cont");
        var totalVida = document.getElementById("totalVida");
        var totalCont = document.getElementById("totalCont");
        if (totalVida) totalVida.innerText = vida.toFixed(2);
        if (totalCont) totalCont.innerText = cont.toFixed(2);
        if (hfTotalVida) hfTotalVida.value = vida.toFixed(2);
        if (hfTotalCont) hfTotalCont.value = cont.toFixed(2);
    }

    function readRows(selector, mapper) {
        return Array.from(document.querySelectorAll(selector)).map(mapper).filter(function (row) {
            return hasAnyValue(row);
        });
    }

    function isFormWithDependientes(tipo) {
        return tipo === "101" || tipo === "63" || tipo === "64";
    }

    function isLongHealthForm(tipo) {
        return tipo === "63" || tipo === "64";
    }

    function clearControl(suffix) {
        var control = bySuffix(suffix);
        if (!control) {
            return;
        }
        if (control.tagName === "SELECT") {
            control.value = "";
        } else if (control.type === "checkbox") {
            control.checked = false;
        } else {
            control.value = "";
        }
    }

    function clearHiddenSections(tipo) {
        if (tipo === "101") {
            ["ddlSaludCorta1", "ddlSaludCorta2", "ddlSaludCorta3", "ddlSaludCorta4", "txtSaludCortaDetalle", "ddlMedicamentos"].forEach(clearControl);
            if (hfSaludLargaJson) hfSaludLargaJson.value = "[]";
            if (hfMedicamentosJson) hfMedicamentosJson.value = "[]";
        }

        if (tipo === "61" || tipo === "62") {
            ["ddlMedicamentos"].forEach(clearControl);
            if (hfSaludLargaJson) hfSaludLargaJson.value = "[]";
            if (hfMedicamentosJson) hfMedicamentosJson.value = "[]";
            if (hfDepJson) hfDepJson.value = "[]";
        }

        if (!isFormWithDependientes(tipo) && hfDepJson) {
            hfDepJson.value = "[]";
        }

        if (!isLongHealthForm(tipo)) {
            if (hfSaludLargaJson) hfSaludLargaJson.value = "[]";
            if (hfMedicamentosJson) hfMedicamentosJson.value = "[]";
        }
    }

    function serializeDynamicData() {
        var tipo = ddlFormulario ? ddlFormulario.value : "";

        var vida = readRows("#bodyVida tr", function (row) {
            return {
                nombre: row.querySelector(".vida-nombre").value.trim(),
                parentesco: row.querySelector(".vida-parentesco").value,
                fecha: row.querySelector(".vida-fecha").value.trim(),
                porcentaje: normalizeDecimal(row.querySelector(".pct-vida").value.trim())
            };
        });

        var cont = readRows("#bodyCont tr", function (row) {
            return {
                nombre: row.querySelector(".cont-nombre").value.trim(),
                parentesco: row.querySelector(".cont-parentesco").value,
                fecha: row.querySelector(".cont-fecha").value.trim(),
                porcentaje: normalizeDecimal(row.querySelector(".pct-cont").value.trim())
            };
        });

        var dep = [];
        if (isFormWithDependientes(tipo)) {
            dep = readRows("#bodyDep tr", function (row) {
                return {
                    nombre: row.querySelector(".dep-nombre").value.trim(),
                    parentesco: row.querySelector(".dep-parentesco").value,
                    genero: row.querySelector(".dep-genero").value,
                    fecha: row.querySelector(".dep-fecha").value.trim(),
                    peso: normalizeDecimal(row.querySelector(".dep-peso").value.trim()),
                    estatura: normalizeDecimal(row.querySelector(".dep-estatura").value.trim())
                };
            });
        }

        var saludLarga = [];
        if (isLongHealthForm(tipo)) {
            saludLarga = Array.from(document.querySelectorAll(".question-card")).map(function (card) {
                return {
                    id: card.getAttribute("data-question-id"),
                    answer: card.querySelector(".q-answer").value,
                    enfermedad: card.querySelector(".q-enfermedad").value.trim(),
                    medico: card.querySelector(".q-medico").value.trim(),
                    cuando: card.querySelector(".q-cuando").value.trim(),
                    paciente: card.querySelector(".q-paciente").value.trim()
                };
            });
        }

        var meds = [];
        if (isLongHealthForm(tipo) && ddlMedicamentos && ddlMedicamentos.value === "SI") {
            meds = readRows("#bodyMed tr", function (row) {
                return {
                    asegurado: row.querySelector(".med-asegurado").value.trim(),
                    diagnostico: row.querySelector(".med-diagnostico").value.trim(),
                    medicamento: row.querySelector(".med-medicamento").value.trim(),
                    dosis: row.querySelector(".med-dosis").value.trim(),
                    desde: row.querySelector(".med-desde").value.trim(),
                    hasta: row.querySelector(".med-hasta").value.trim()
                };
            });
        }

        if (hfVidaJson) hfVidaJson.value = JSON.stringify(vida);
        if (hfContJson) hfContJson.value = JSON.stringify(cont);
        if (hfDepJson) hfDepJson.value = JSON.stringify(dep);
        if (hfSaludLargaJson) hfSaludLargaJson.value = JSON.stringify(saludLarga);
        if (hfMedicamentosJson) hfMedicamentosJson.value = JSON.stringify(meds);

        clearHiddenSections(tipo);
        paintTotals();
    }

    function initQuestionnaire() {
        var saved = [];
        try {
            saved = JSON.parse((hfSaludLargaJson && hfSaludLargaJson.value) || "[]");
        } catch (err) {
            saved = [];
        }

        if (!saludLargaPreguntas) {
            return;
        }

        saludLargaPreguntas.innerHTML = "";
        longQuestions.forEach(function (q) {
            var data = findBy(saved, function (x) { return x.id === q.id; }) || {};
            saludLargaPreguntas.insertAdjacentHTML("beforeend", createQuestionCard(q, data));
        });

        saludLargaPreguntas.addEventListener("change", function (event) {
            if (!event.target.classList.contains("q-answer")) {
                return;
            }
            var card = event.target.closest(".question-card");
            var detail = card.querySelector(".question-detail");
            if (event.target.value === "SI") {
                detail.classList.remove("is-hidden");
            } else {
                detail.classList.add("is-hidden");
                detail.querySelectorAll("input").forEach(function (input) { input.value = ""; });
            }
        });
    }

    function initDynamicRows() {
        var savedVida = [];
        var savedCont = [];
        var savedDep = [];
        var savedMed = [];

        try { savedVida = JSON.parse((hfVidaJson && hfVidaJson.value) || "[]"); } catch (err) { savedVida = []; }
        try { savedCont = JSON.parse((hfContJson && hfContJson.value) || "[]"); } catch (err) { savedCont = []; }
        try { savedDep = JSON.parse((hfDepJson && hfDepJson.value) || "[]"); } catch (err) { savedDep = []; }
        try { savedMed = JSON.parse((hfMedicamentosJson && hfMedicamentosJson.value) || "[]"); } catch (err) { savedMed = []; }

        if (bodyVida && bodyVida.children.length === 0) {
            if (savedVida.length > 0) {
                savedVida.forEach(function (row) { bodyVida.insertAdjacentHTML("beforeend", createVidaRow(row)); });
            } else {
                bodyVida.insertAdjacentHTML("beforeend", createVidaRow({}));
            }
        }

        if (bodyCont && bodyCont.children.length === 0) {
            if (savedCont.length > 0) {
                savedCont.forEach(function (row) { bodyCont.insertAdjacentHTML("beforeend", createContRow(row)); });
            } else {
                bodyCont.insertAdjacentHTML("beforeend", createContRow({}));
            }
        }

        if (bodyDep && bodyDep.children.length === 0) {
            if (savedDep.length > 0) {
                savedDep.forEach(function (row) { bodyDep.insertAdjacentHTML("beforeend", createDepRow(row)); });
            } else {
                bodyDep.insertAdjacentHTML("beforeend", createDepRow({}));
            }
        }

        if (bodyMed && bodyMed.children.length === 0) {
            if (savedMed.length > 0) {
                savedMed.forEach(function (row) { bodyMed.insertAdjacentHTML("beforeend", createMedRow(row)); });
            } else {
                bodyMed.insertAdjacentHTML("beforeend", createMedRow({}));
            }
        }

        document.getElementById("btnAddVida").addEventListener("click", function () {
            bodyVida.insertAdjacentHTML("beforeend", createVidaRow({}));
        });
        document.getElementById("btnAddCont").addEventListener("click", function () {
            bodyCont.insertAdjacentHTML("beforeend", createContRow({}));
        });
        document.getElementById("btnAddDep").addEventListener("click", function () {
            bodyDep.insertAdjacentHTML("beforeend", createDepRow({}));
        });
        if (document.getElementById("btnAddMed")) {
            document.getElementById("btnAddMed").addEventListener("click", function () {
                bodyMed.insertAdjacentHTML("beforeend", createMedRow({}));
            });
        }

        document.addEventListener("click", function (event) {
            if (!event.target.classList.contains("remove-row")) {
                return;
            }
            var row = event.target.closest("tr");
            var body = row.parentElement;
            if (body.children.length > 1) {
                row.remove();
                paintTotals();
            }
        });

        document.addEventListener("input", function (event) {
            if (event.target.classList.contains("pct-vida") || event.target.classList.contains("pct-cont")) {
                paintTotals();
            }
        });

        document.addEventListener("blur", function (event) {
            if (event.target.classList.contains("decimal")) {
                event.target.value = normalizeDecimal(event.target.value);
            }
        }, true);
    }

    function lockDateTyping() {
        document.addEventListener("keydown", function (event) {
            if (event.target.classList.contains("no-manual-date")) {
                event.preventDefault();
                if (typeof event.target.showPicker === "function") {
                    event.target.showPicker();
                }
            }
        });

        ["paste", "drop"].forEach(function (evt) {
            document.addEventListener(evt, function (event) {
                if (event.target.classList.contains("no-manual-date")) {
                    event.preventDefault();
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("no-manual-date") && typeof event.target.showPicker === "function") {
                event.target.showPicker();
            }
        });
    }

    function updateMedicamentosVisibility() {
        if (!medicamentosBlock || !ddlMedicamentos) {
            return;
        }
        medicamentosBlock.classList.toggle("is-hidden", ddlMedicamentos.value !== "SI");
    }

    function getVisibleSteps() {
        return steps.filter(function (step) {
            return !step.classList.contains("is-hidden");
        }).map(function (step) {
            return Number(step.getAttribute("data-step"));
        });
    }

    function ensureCurrentVisible() {
        var visible = getVisibleSteps();
        if (!inArray(visible, current)) {
            current = visible[0] || 1;
        }
    }

    function render() {
        ensureCurrentVisible();
        var visible = getVisibleSteps();
        var first = visible[0] || 1;
        var last = visible[visible.length - 1] || 1;

        steps.forEach(function (step) {
            var index = Number(step.getAttribute("data-step"));
            step.classList.toggle("active", index === current);
        });

        tabs.forEach(function (tab) {
            var index = Number(tab.getAttribute("data-step"));
            tab.classList.toggle("active", index === current);
        });

        btnPrev.disabled = current === first;
        btnNext.disabled = current === last;
    }

    function nextVisibleStep(fromStep) {
        var visible = getVisibleSteps();
        var currentPos = visible.indexOf(fromStep);
        if (currentPos < 0 || currentPos === visible.length - 1) {
            return fromStep;
        }
        return visible[currentPos + 1];
    }

    function prevVisibleStep(fromStep) {
        var visible = getVisibleSteps();
        var currentPos = visible.indexOf(fromStep);
        if (currentPos <= 0) {
            return fromStep;
        }
        return visible[currentPos - 1];
    }

    function setStepVisibility(stepNode, tabNode, visible) {
        if (stepNode) {
            stepNode.classList.toggle("is-hidden", !visible);
        }
        if (tabNode) {
            tabNode.classList.toggle("is-hidden", !visible);
        }
    }

    function toggleByFormulario() {
        if (!ddlFormulario) {
            return;
        }
        var tipo = ddlFormulario.value;
        var showSalud = tipo !== "101";
        var showSaludCorta = tipo === "61" || tipo === "62";
        var showSaludLarga = tipo === "63" || tipo === "64";
        var showDependientes = isFormWithDependientes(tipo);

        setStepVisibility(saludStep, saludTab, showSalud);

        if (saludCorta) saludCorta.classList.toggle("is-hidden", !showSaludCorta);
        if (saludLarga) saludLarga.classList.toggle("is-hidden", !showSaludLarga);
        if (cardDependientes) cardDependientes.classList.toggle("is-hidden", !showDependientes);

        if (!showSaludLarga && ddlMedicamentos) {
            ddlMedicamentos.value = "";
        }
        updateMedicamentosVisibility();
        clearHiddenSections(tipo);
        ensureCurrentVisible();
        render();
    }

    function attachNavigation() {
        btnPrev.addEventListener("click", function () {
            current = prevVisibleStep(current);
            render();
        });

        btnNext.addEventListener("click", function () {
            current = nextVisibleStep(current);
            render();
        });

        tabs.forEach(function (tab) {
            function handleSelect() {
                if (tab.classList.contains("is-hidden")) {
                    return;
                }
                current = Number(tab.getAttribute("data-step"));
                render();
            }

            tab.addEventListener("click", handleSelect);
            tab.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect();
                }
            });
        });
    }

    function registerSerializeOnSubmit() {
        var form = document.getElementById("form1");
        if (!form) {
            return;
        }
        form.addEventListener("submit", function () {
            serializeDynamicData();
        });
    }

    window.__solicitudNavigator = {
        goToStep: function (step) {
            current = step;
            render();
        }
    };

    initQuestionnaire();
    initDynamicRows();
    lockDateTyping();
    attachNavigation();
    registerSerializeOnSubmit();
    paintTotals();
    toggleByFormulario();

    if (ddlFormulario) {
        ddlFormulario.addEventListener("change", toggleByFormulario);
    }
    if (ddlMedicamentos) {
        ddlMedicamentos.addEventListener("change", function () {
            updateMedicamentosVisibility();
        });
    }

    render();
}

function clearFieldHighlights() {
    document.querySelectorAll(".field-error").forEach(function (el) {
        el.classList.remove("field-error");
    });
}

function highlightInvalidFields(fieldIds) {
    clearFieldHighlights();
    (fieldIds || []).forEach(function (fieldId) {
        var target = document.getElementById(fieldId) || document.querySelector('[id$="' + fieldId + '"]');
        if (target) {
            target.classList.add("field-error");
        }
    });
}

function goToStepAndFocus(step, fieldId, allFieldIds) {
    if (window.__solicitudNavigator) {
        window.__solicitudNavigator.goToStep(step);
    }
    highlightInvalidFields(allFieldIds);

    var target = document.getElementById(fieldId) || document.querySelector('[id$="' + fieldId + '"]');
    if (target) {
        target.focus();
        if (target.scrollIntoView) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
    }

    if (fieldId === "hfTotalVida") {
        var vidaInput = document.querySelector(".pct-vida");
        if (vidaInput) vidaInput.focus();
    }
    if (fieldId === "hfTotalCont") {
        var contInput = document.querySelector(".pct-cont");
        if (contInput) contInput.focus();
    }
    if (fieldId === "bodyDep") {
        var depInput = document.querySelector(".dep-genero");
        if (depInput) depInput.focus();
    }
    if (fieldId === "saludLargaPreguntas") {
        var qInput = document.querySelector(".q-answer");
        if (qInput) qInput.focus();
    }
    if (fieldId === "bodyMed") {
        var medInput = document.querySelector(".med-asegurado");
        if (medInput) medInput.focus();
    }
}

window.addEventListener("load", initSolicitudElectronica);
