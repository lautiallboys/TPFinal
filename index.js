var IA;
var HV = Infinity;
var TA;
var P;
var P_AGR = 0;
var N = 4;
var M = 10;
var PA = 7;
var CP = 5;
var MP = 1;
var T = 0;
var TF = 5000000 / 60;
var NS = 0;
var NS_P = 0;
var TPLL = 0;
var TPS = new Array(N);
var TPS_P = Infinity;
var EXC_M = 0;
var STA = 0;
var SS = 0;
var SLL = 0;
var NT = 0;
var NT_P = 0;


function inicVector() {
  for (i = 0; i < N; i++) {
    TPS[i] = Infinity;
  }
}

inicVector();


function buscarMenor(array, n) {
  var pos = 0;
  var min = array[0];
  for (i = 0; i < n; i++) {
    if (array[i] < min) {
      min = array[i];
      pos = i;
    }
  }
  return pos;
}

function rutinaMejorN() {
  for(i = 0; i < N; i++) {
    if (TPS[i] == Infinity) {
      return i;
    }
  }
  return 0
}

function rutinaP() {
  return Math.floor(Math.random() * (7 - 1)) + 1;
}

function rutinaIA(i) {
  var lowBound0 = 0.30385
  var lowBound1 = 0.4264
  switch (i) {
    case 0: {
      var floor = Math.random() * (1 - lowBound0) + lowBound0;
      return Math.round(((-8571.3 * Math.log((1 / floor) - 1)) + 7107.2) / 60);
    }
    case 1: {
      var floor = Math.random() * (1 - lowBound1) + lowBound1;
      return Math.round((2 * 6316.9 / Math.PI * (Math.log(Math.tan(floor * Math.PI / 2))) + 939.02) / 60);
    }

  }

}

function rutinaTA(i) {
  var low0 = 0.0
  var low1 = 0.4264
  switch (i) {
    case 0: {
      var floor = Math.random() * (1 - low0) + low0;
      return Math.round((18046 * (Math.pow((Math.pow(floor, 1 / -0.21841) - 1), 1 / -3.2078))) / 60);
    }
    case 1: {
      var floor = Math.random() * (1 - low1) + low1;
      return Math.round((Math.exp((floor + 1.258) / 0.1867)) / 60);
    }

  }

}

function Simular() {

  var i = buscarMenor(TPS, N);

  if (TPLL <= TPS[i] && TPLL <= TPS_P) {
    T = TPLL;
    IA = rutinaIA(1);
    P = rutinaP();
    TPLL = T + IA;
    NS++;
    if (NS > M) {
      EXC_M++;
      
      if (P_AGR < 8) {
        TPS.push(Infinity);
        N++;
        P_AGR++;
      }
    }
    if ((NS => CP) && (P => PA) && (MP == 1)) {
      NS--;
      NS_P++;
      if (NS_P == 1) {
        TA = rutinaTA(1);
        TPS_P = T + TA;
        STA += TA;
      }
    }
    else {
      if (NS <= N) {
        j = rutinaMejorN();
        TA = rutinaTA(1);
        TPS[j] = T + TA;
        STA += TA;
      }
    }
    SLL += T;
  }
  else if ((TPLL > TPS[i]) && (TPS_P => TPS[i])) {
    T = TPS[i];    
    NS--;
    if (NS => N) {
      TA = rutinaTA(1);
      TPS[i] = T + TA;
      STA += TA;
    }
    else {
      TPS[i] = Infinity;
    }
    SS += T;
    NT++;
  }
  else {
    T = TPS_P;
    NS_P--;
    if (NS_P => 1) {
      TA = rutinaTA(1);
      TPS_P = T + TA;
      STA += TA;
    }
    else {
      TPS_P = Infinity;
    }
    SS += T;
    NT_P++;
  }

  if (T <= TF) {
    Simular();
  } else {
    if ((NS > 0) || (NS_P > 0)) {
      console.log("NS: " + NS)
      console.log("NS_P: " + NS_P)
      console.log("NT: " + NT)
      console.log(SS + " " + SLL + " " + STA)
      TPLL = Infinity;
      Simular();
    }
    else {
      
      console.log("PEC", (SS - SLL - STA) / (NT + NT_P));
      console.log("PEXC_M", (EXC_M * 100) / (NT + NT_P));
      console.log("Cantidad Dispatchers", N);
      console.log("Maximo tickets acumulados", M);
      console.log("Prioridad de atencion de tickets", PA);
      console.log("Cantidad tickets para abrir cola", CP);
    }
  }
}

Simular();