// modal.js — simulação inteligente de IA

function iniciarModal() {
  var overlay = document.getElementById("modalOverlay");

  document.getElementById("btnAbrirModal").addEventListener("click", function() {
    overlay.classList.add("aberto");
  });
  document.getElementById("btnFecharModal").addEventListener("click", function() {
    overlay.classList.remove("aberto");
  });
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) overlay.classList.remove("aberto");
  });

  document.getElementById("inputFoto").addEventListener("change", function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById("previewFoto").src = ev.target.result;
      document.getElementById("previewFoto").style.display = "block";
      document.getElementById("uploadPlaceholder").style.display = "none";
      // Analisa o nome do arquivo + descrição atual
      var descricao = document.getElementById("campDescricao").value;
      rodarAnaliseIA(file.name + " " + descricao);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("btnEnviarOcorrencia").addEventListener("click", enviarOcorrencia);
}

// -------------------------------------------------------
// SIMULAÇÃO INTELIGENTE — lê palavras-chave do texto
// -------------------------------------------------------
var regras = [
  {
    tipo: "buraco",
    palavras: ["buraco","cova","cratera","asfalto","pavimento","calçada rachada","via","rua quebrada","panela","paralelepípedo"],
    titulo: "Buraco no pavimento",
    descricoes: [
      "A IA identificou irregularidade severa no pavimento. Risco de acidentes para veículos e pedestres.",
      "Detectado dano estrutural na via pública. Prioridade de reparo recomendada.",
      "Buraco ou depressão identificada no asfalto. Pode causar danos a veículos e quedas."
    ],
    setor: "SEINFRA — Secretaria de Infraestrutura",
    urgencia: "vermelho"
  },
  {
    tipo: "iluminacao",
    palavras: ["luz","poste","iluminação","escuro","lâmpada","luminária","apagado","sem luz","noite","iluminado"],
    titulo: "Falha na iluminação pública",
    descricoes: [
      "A IA identificou ausência de iluminação pública. Área com potencial risco à segurança noturna.",
      "Detectada falha em poste ou luminária. Favorece insegurança em vias públicas.",
      "Iluminação pública inoperante identificada. Requer manutenção pela concessionária."
    ],
    setor: "ENEL Distribuição Ceará",
    urgencia: "amarelo"
  },
  {
    tipo: "lixo",
    palavras: ["lixo","entulho","resíduo","lixeira","descarte","sujeira","sujo","acúmulo","coleta","lixão","esgoto entupido"],
    titulo: "Descarte irregular de resíduos",
    descricoes: [
      "A IA identificou acúmulo irregular de resíduos sólidos em via pública. Risco sanitário.",
      "Detectado descarte de lixo em local inadequado. Pode atrair vetores de doenças.",
      "Ponto de descarte irregular identificado. Necessita coleta especial pela SEUMA."
    ],
    setor: "SEUMA — Secretaria de Meio Ambiente",
    urgencia: "amarelo"
  },
  {
    tipo: "esgoto",
    palavras: ["esgoto","fossa","fede","cheiro","odor","vazamento de esgoto","galeria","bueiro","enchente","alagamento","esgoto aberto"],
    titulo: "Esgoto a céu aberto",
    descricoes: [
      "A IA identificou exposição de esgoto sanitário. Risco grave de contaminação e doenças.",
      "Detectado vazamento ou exposição de rede de esgoto. Situação de risco sanitário urgente.",
      "Esgoto a céu aberto identificado. Requer intervenção imediata da CAGECE."
    ],
    setor: "CAGECE — Companhia de Água e Esgoto",
    urgencia: "vermelho"
  },
  {
    tipo: "agua",
    palavras: ["água","vazamento","cano","torneira","encanamento","canos","tubulação","cano rompido","água jorrando","desperdício"],
    titulo: "Vazamento de água",
    descricoes: [
      "A IA identificou vazamento em rede de distribuição de água. Desperdício e risco de afundamento.",
      "Detectada ruptura em tubulação de água potável. Requer reparo urgente.",
      "Vazamento de água identificado em via pública. Pode causar erosão no solo e buracos."
    ],
    setor: "CAGECE — Companhia de Água e Esgoto",
    urgencia: "amarelo"
  }
];

