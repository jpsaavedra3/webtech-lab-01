const cerros = [
  { nombre: "Manquehue",    dificultad: "Difícil", congestion: "Media" },
  { nombre: "Durazno",      dificultad: "Media",   congestion: "Alta"  },
  { nombre: "Las Varas",    dificultad: "Difícil", congestion: "Alta"  },
  { nombre: "San Cristóbal",dificultad: "Media",   congestion: "Media" },
  { nombre: "Molino",       dificultad: "Fácil",   congestion: "Baja"  },
  { nombre: "Carbón",       dificultad: "Difícil", congestion: "Baja"  },
];

function crearItem(cerro) {
  const li = document.createElement("li");
  li.className = "item-cerro";
  li.dataset.dificultad = cerro.dificultad;

  const titulo = document.createElement("h4");
  titulo.textContent = cerro.nombre;

  const dificultad = document.createElement("p");
  dificultad.textContent = "Dificultad: " + cerro.dificultad;

  const congestion = document.createElement("p");
  congestion.textContent = "Congestión: " + cerro.congestion;

  const btnFavorito = document.createElement("button");
  btnFavorito.type = "button";
  btnFavorito.className = "btn-favorito";
  btnFavorito.setAttribute("aria-pressed", "false");
  btnFavorito.textContent = "Marcar favorito";

  li.append(titulo, dificultad, congestion, btnFavorito);
  return li;
}

function render(lista) {
  const contenedor = document.getElementById("lista-items");
  const mensajeVacio = document.getElementById("mensaje-vacio");

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mensajeVacio.hidden = false;
  } else {
    mensajeVacio.hidden = true;
    lista.forEach(cerro => contenedor.appendChild(crearItem(cerro)));
  }
}

render(cerros);

const inputFiltro = document.getElementById("filtro-texto");

inputFiltro.addEventListener("input", () => {
  const texto = inputFiltro.value.toLowerCase();
  const filtrados = cerros.filter(cerro =>
    cerro.nombre.toLowerCase().includes(texto)
  );
  render(filtrados);
});

document.getElementById("form-filtro").addEventListener("submit", (e) => {
  e.preventDefault();
});


const contenedorCategorias = document.getElementById("filtro-categorias");
const categorias = [...new Set(cerros.map(c => c.dificultad))];

categorias.forEach(cat => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = cat;
  btn.dataset.categoria = cat;
  contenedorCategorias.appendChild(btn);
});

contenedorCategorias.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const categoria = e.target.dataset.categoria;
  const filtrados = cerros.filter(cerro => cerro.dificultad === categoria);
  render(filtrados);
});


const formAgregar = document.getElementById("form-agregar");

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoCerro = {
    nombre: document.getElementById("nuevo-titulo").value,
    dificultad: document.getElementById("nuevo-categoria").value,
    congestion: document.getElementById("nuevo-descripcion").value,
  };

  cerros.push(nuevoCerro);
  render(cerros);
  formAgregar.reset();
});

const listaItems = document.getElementById("lista-items");

listaItems.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-favorito")) return;

  const item = e.target.closest(".item-cerro");
  const marcado = e.target.getAttribute("aria-pressed") === "true";

  e.target.setAttribute("aria-pressed", String(!marcado));
  item.classList.toggle("favorito", !marcado);
  e.target.textContent = !marcado ? "Quitar favorito" : "Marcar favorito";
});