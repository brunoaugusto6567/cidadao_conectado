// melhorias.js

// ── 1. CONTADOR ANIMADO ──
function animarContadores() {
  var ids = ["statTotal","statResolvidas","statCriticas","statAtencao"];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var alvo = parseInt(el.textContent) || 0;
    var atual = 0;
    var passo = Math.ceil(alvo / 25);
    var timer = setInterval(function() {
      atual += passo;
      if (atual >= alvo) { atual = alvo; clearInterval(timer); }
      el.textContent = atual;
    }, 40);
  });
}
window.animarContadores = animarContadores;

// ── 2. TOAST ──
function mostrarToast(msg, tipo) {
  var toast = document.createElement("div");
  toast.className = "toast toast-" + (tipo || "sucesso");
  toast.textContent = (tipo === "erro" ? "❌ " : "✅ ") + msg;
  document.body.appendChild(toast);
  setTimeout(function() { toast.classList.add("toast-visivel"); }, 10);
  setTimeout(function() {
    toast.classList.remove("toast-visivel");
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 400);
  }, 3500);
}
window.mostrarToast = mostrarToast;

// ── 3. MODAL DE DETALHES ──
function abrirDetalhes(id) {
  var oc = null;
  for (var i = 0; i < ocorrencias.length; i++) {
    if (ocorrencias[i].id === id) { oc = ocorrencias[i]; break; }
  }
  if (!oc) return;

  var s      = statusInfo[oc.status];
  var passos = ["recebido","analise","andamento","resolvido"];
  var nomes  = ["Recebido","Em análise","Em andamento","Resolvido"];
  var atual  = passos.indexOf(oc.status);

  var timeline = "";
  for (var j = 0; j < passos.length; j++) {
    var ativo = j <= atual;
    timeline += '<div class="' + (ativo ? "tl-passo ativo" : "tl-passo") + '">' +
      '<div class="tl-bolinha"></div>' +
      '<div class="tl-label">' + nomes[j] + '</div>' +
    '</div>';
    if (j < passos.length - 1) {
      timeline += '<div class="tl-linha' + (ativo && j < atual ? " ativa" : "") + '"></div>';
    }
  }

  document.getElementById("detTitulo").textContent    = tipoIcone[oc.tipo] + " " + oc.titulo;
  document.getElementById("detDescricao").textContent = oc.descricao;
  document.getElementById("detStatus").innerHTML      = '<span class="badge ' + s.classe + '">' + s.label + '</span>';
  document.getElementById("detMeta").innerHTML        =
    '<span>📍 ' + oc.bairro + '</span>' +
    '<span>🕐 ' + oc.data + '</span>' +
    '<span>👍 <span id="detConf">' + oc.confirmacoes + '</span> confirmações</span>';
  document.getElementById("detSetor").textContent     = "🏛️ " + (tipoSetor[oc.tipo] || "Central 156");
  document.getElementById("detTimeline").innerHTML    = timeline;

  var btnConf = document.getElementById("btnConfirmar");
  btnConf.disabled  = false;
  btnConf.textContent = "👍 Confirmar que existe";
  btnConf.style.opacity = "1";
  btnConf.onclick = function() {
    oc.confirmacoes++;
    document.getElementById("detConf").textContent = oc.confirmacoes;
    renderOcorrencias(ocorrencias);
    renderOcorrenciasMini();
    mostrarToast("Obrigado por confirmar! Isso ajuda a priorizar.");
    btnConf.disabled = true;
    btnConf.textContent = "✓ Confirmado";
    btnConf.style.opacity = ".5";
  };

  document.getElementById("btnCompartilhar").onclick = function() {
    var texto = "🚨 *Ocorrência no CidadeAtiva*\n\n" +
      tipoIcone[oc.tipo] + " *" + oc.titulo + "*\n" +
      "📍 " + oc.bairro + " · Fortaleza\n" +
      "📝 " + oc.descricao + "\n\n" +
      "👍 " + oc.confirmacoes + " moradores confirmaram";
    window.open("https://wa.me/?text=" + encodeURIComponent(texto), "_blank");
  };

  document.getElementById("modalDetalhesOverlay").classList.add("aberto");
}
window.abrirDetalhes = abrirDetalhes;

