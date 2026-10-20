// Lab 10: la lista de precios de Wheelhouse, leída desde su API.
const API_URL = "http://localhost:3000/api/v1";

const SIN_RESPUESTA = "La API de Wheelhouse no está respondiendo. Intenta más tarde.";
const formatoPesos = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" });

const estadoPrecios = document.getElementById("precios-estado");
const listaPrecios = document.getElementById("precios-lista");
const formServicio = document.getElementById("form-servicio");
const campoServicioId = document.getElementById("servicio-id");
const detalleServicio = document.getElementById("servicio-detalle");

async function pedirApi(ruta) {
  const respuesta = await fetch(API_URL + ruta);
  const documento = await respuesta.json();
  return { respuesta, documento };
}

function agregarParrafo(contenedor, texto) {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  contenedor.appendChild(parrafo);
}

async function cargarPrecios() {
  try {
    const { respuesta, documento } = await pedirApi("/services");

    if (!respuesta.ok) {
      estadoPrecios.textContent = documento.errors.join(" ");
      return;
    }

    documento.forEach(servicio => {
      const item = document.createElement("li");
      item.textContent = `${servicio.name}: ${formatoPesos.format(servicio.price)}`;
      listaPrecios.appendChild(item);
    });
    estadoPrecios.hidden = true;
  } catch (error) {
    console.error(error);
    estadoPrecios.textContent = SIN_RESPUESTA;
  }
}

async function buscarServicio(id) {
  detalleServicio.replaceChildren();

  try {
    const { respuesta, documento } = await pedirApi(`/services/${encodeURIComponent(id)}`);

    if (!respuesta.ok) {
      documento.errors.forEach(mensaje => agregarParrafo(detalleServicio, mensaje));
      return;
    }

    agregarParrafo(detalleServicio, documento.name);
    agregarParrafo(detalleServicio, `Precio: ${formatoPesos.format(documento.price)}`);
    agregarParrafo(detalleServicio, `Cobrado en ${documento.repairs_count} reparaciones`);
  } catch (error) {
    console.error(error);
    agregarParrafo(detalleServicio, SIN_RESPUESTA);
  }
}

formServicio.addEventListener("submit", (e) => {
  e.preventDefault();
  buscarServicio(campoServicioId.value);
});

cargarPrecios();