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
    var current = 1;

    var parentescos = ["Conyuge", "Hijo", "Padre", "Madre", "Hermano"];
    var generos = ["M", "F"];

    function bySuffix(suffix) {
        return document.querySelector('[id$="' + suffix + '"]');
    }

    var hfVidaJson = bySuffix("hfVidaJson");
    var hfContJson = bySuffix("hfContJson");
    var hfDepJson = bySuffix("hfDepJson");
    var hfTotalVida = bySuffix("hfTotalVida");
    var hfTotalCont = bySuffix("hfTotalCont");

    function getVisibleSteps() {
        return steps.filter(function (step) {
            return !step.classList.contains("is-hidden");
        }).map(function (step) {
            return Number(step.getAttribute("data-step"));
        });
    }

    function ensureCurrentVisible() {
        var visible = getVisibleSteps();
        if (!visible.includes(current)) {
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

    function createOptions(options, selected) {
        var html = '<option value="">Seleccione...</option>';
        options.forEach(function (item) {
            var isSelected = item === selected ? ' selected="selected"' : "";
            html += '<option value="' + item + '"' + isSelected + '>' + item + '</option>';
        });
        return html;
    }

    function createVidaRow(data) {
        return '<tr class="row-vida">' +
            '<td><input class="input vida-nombre" type="text" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input vida-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><input class="input vida-fecha" type="text" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input pct-vida" type="text" value="' + (data.porcentaje || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createContRow(data) {
        return '<tr class="row-cont">' +
            '<td><input class="input cont-nombre" type="text" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input cont-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><input class="input cont-fecha" type="text" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input pct-cont" type="text" value="' + (data.porcentaje || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
    }

    function createDepRow(data) {
        return '<tr class="row-dep">' +
            '<td><input class="input dep-nombre" type="text" value="' + (data.nombre || "") + '" /></td>' +
            '<td><select class="input dep-parentesco">' + createOptions(parentescos, data.parentesco || "") + '</select></td>' +
            '<td><select class="input dep-genero">' + createOptions(generos, data.genero || "") + '</select></td>' +
            '<td><input class="input dep-fecha" type="text" value="' + (data.fecha || "") + '" /></td>' +
            '<td><input class="input dep-peso" type="text" value="' + (data.peso || "") + '" /></td>' +
            '<td><input class="input dep-estatura" type="text" value="' + (data.estatura || "") + '" /></td>' +
            '<td><button type="button" class="btn light small remove-row">Quitar</button></td>' +
            '</tr>';
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
            return Object.values(row).some(function (value) {
                return (value || "").toString().trim() !== "";
            });
        });
    }

    function serializeDynamicData() {
        var vida = readRows("#bodyVida tr", function (row) {
            return {
                nombre: row.querySelector(".vida-nombre").value.trim(),
                parentesco: row.querySelector(".vida-parentesco").value,
                fecha: row.querySelector(".vida-fecha").value.trim(),
                porcentaje: row.querySelector(".pct-vida").value.trim()
            };
        });

        var cont = readRows("#bodyCont tr", function (row) {
            return {
                nombre: row.querySelector(".cont-nombre").value.trim(),
                parentesco: row.querySelector(".cont-parentesco").value,
                fecha: row.querySelector(".cont-fecha").value.trim(),
                porcentaje: row.querySelector(".pct-cont").value.trim()
            };
        });

        var dep = readRows("#bodyDep tr", function (row) {
            return {
                nombre: row.querySelector(".dep-nombre").value.trim(),
                parentesco: row.querySelector(".dep-parentesco").value,
                genero: row.querySelector(".dep-genero").value,
                fecha: row.querySelector(".dep-fecha").value.trim(),
                peso: row.querySelector(".dep-peso").value.trim(),
                estatura: row.querySelector(".dep-estatura").value.trim()
            };
        });

        if (hfVidaJson) hfVidaJson.value = JSON.stringify(vida);
        if (hfContJson) hfContJson.value = JSON.stringify(cont);
        if (hfDepJson) hfDepJson.value = JSON.stringify(dep);
        paintTotals();
    }

    function initDynamicRows() {
        var bodyVida = document.getElementById("bodyVida");
        var bodyCont = document.getElementById("bodyCont");
        var bodyDep = document.getElementById("bodyDep");

        var savedVida = [];
        var savedCont = [];
        var savedDep = [];

        try {
            savedVida = JSON.parse((hfVidaJson && hfVidaJson.value) || "[]");
        } catch (err) {
            savedVida = [];
        }

        try {
            savedCont = JSON.parse((hfContJson && hfContJson.value) || "[]");
        } catch (err) {
            savedCont = [];
        }

        try {
            savedDep = JSON.parse((hfDepJson && hfDepJson.value) || "[]");
        } catch (err) {
            savedDep = [];
        }

        if (bodyVida && bodyVida.children.length === 0) {
            if (savedVida.length > 0) {
                savedVida.forEach(function (row) {
                    bodyVida.insertAdjacentHTML("beforeend", createVidaRow(row));
                });
            } else {
                bodyVida.insertAdjacentHTML("beforeend", createVidaRow({}));
            }
        }
        if (bodyCont && bodyCont.children.length === 0) {
            if (savedCont.length > 0) {
                savedCont.forEach(function (row) {
                    bodyCont.insertAdjacentHTML("beforeend", createContRow(row));
                });
            } else {
                bodyCont.insertAdjacentHTML("beforeend", createContRow({}));
            }
        }
        if (bodyDep && bodyDep.children.length === 0) {
            if (savedDep.length > 0) {
                savedDep.forEach(function (row) {
                    bodyDep.insertAdjacentHTML("beforeend", createDepRow(row));
                });
            } else {
                bodyDep.insertAdjacentHTML("beforeend", createDepRow({}));
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
    }

    function toggleByFormulario() {
        if (!ddlFormulario) {
            return;
        }

        var tipo = ddlFormulario.value;
        var showSalud = tipo !== "101";
        var showSaludCorta = tipo === "61" || tipo === "62";
        var showSaludLarga = tipo === "63" || tipo === "64";
        var showDependientes = tipo === "101" || tipo === "63" || tipo === "64";

        setStepVisibility(saludStep, saludTab, showSalud);

        if (saludCorta) {
            saludCorta.style.display = showSaludCorta ? "block" : "none";
        }

        if (saludLarga) {
            saludLarga.style.display = showSaludLarga ? "block" : "none";
        }

        if (cardDependientes) {
            cardDependientes.style.display = showDependientes ? "block" : "none";
        }

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

    initDynamicRows();
    attachNavigation();
    registerSerializeOnSubmit();
    paintTotals();
    toggleByFormulario();

    if (ddlFormulario) {
        ddlFormulario.addEventListener("change", function () {
            toggleByFormulario();
        });
    }

    render();
}

function goToStepAndFocus(step, fieldId) {
    if (window.__solicitudNavigator) {
        window.__solicitudNavigator.goToStep(step);
    }

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
}

window.addEventListener("load", initSolicitudElectronica);