// ── 4. GRÁFICO DE BARRAS (canvas puro) ──
function renderGrafico() {
  var canvas = document.getElementById("graficoCanvas");
  if (!canvas) return;

  // Força tamanho antes de desenhar
  var pai = canvas.parentElement;
  canvas.style.width  = "100%";
  canvas.style.height = "240px";
  canvas.width  = pai.clientWidth - 48;
  canvas.height = 240;

  var ctx = canvas.getContext("2d");

  var contagem = { buraco:0, iluminacao:0, lixo:0, esgoto:0, agua:0, outro:0 };
  ocorrencias.forEach(function(oc) {
    if (contagem[oc.tipo] !== undefined) contagem[oc.tipo]++;
    else contagem.outro++;
  });

  var labels  = ["Buraco","Iluminação","Lixo","Esgoto","Água","Outro"];
  var valores = [contagem.buraco, contagem.iluminacao, contagem.lixo,
                 contagem.esgoto, contagem.agua, contagem.outro];
  var coresBarra = ["#dc2626","#d97706","#16a34a","#7c3aed","#2563eb","#64748b"];

  var W       = canvas.width;
  var H       = canvas.height;
  var margTop = 30;
  var margBot = 36;
  var margLeft= 32;
  var areaH   = H - margTop - margBot;
  var areaW   = W - margLeft - 10;
  var max     = Math.max.apply(null, valores) || 1;
  var n       = labels.length;
  var slotW   = areaW / n;
  var barW    = Math.floor(slotW * 0.5);

  ctx.clearRect(0, 0, W, H);

  // Linhas guia
  for (var g = 0; g <= 4; g++) {
    var yg = margTop + areaH * g / 4;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(margLeft, yg); ctx.lineTo(W - 10, yg); ctx.stroke();
    ctx.fillStyle   = "#94a3b8";
    ctx.font        = "10px system-ui";
    ctx.textAlign   = "right";
    ctx.fillText(Math.round(max * (4 - g) / 4), margLeft - 4, yg + 4);
  }

  // Barras
  valores.forEach(function(v, i) {
    var x    = margLeft + i * slotW + (slotW - barW) / 2;
    var altB = v === 0 ? 2 : Math.max(4, (v / max) * areaH);
    var y    = margTop + areaH - altB;

    ctx.fillStyle = coresBarra[i];
    ctx.beginPath();
    ctx.roundRect(x, y, barW, altB, [4, 4, 0, 0]);
    ctx.fill();

    // Valor
    if (v > 0) {
      ctx.fillStyle  = "#334155";
      ctx.font       = "bold 12px system-ui";
      ctx.textAlign  = "center";
      ctx.fillText(v, x + barW / 2, y - 7);
    }

    // Label
    ctx.fillStyle  = "#64748b";
    ctx.font       = "11px system-ui";
    ctx.textAlign  = "center";
    ctx.fillText(labels[i], x + barW / 2, H - 8);
  });
}
window.renderGrafico = renderGrafico;

// ── 5. FILTRO DO MAPA (marcadores reais) ──
var marcadoresMapa = [];

function registrarMarcador(marcador, urgencia) {
  marcadoresMapa.push({ marcador: marcador, urgencia: urgencia });
}
window.registrarMarcador = registrarMarcador;

function iniciarFiltroMapa() {
  var btns = document.querySelectorAll(".filtro-mapa-btn");
  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      btns.forEach(function(b) { b.classList.remove("ativo"); });
      this.classList.add("ativo");

      var filtro = this.dataset.filtro;
      marcadoresMapa.forEach(function(item) {
        var mostrar = filtro === "todos" || item.urgencia === filtro;
        if (mostrar) {
          item.marcador.setStyle({ opacity: 1, fillOpacity: 0.9 });
        } else {
          item.marcador.setStyle({ opacity: 0.1, fillOpacity: 0.1 });
        }
      });
    });
  });
}
window.iniciarFiltroMapa = iniciarFiltroMapa;