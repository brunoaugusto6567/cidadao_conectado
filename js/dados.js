// dados.js — dados realistas de Fortaleza

var bairros = [
  { nome: "Meireles",         lat: -3.726, lng: -38.495, score: 91, cor: "verde"    },
  { nome: "Aldeota",          lat: -3.736, lng: -38.503, score: 85, cor: "verde"    },
  { nome: "Cocó",             lat: -3.745, lng: -38.479, score: 82, cor: "verde"    },
  { nome: "Dionísio Torres",  lat: -3.743, lng: -38.510, score: 79, cor: "verde"    },
  { nome: "Água Fria",        lat: -3.790, lng: -38.563, score: 76, cor: "verde"    },
  { nome: "Benfica",          lat: -3.750, lng: -38.533, score: 72, cor: "verde"    },
  { nome: "Fátima",           lat: -3.757, lng: -38.540, score: 63, cor: "amarelo"  },
  { nome: "Montese",          lat: -3.770, lng: -38.555, score: 59, cor: "amarelo"  },
  { nome: "Parangaba",        lat: -3.795, lng: -38.574, score: 54, cor: "amarelo"  },
  { nome: "José Bonifácio",   lat: -3.762, lng: -38.527, score: 51, cor: "amarelo"  },
  { nome: "Conjunto Ceará",   lat: -3.797, lng: -38.603, score: 47, cor: "amarelo"  },
  { nome: "Antônio Bezerra",  lat: -3.763, lng: -38.584, score: 44, cor: "amarelo"  },
  { nome: "Bom Jardim",       lat: -3.820, lng: -38.590, score: 31, cor: "vermelho" },
  { nome: "Pirambu",          lat: -3.718, lng: -38.554, score: 24, cor: "vermelho" },
  { nome: "Lagamar",          lat: -3.755, lng: -38.546, score: 28, cor: "vermelho" },
  { nome: "Granja Lisboa",    lat: -3.810, lng: -38.615, score: 33, cor: "vermelho" },
];

var ocorrencias = [
  {
    id: 1,
    tipo: "buraco",
    titulo: "Buraco no pavimento",
    descricao: "Cratera de aproximadamente 60cm na Av. Bezerra de Menezes, nº 1.200. Já causou queda de motociclista. Situação crítica.",
    bairro: "Fátima",
    status: "andamento",
    confirmacoes: 47,
    data: "há 3 dias",
    urgencia: "vermelho"
  },
  {
    id: 2,
    tipo: "iluminacao",
    titulo: "Falha na iluminação pública",
    descricao: "Trecho de 200m sem iluminação na Rua Tibúrcio Cavalcante. Moradores relatam assaltos frequentes no local à noite.",
    bairro: "Aldeota",
    status: "resolvido",
    confirmacoes: 63,
    data: "há 8 dias",
    urgencia: "verde"
  },
  {
    id: 3,
    tipo: "lixo",
    titulo: "Descarte irregular de resíduos",
    descricao: "Ponto de lixo clandestino com mais de 2 toneladas de entulho e resíduos domésticos. Foco de ratos e mosquitos há 4 semanas.",
    bairro: "Pirambu",
    status: "recebido",
    confirmacoes: 29,
    data: "há 2 horas",
    urgencia: "vermelho"
  },
  {
    id: 4,
    tipo: "esgoto",
    titulo: "Esgoto a céu aberto",
    descricao: "Galeria de esgoto rompida exposta na Rua Dom Lustosa. Mau cheiro intenso e risco de contaminação em raio de 100m.",
    bairro: "Bom Jardim",
    status: "analise",
    confirmacoes: 38,
    data: "há 5 dias",
    urgencia: "vermelho"
  },
  {
    id: 5,
    tipo: "agua",
    titulo: "Vazamento de água",
    descricao: "Cano rompido na calçada da Rua Castro e Silva, próx. nº 340. Água jorrando continuamente há 3 dias. Desperdício estimado de 50 mil litros.",
    bairro: "Parangaba",
    status: "andamento",
    confirmacoes: 22,
    data: "há 3 dias",
    urgencia: "amarelo"
  },
  {
    id: 6,
    tipo: "buraco",
    titulo: "Buraco no pavimento",
    descricao: "Série de 3 buracos consecutivos na Av. Mister Hull sentido bairro. Trânsito lento e veículos desviando para calçada.",
    bairro: "Antônio Bezerra",
    status: "recebido",
    confirmacoes: 15,
    data: "há 1 dia",
    urgencia: "amarelo"
  },
  {
    id: 7,
    tipo: "iluminacao",
    titulo: "Falha na iluminação pública",
    descricao: "7 postes apagados na Rua Pereira Filgueiras. Área residencial densa sem iluminação há 2 semanas.",
    bairro: "Cocó",
    status: "analise",
    confirmacoes: 19,
    data: "há 6 dias",
    urgencia: "amarelo"
  },
  {
    id: 8,
    tipo: "lixo",
    titulo: "Descarte irregular de resíduos",
    descricao: "Entulho de obra descartado irregularmente bloqueando parte da calçada na Rua Barbosa de Freitas.",
    bairro: "Aldeota",
    status: "resolvido",
    confirmacoes: 11,
    data: "há 10 dias",
    urgencia: "verde"
  },
  {
    id: 9,
    tipo: "esgoto",
    titulo: "Bueiro entupido e alagamento",
    descricao: "Bueiro completamente entupido na Av. João Pessoa. A cada chuva o trecho alaga e invade casas vizinhas.",
    bairro: "Lagamar",
    status: "recebido",
    confirmacoes: 54,
    data: "há 4 horas",
    urgencia: "vermelho"
  },
  {
    id: 10,
    tipo: "buraco",
    titulo: "Buraco no pavimento",
    descricao: "Buraco profundo no cruzamento da Rua Valparaíso com Rua Buenos Aires. Pneus de veículos já foram danificados.",
    bairro: "Montese",
    status: "andamento",
    confirmacoes: 33,
    data: "há 4 dias",
    urgencia: "vermelho"
  },
];

