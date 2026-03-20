function initSolicitudElectronica() {
    var steps = document.querySelectorAll(".wizard-step");
    var tabs = document.querySelectorAll("#wizardStepper li");
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
    var ddlFormulario = document.getElementById("ddlTipoFormulario");
    var saludCorta = document.getElementById("saludCortaBlock");
    var saludLarga = document.getElementById("saludLargaBlock");
    var cardDependientes = document.getElementById("cardDependientes");
    var current = 1;

    function render() {
        steps.forEach(function (step) {
            var index = Number(step.getAttribute("data-step"));
            step.classList.toggle("active", index === current);
        });

        tabs.forEach(function (tab) {
            var index = Number(tab.getAttribute("data-step"));
            tab.classList.toggle("active", index === current);
        });

        btnPrev.disabled = current === 1;
        btnNext.disabled = current === steps.length;
    }

    btnPrev.addEventListener("click", function () {
        if (current > 1) {
            current -= 1;
            render();
        }
    });

    btnNext.addEventListener("click", function () {
        if (current < steps.length) {
            current += 1;
            render();
        }
    });

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
    }

    function toggleByFormulario() {
        if (!ddlFormulario) {
            return;
        }

        var tipo = ddlFormulario.value;
        var showSaludCorta = tipo === "61" || tipo === "62";
        var showSaludLarga = tipo === "63" || tipo === "64";
        var showDependientes = tipo === "101" || tipo === "63" || tipo === "64";

        if (saludCorta) {
            saludCorta.style.display = showSaludCorta ? "block" : "none";
        }

        if (saludLarga) {
            saludLarga.style.display = showSaludLarga ? "block" : "none";
        }

        if (cardDependientes) {
            cardDependientes.style.display = showDependientes ? "block" : "none";
        }
    }

    document.querySelectorAll(".pct-vida, .pct-cont").forEach(function (input) {
        input.addEventListener("input", paintTotals);
    });

    if (ddlFormulario) {
        ddlFormulario.addEventListener("change", toggleByFormulario);
    }

    paintTotals();
    toggleByFormulario();
    render();
}

window.addEventListener("load", initSolicitudElectronica);
