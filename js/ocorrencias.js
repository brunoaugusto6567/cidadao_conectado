// ocorrencias.js

function renderOcorrenciasMini() {
  var container = document.getElementById("ocorrenciasMini");
  if (!container) return;

  var html = "";
  var recentes = ocorrencias.slice(0, 4);
  for (var i = 0; i < recentes.length; i++) {
    var oc  = recentes[i];
    var s   = statusInfo[oc.status];
    var cor = cores[oc.urgencia].hex;
    html += '<div class="oc-mini-card">' +
      '<span class="oc-mini-dot" style="background:' + cor + '"></span>' +
      '<div class="oc-mini-info">' +
        '<div class="oc-mini-tipo">' + tipoIcone[oc.tipo] + ' ' + oc.titulo + '</div>' +
        '<div class="oc-mini-bairro">' + oc.bairro + '</div>' +
      '</div>' +
      '<span class="oc-mini-status badge ' + s.classe + '">' + s.label + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

function renderOcorrencias(lista) {
  var container = document.getElementById("listaOcorrencias");
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#9E9C96">Nenhuma ocorrência encontrada.</div>';
    return;
  }

  var html = "";
  for (var i = 0; i < lista.length; i++) {
    var oc = lista[i];
    var s  = statusInfo[oc.status];
    var progCor = oc.status === "resolvido"     ? cores.verde.hex :
                  oc.urgencia === "vermelho"    ? cores.vermelho.hex : cores.amarelo.hex;
    html += '<div class="oc-card urgencia-' + oc.urgencia + '" onclick="abrirDetalhes(' + oc.id + ')" style="cursor:pointer">' +
      '<div class="oc-card-header">' +
        '<span class="oc-card-tipo">' + tipoIcone[oc.tipo] + ' ' + oc.titulo + '</span>' +
        '<span class="badge ' + s.classe + '">' + s.label + '</span>' +
      '</div>' +
      '<div class="oc-card-desc">' + oc.descricao + '</div>' +
      '<div class="oc-card-meta">' +
        '<span>📍 ' + oc.bairro + '</span>' +
        '<span>🕐 ' + oc.data + '</span>' +
        '<span>👍 ' + oc.confirmacoes + ' confirmações</span>' +
      '</div>' +
      '<div class="oc-prog-bar">' +
        '<div class="oc-prog-fill" style="width:' + s.prog + '%;background:' + progCor + '"></div>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
}

function aplicarFiltros() {
  var status = document.getElementById("filtroStatus").value;
  var tipo   = document.getElementById("filtroTipo").value;
  var filtrado = ocorrencias.filter(function(oc) {
    return (!status || oc.status === status) && (!tipo || oc.tipo === tipo);
  });
  renderOcorrencias(filtrado);
}