var vaquinhas = [
  {
    id: 1,
    titulo: "Revitalização da Praça do Pirambu",
    descricao: "A praça principal do bairro está abandonada há 3 anos. Queremos reformar o parquinho, plantar árvores e instalar iluminação solar.",
    bairro: "Pirambu",
    arrecadado: 4750,
    meta: 9000,
    apoiadores: 112,
    dias: 14,
    urgencia: "vermelho"
  },
  {
    id: 2,
    titulo: "Conserto do bueiro da Rua das Flores",
    descricao: "Bueiro entupido causa alagamento a cada chuva, prejudicando 8 famílias. A prefeitura não deu resposta em 6 meses.",
    bairro: "Parangaba",
    arrecadado: 1920,
    meta: 2200,
    apoiadores: 51,
    dias: 3,
    urgencia: "amarelo"
  },
  {
    id: 3,
    titulo: "Iluminação solar no campo do Bom Jardim",
    descricao: "Campo de futebol sem luz há 2 anos. Jovens do bairro precisam de um espaço seguro para o esporte à noite.",
    bairro: "Bom Jardim",
    arrecadado: 2100,
    meta: 6000,
    apoiadores: 78,
    dias: 21,
    urgencia: "amarelo"
  },
  {
    id: 4,
    titulo: "Pintura e sinalização da Escola Municipal",
    descricao: "A escola está com a fachada deteriorada e sem faixa de pedestres. Segurança das crianças em risco.",
    bairro: "Granja Lisboa",
    arrecadado: 890,
    meta: 3500,
    apoiadores: 34,
    dias: 30,
    urgencia: "amarelo"
  },
];

// Helpers compartilhados
var cores = {
  verde:    { hex: "#16a34a", bg: "#dcfce7" },
  amarelo:  { hex: "#d97706", bg: "#fef3c7" },
  vermelho: { hex: "#dc2626", bg: "#fee2e2" },
};

var statusInfo = {
  recebido:  { label: "Recebido",     classe: "badge-recebido",  prog: 15  },
  analise:   { label: "Em análise",   classe: "badge-analise",   prog: 35  },
  andamento: { label: "Em andamento", classe: "badge-andamento", prog: 65  },
  resolvido: { label: "Resolvido",    classe: "badge-resolvido", prog: 100 },
};

var tipoIcone = {
  buraco:     "🕳️",
  iluminacao: "💡",
  lixo:       "🗑️",
  esgoto:     "🚰",
  agua:       "💧",
  outro:      "⚠️",
};

var tipoSetor = {
  buraco:     "SEINFRA — Secretaria de Infraestrutura",
  iluminacao: "ENEL Distribuição Ceará",
  lixo:       "SEUMA — Secretaria de Meio Ambiente",
  esgoto:     "CAGECE — Companhia de Água e Esgoto",
  agua:       "CAGECE — Companhia de Água e Esgoto",
  outro:      "Central 156 — Atendimento ao Cidadão",
};