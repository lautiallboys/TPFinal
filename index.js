var IA;
var TA;
var P;
var N=5;
var M=5;
var PA=5;
var CP=5;
var T=0;
var TF=50000;
var NS=0;
var NS_P=0;
var TPLL =0;
var TPS= new Array(N);
var TPS_P = Infinity;
var EXC_M=0;
var STA;
var SS=0;
var SLL=0;
var NT=0;
var NT_P=0;


function inicVector(){
  for(i=0;i<N;i++){
  TPS[i]=Infinity;
  }
}


function buscarMenor(array,n){
  var pos=0;
  var min = array[0];
  for(i=0;i<n;i++){
    if(array[i]<min){
      min = array[i];
      pos =i;
    }
  }
  return pos;
}

function rutinaMejorN(){
  return 5; 
}

function rutinaP(){
  return Math.floor(Math.random() * (7 - 1)) + 1;
}

function rutinaIA(i){
  switch(i){
    case 0: {
      return 8571.3*(-1*Math.log(1/(Math.random()-1)))+7107.2;
    }
    case 1: {
      return 2*6316.9/Math.PI*(Math.log(Math.tan(Math.random()*Math.PI/2)))+939.02;
    }

  }

}

function rutinaTA(i){
  switch(i){
    case 0: {
      return 18046*(Math.pow((Math.pow(Math.random(), 1 / -0.21841)-1), 1 / -3.2078));
    }
    case 1: {
      return Math.exp((Math.random()+1.258)/0.1867);
    }

  }

}

function Simular(){
 
  var i=buscarMenor(TPS, N);
  if(TPLL <= TPS[i] && TPLL <= TPS_P){
    T=TPLL;
    IA= rutinaIA(0);
    P=rutinaP();
    TPLL = T + IA;
    NS++;
    if(NS>M){
      N++;
      EXC_M++;
    }
    if((NS=>CP) && (P=>PA)){
      NS--;
      NS_P++;
      if(NS_P==1){
        TA=rutinaTA(0);
        TPS_P = T + TA;
        STA+=TA;
      }
    }
    else{
      if(NS<=N){
        j=rutinaMejorN();
        TA=rutinaTA(0);
        STA+=TA;
      }
    }
    SLL +=T;  
  }
  else if((TPLL=> TPS[i]) && (TPS_P=> TPS[i])){
    T=TPS[i];
    NS--;
    if(NS=>N){
      TA=rutinaTA(0);
      TPS[i]=T+TA;
      STA+=TA;
    }
    else{
      TPS[i]=Infinity;
    }
    SS+=T;
    NT++;
  }
  else{
    T=TPS_P;
    NS_P--;
    if(NS_P=>1){
      TA=rutinaTA(0);
      TPS_P = T + TA;
      STA+=TA;
    }
    else{
      TPS_P=Infinity;
    }
    SS+=T;
    NT_P++;
  }

if(T<=TF)
{
  Simular();
} 
else{
  if((NS>0) || (NS_P>0)){
  TPLL=Infinity;
    }
   else{
     console.log("PEC",(SS-SLL-STA)/(NT+NT_P));
     console.log("PEXC_M",(EXC_M*100)/(NT+NT_P));
     console.log("Cantidad Dispatchers",N);
     console.log("Maximo tickets acumulados",M);
     console.log("Prioridad de atencion de tickets",PA);
     console.log("Cantidad tickets para abrir cola",CP);
   } 
  }
}

Simular();

