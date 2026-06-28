// ranking.js

function renderRanking() {
  var container = document.getElementById("rankingLista");
  if (!container) return;

  var ordenados = bairros.slice().sort(function(a, b) { return b.score - a.score; });
  var html = "";
  for (var i = 0; i < ordenados.length; i++) {
    var b          = ordenados[i];
    var cor        = cores[b.cor].hex;
    var badgeClasse = b.cor === "verde"   ? "badge-resolvido" :
                      b.cor === "amarelo" ? "badge-analise"   : "badge-critico";
    var label       = b.cor === "verde"   ? "Ótimo"   :
                      b.cor === "amarelo" ? "Atenção" : "Crítico";
    html += '<div class="rank-item">' +
      '<span class="rank-pos">' + (i + 1) + 'º</span>' +
      '<span class="rank-nome">' + b.nome + '</span>' +
      '<div class="rank-bar-bg">' +
        '<div class="rank-bar-fill" style="width:' + b.score + '%;background:' + cor + '"></div>' +
      '</div>' +
      '<span class="badge ' + badgeClasse + '">' + label + '</span>' +
      '<span class="rank-score">' + b.score + '/100</span>' +
    '</div>';
  }
  container.innerHTML = html;
}