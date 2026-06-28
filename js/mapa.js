// mapa.js
var mapaLeaflet = null;

// Mapeia cor do bairro para urgência do filtro
var corParaUrgencia = { verde: "verde", amarelo: "amarelo", vermelho: "vermelho" };

function iniciarMapa() {
  if (mapaLeaflet) return;

  mapaLeaflet = L.map("mapa").setView([-3.760, -38.540], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(mapaLeaflet);

  bairros.forEach(function(b) {
    var cor   = cores[b.cor].hex;
    var corBg = cores[b.cor].bg;

    var marcador = L.circleMarker([b.lat, b.lng], {
      radius:      18,
      fillColor:   corBg,
      color:       cor,
      weight:      2,
      opacity:     1,
      fillOpacity: 0.9,
    }).addTo(mapaLeaflet);

    // Registra marcador com urgência pra o filtro funcionar
    registrarMarcador(marcador, corParaUrgencia[b.cor]);

    var ocsBairro = ocorrencias.filter(function(o) { return o.bairro === b.nome; });
    var abertas   = ocsBairro.filter(function(o) { return o.status !== "resolvido"; }).length;

    marcador.bindPopup(
      '<div style="font-family:system-ui,sans-serif;min-width:180px">' +
        '<div style="font-weight:700;font-size:14px;margin-bottom:6px">' + b.nome + '</div>' +
        '<span style="background:' + corBg + ';color:' + cor + ';font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600">' +
          'Score: ' + b.score + '/100' +
        '</span>' +
        '<div style="font-size:12px;color:#64748b;margin-top:8px">' + abertas + ' ocorrência(s) aberta(s)</div>' +
      '</div>'
    );
  });
}

window.iniciarMapa = iniciarMapa;