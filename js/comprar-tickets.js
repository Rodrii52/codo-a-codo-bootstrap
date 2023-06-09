const valorTicket = 200;
const descuentos = {
    ninguno: 0,
    estudiante: 80,
    trainee: 50,
    junior: 15,
};

const totalAPagar = document.getElementById("totalAPagar");
const mostarTotal = document.querySelectorAll(".mostar-total");
const limpiarCampos = document.getElementById("limpiarCampos");
const calcularTotal = document.getElementById("calcularTotal");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const mail = document.getElementById("mail");
const cantidadTickets = document.getElementById("cantidadTickets");
const categoria = document.getElementById("categoriaSelect");
const resumenCompra = document.getElementById("resumenCompra");

const emailValido = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

const eliminarErrores = () => {
    document
        .querySelectorAll(".datos-formulario, .select-formulario")
        .forEach((element) => element.classList.remove("is-invalid"));
}

const total_pagar = () => {
    eliminarErrores();

    if (!nombre.value) {
        alert("Por favor, escribí tu nombre.");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;
    }

    if (!apellido.value) {
        alert("Por favor, escribí tu apellido.");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return;
    }

    if (!mail.value || !emailValido(mail.value)) {
        alert("Por favor, escribí un correo electrónico válido.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }

    if (!categoria.value) {
        alert("Por favor, seleccioná una categoría.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }

    if (cantidadTickets.value <= 0 || isNaN(cantidadTickets.value)) {
        alert("Por favor, ingresá correctamente cantidad de tickets.");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }

    let totalValorTickets = cantidadTickets.value * valorTicket;
    totalValorTickets -= (descuentos[categoria.value] / 100) * totalValorTickets;

    if (!totalAPagar.innerHTML) {
        totalAPagar.innerHTML = totalValorTickets;
    } else {
        totalAPagar.innerHTML = parseInt(totalAPagar.innerHTML) + totalValorTickets;
    }

    mostarTotal.forEach((element) => element.style.display = "block");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${nombre.value}</td>
        <td>${apellido.value}</td>
        <td>${mail.value}</td>
        <td>${cantidadTickets.value}</td>
        <td>${categoria.value}</td>
        <td>$${totalValorTickets}</td>
    `;
    resumenCompra.appendChild(nuevaFila);
}

calcularTotal.addEventListener("click", total_pagar);

const reset_pagar = () => {
    eliminarErrores();
    totalAPagar.innerHTML = "";
    resumenCompra.innerHTML = "";
    mostarTotal.forEach((element) => element.style.display = "none");
}

limpiarCampos.addEventListener("click", reset_pagar);
