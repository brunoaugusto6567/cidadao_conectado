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

// ===== FUNÇÃO ADICIONADA: RENDERIZAR GRÁFICO (Chart.js) =====
function renderGrafico() {
  var canvas = document.getElementById("meuGrafico");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");

  // Se o gráfico já foi desenhado antes, destrói a instância antiga para recalcular a tela
  if (window.meuChartInstancia) {
    window.meuChartInstancia.destroy();
  }

  // Mapeamento de nomes amigáveis para exibição
  var nomesTipos = {
    "buraco": "Buraco na Via",
    "iluminacao": "Iluminação Pública",
    "lixo": "Acúmulo de Lixo",
    "esgoto": "Esgoto / Alagamento",
    "agua": "Vazamento de Água",
    "outro": "Outros"
  };

  // Contagem dinâmica das ocorrências por tipo vindas do arquivo dados.js
  var contagem = { buraco: 0, iluminacao: 0, lixo: 0, esgoto: 0, agua: 0, outro: 0 };
  
  if (typeof ocorrencias !== "undefined" && Array.isArray(ocorrencias)) {
    ocorrencias.forEach(function(o) {
      if (contagem[o.tipo] !== undefined) {
        contagem[o.tipo]++;
      } else {
        contagem["outro"]++;
      }
    });
  }

  // Monta os arrays que o Chart.js precisa para renderizar
  var labelsFormatadas = Object.keys(contagem).map(function(chave) {
    return nomesTipos[chave] || chave;
  });
  var valores = Object.values(contagem);

  // Criação do Gráfico com paleta moderna azulada
  window.meuChartInstancia = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labelsFormatadas,
      datasets: [{
        label: "Quantidade de Ocorrências",
        data: valores,
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",  // Azul principal
          "rgba(59, 130, 246, 0.8)",
          "rgba(96, 165, 250, 0.8)",
          "rgba(147, 197, 253, 0.8)",
          "rgba(191, 219, 254, 0.8)",
          "rgba(219, 234, 254, 0.8)"
        ],
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // Esconde a legenda do dataset por ser gráfico de uma cor só
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1, // Garante números inteiros na escala vertical (ex: 1, 2, 3...)
            font: { family: "sans-serif", size: 12 }
          },
          grid: { color: "rgba(0, 0, 0, 0.05)" }
        },
        x: {
          ticks: {
            font: { family: "sans-serif", size: 12, weight: "bold" }
          },
          grid: { display: false }
        }
      }
    }
  });
}

// Inicia quando a página carregar
window.onload = iniciar;