function classificarPorTexto(texto) {
  var textoLower = texto.toLowerCase();
  var melhor = null;
  var maiorPontuacao = 0;

  for (var i = 0; i < regras.length; i++) {
    var pontos = 0;
    for (var j = 0; j < regras[i].palavras.length; j++) {
      if (textoLower.indexOf(regras[i].palavras[j]) !== -1) {
        pontos++;
      }
    }
    if (pontos > maiorPontuacao) {
      maiorPontuacao = pontos;
      melhor = regras[i];
    }
  }

  // Se não achou nada, retorna genérico
  if (!melhor) {
    return {
      tipo: "outro",
      titulo: "Problema urbano identificado",
      descricao: "A IA detectou uma ocorrência que requer avaliação presencial da equipe técnica municipal.",
      setor: "Central 156 — Atendimento ao Cidadão",
      urgencia: "amarelo"
    };
  }

  // Escolhe uma descrição aleatória entre as disponíveis
  var desc = melhor.descricoes[Math.floor(Math.random() * melhor.descricoes.length)];
  return {
    tipo:      melhor.tipo,
    titulo:    melhor.titulo,
    descricao: desc,
    setor:     melhor.setor,
    urgencia:  melhor.urgencia
  };
}

function rodarAnaliseIA(textoContexto) {
  var iaBox = document.getElementById("iaResultado");
  document.getElementById("iaTipo").textContent      = "🔍 Analisando com IA...";
  document.getElementById("iaDescricao").textContent = "";
  document.getElementById("iaSetor").textContent     = "";
  iaBox.style.display = "flex";

  // Simula o tempo de processamento (1.8s)
  setTimeout(function() {
    var resultado = classificarPorTexto(textoContexto);
    exibirResultadoIA(resultado);
  }, 1800);
}

function exibirResultadoIA(resultado) {
  var icones = { buraco:"🕳️", iluminacao:"💡", lixo:"🗑️", esgoto:"🚰", agua:"💧", outro:"⚠️" };
  var icone  = icones[resultado.tipo] || "⚠️";

  document.getElementById("iaTipo").textContent      = "✅ " + icone + " " + resultado.titulo;
  document.getElementById("iaDescricao").textContent = resultado.descricao;
  document.getElementById("iaSetor").textContent     = "🏛️ Setor responsável: " + resultado.setor;

  document.getElementById("campTipo").value = resultado.tipo;
}

// -------------------------------------------------------
// Enviar ocorrência
// -------------------------------------------------------
function enviarOcorrencia() {
  var descricao = document.getElementById("campDescricao").value.trim();
  var bairro    = document.getElementById("campBairro").value;
  var temFoto   = document.getElementById("previewFoto").style.display !== "none";
  var iaVisivel = document.getElementById("iaResultado").style.display !== "none";

  if (!descricao || !bairro) {
    alert("Preencha pelo menos a descrição e o bairro.");
    return;
  }

  // Se não rodou IA ainda, roda e aguarda
  if (!iaVisivel) {
    rodarAnaliseIA(descricao);
    setTimeout(function() { salvarOcorrencia(); }, 2200);
    return;
  }

  salvarOcorrencia();
}

function salvarOcorrencia() {
  var tipo      = document.getElementById("campTipo").value || "outro";
  var descricao = document.getElementById("campDescricao").value.trim();
  var bairro    = document.getElementById("campBairro").value;

  var titulos = {
    buraco:     "Buraco no pavimento",
    iluminacao: "Falha na iluminação pública",
    lixo:       "Descarte irregular de resíduos",
    esgoto:     "Esgoto a céu aberto",
    agua:       "Vazamento de água",
    outro:      "Problema urbano"
  };

  var nova = {
    id:           ocorrencias.length + 1,
    tipo:         tipo,
    titulo:       titulos[tipo],
    descricao:    descricao,
    bairro:       bairro,
    status:       "recebido",
    confirmacoes: 1,
    data:         "agora mesmo",
    urgencia:     tipo === "buraco" || tipo === "esgoto" ? "vermelho" : "amarelo",
  };

  ocorrencias.unshift(nova);
  renderOcorrencias(ocorrencias);
  renderOcorrenciasMini();
  atualizarStats();
  limparModal();
  mostrarToast("Ocorrência registrada! A prefeitura foi notificada. 🎉");
}

function limparModal() {
  document.getElementById("modalOverlay").classList.remove("aberto");
  document.getElementById("campTipo").value                  = "";
  document.getElementById("campDescricao").value             = "";
  document.getElementById("campBairro").value                = "";
  document.getElementById("campEndereco").value              = "";
  document.getElementById("previewFoto").style.display       = "none";
  document.getElementById("uploadPlaceholder").style.display = "flex";
  document.getElementById("iaResultado").style.display       = "none";
  document.getElementById("inputFoto").value                 = "";
}