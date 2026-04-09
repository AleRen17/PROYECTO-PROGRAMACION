// ── JAVASCRIPT: FILTROS PARA PROYECTOS ──
const botones = document.querySelectorAll(".filtro-btn");
const tarjetas = document.querySelectorAll(".card");
const sinRes = document.getElementById("sin-resultados");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filtro = btn.dataset.filtro;

    botones.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");

    let visibles = 0;
    tarjetas.forEach((card) => {
      const estado = card.dataset.estado;
      const mostrar = filtro === "todos" || estado === filtro;
      card.classList.toggle("oculta", !mostrar);
      if (mostrar) visibles++;
    });

    sinRes.style.display = visibles === 0 ? "block" : "none";
  });
});