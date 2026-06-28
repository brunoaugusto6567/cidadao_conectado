// vaquinha.js

function renderVaquinhas() {
  var container = document.getElementById("vaquinhasGrid");
  if (!container) return;

  var html = "";
  for (var i = 0; i < vaquinhas.length; i++) {
    var v        = vaquinhas[i];
    var pct      = Math.round((v.arrecadado / v.meta) * 100);
    var urgBadge = v.urgencia === "vermelho" ? "badge-critico" : "badge-analise";
    var urgLabel = v.urgencia === "vermelho" ? "Urgente"       : "Em andamento";
    html += '<div class="vaq-card">' +
      '<div class="vaq-card-header">' +
        '<span class="vaq-card-titulo">' + v.titulo + '</span>' +
        '<span class="badge ' + urgBadge + '">' + urgLabel + '</span>' +
      '</div>' +
      '<div class="vaq-bairro">📍 ' + v.bairro + '</div>' +
      '<div class="vaq-valores">' +
        '<span><strong>R$ ' + v.arrecadado.toLocaleString("pt-BR") + '</strong> arrecadados</span>' +
        '<span>Meta: R$ ' + v.meta.toLocaleString("pt-BR") + '</span>' +
      '</div>' +
      '<div class="vaq-bar-bg">' +
        '<div class="vaq-bar-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<div class="vaq-rodape">' +
        '<span class="vaq-apoiadores">👥 ' + v.apoiadores + ' apoiadores · ' + v.dias + ' dias restantes</span>' +
        '<button class="btn-contribuir" onclick="contribuir(' + v.id + ')">Contribuir</button>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
}

function contribuir(id) {
  var v     = null;
  for (var i = 0; i < vaquinhas.length; i++) {
    if (vaquinhas[i].id === id) { v = vaquinhas[i]; break; }
  }
  var valor = prompt('Quanto você quer contribuir para "' + v.titulo + '"? (R$)');
  if (valor && !isNaN(valor) && Number(valor) > 0) {
    v.arrecadado += Number(valor);
    v.apoiadores += 1;
    renderVaquinhas();
    alert('Contribuição de R$ ' + Number(valor).toFixed(2) + ' registrada! Obrigado! 🙌');
  }
}

// ── Modal nova vaquinha ──
function iniciarModalVaquinha() {
  var overlay = document.getElementById("modalVaquinhaOverlay");

  document.getElementById("btnNovaVaquinha").addEventListener("click", function() {
    overlay.classList.add("aberto");
  });

  document.getElementById("btnFecharModalVaquinha").addEventListener("click", function() {
    overlay.classList.remove("aberto");
  });

  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) overlay.classList.remove("aberto");
  });

  document.getElementById("btnCriarVaquinha").addEventListener("click", criarVaquinha);
}

function criarVaquinha() {
  var titulo   = document.getElementById("vaqTitulo").value.trim();
  var descricao= document.getElementById("vaqDescricao").value.trim();
  var bairro   = document.getElementById("vaqBairro").value;
  var meta     = Number(document.getElementById("vaqMeta").value);
  var dias     = Number(document.getElementById("vaqDias").value);

  if (!titulo || !bairro || !meta || !dias) {
    alert("Preencha todos os campos.");
    return;
  }
  if (meta < 100) { alert("Meta mínima: R$ 100."); return; }
  if (dias < 7 || dias > 90) { alert("Prazo entre 7 e 90 dias."); return; }

  var nova = {
    id:          vaquinhas.length + 1,
    titulo:      titulo,
    descricao:   descricao,
    bairro:      bairro,
    arrecadado:  0,
    meta:        meta,
    apoiadores:  0,
    dias:        dias,
    urgencia:    "amarelo"
  };

  vaquinhas.push(nova);
  renderVaquinhas();
  iniciarModalVaquinha(); // rebinda eventos nos novos botões

  // Limpa e fecha
  document.getElementById("modalVaquinhaOverlay").classList.remove("aberto");
  document.getElementById("vaqTitulo").value    = "";
  document.getElementById("vaqDescricao").value = "";
  document.getElementById("vaqBairro").value    = "";
  document.getElementById("vaqMeta").value      = "";
  document.getElementById("vaqDias").value      = "";

  mostrarToast('Vaquinha criada com sucesso! 🎉');
}

window.iniciarModalVaquinha = iniciarModalVaquinha;