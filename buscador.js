document.addEventListener("DOMContentLoaded", () => {

    const productos = document.querySelectorAll(".producto-card");
    const buscador = document.getElementById("buscador");
    const form = document.querySelector(".search-form");

    //-- 1. Obtener texto de búsqueda desde la URL
    const params = new URLSearchParams(window.location.search);
    const textoBuscado = params.get("search")?.toLowerCase() || "";

    //-- 2. Colocar el texto en el input si viene desde otra página
    if (buscador) buscador.value = textoBuscado;

    //-- 3. Función para filtrar productos
    function filtrar(txt) {
        productos.forEach(card => {
            const nombre = card.querySelector(".producto-nombre").textContent.toLowerCase();
            const categoria = card.querySelector(".producto-categoria").textContent.toLowerCase();
            const descripcion = card.querySelector(".producto-descripcion").textContent.toLowerCase();

            const coincide =
                nombre.includes(txt) ||
                categoria.includes(txt) ||
                descripcion.includes(txt);

            card.style.display = coincide ? "block" : "none";
        });
    }

    //-- 4. Filtrar automáticamente si viene desde index.html
    if (textoBuscado !== "") {
        filtrar(textoBuscado);
    }

    //-- 5. Buscar sin recargar al usar el formulario dentro de productos.html
    if (form) {
        form.addEventListener("submit", e => {
            // Evita recarga solo si ya estamos en productos.html
            if (window.location.pathname.includes("productos.html")) {
                e.preventDefault();
                filtrar(buscador.value.toLowerCase());
            }
        });
    }

    //-- 6. Filtrar mientras escribe
    if (buscador) {
        buscador.addEventListener("keyup", () => {
            filtrar(buscador.value.toLowerCase());
        });
    }
});
