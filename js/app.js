// app.js

function atualizarStats() {
  var abertas    = ocorrencias.filter(function(o) { return o.status !== "resolvido"; });
  var resolvidas = ocorrencias.filter(function(o) { return o.status === "resolvido"; });
  var criticas   = ocorrencias.filter(function(o) { return o.urgencia === "vermelho" && o.status !== "resolvido"; });
  var atencao    = bairros.filter(function(b) { return b.cor === "amarelo"; }).length;

  document.getElementById("statTotal").textContent      = abertas.length;
  document.getElementById("statResolvidas").textContent = resolvidas.length;
  document.getElementById("statCriticas").textContent   = criticas.length;
  document.getElementById("statAtencao").textContent    = atencao;
}

function iniciar() {
  atualizarStats();
  iniciarMapa();
  renderOcorrenciasMini();
  renderOcorrencias(ocorrencias);
  renderRanking();
  renderVaquinhas();
  iniciarModal();
  iniciarModalVaquinha();
  iniciarFiltroMapa();
  animarContadores();

  // Fechar modal detalhes
  document.getElementById("btnFecharDetalhes").addEventListener("click", function() {
    document.getElementById("modalDetalhesOverlay").classList.remove("aberto");
  });
  document.getElementById("modalDetalhesOverlay").addEventListener("click", function(e) {
    if (e.target === this) this.classList.remove("aberto");
  });

  // Navegação por abas
  var botoes = document.querySelectorAll(".nav-btn");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function() {
      document.querySelectorAll(".nav-btn").forEach(function(b) { b.classList.remove("active"); });
      document.querySelectorAll(".tab-panel").forEach(function(p) { p.classList.remove("active"); });
      this.classList.add("active");
      document.getElementById("tab-" + this.dataset.tab).classList.add("active");
    });
  }

  // Filtros
  document.getElementById("filtroStatus").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroTipo").addEventListener("change",   aplicarFiltros);

  // Aba gráfico
  var btnGrafico = document.querySelector('[data-tab="grafico"]');
  if (btnGrafico) {
    btnGrafico.addEventListener("click", function() {
      setTimeout(renderGrafico, 50);
    });
  }
}

// Inicia quando a página carregar
window.onload = iniciar;