function initSolicitudElectronica() {
    var steps = document.querySelectorAll(".wizard-step");
    var tabs = document.querySelectorAll("#wizardStepper li");
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
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

    render();
}

window.addEventListener("load", initSolicitudElectronica);
