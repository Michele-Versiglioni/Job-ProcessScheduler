// DICHIARAZIONE VARIABILI GLOBALI
let p = ["P1", "P2", "P3"];
let at = [3, 2, 5];
let bt = [2, 4, 2];
let rbt = []; //quando clicco il bottone start il nostro codice deve copiare il contenuto di bt all'interno di rbt
let wt = [];
let op = [];
let t;


let idfirst;
let tottime;

/* FUNZIONE RESET
 1) La tabella dei processi viene sostituita con una tabella vuota
 2) Il tempo di evoluzione t viene inizializzato a 0
 3) Il contenuto dei div relativi ai messaggi di output viene cancellato
*/

function reset(){
   //1) La tabella dei processi viene sostituita con una tabella vuota
  let tableEl = document.getElementById("idTable");
  let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0]; //con la s su element restituisce più elementi
 let newTBodyEl = document.createElement('tbody'); //creatrElement crea un tag
  //2) Il tempo di evoluzione t viene inizializzato a 0
  t = 0;
 
  tableEl.replaceChild(newTBodyEl, oldTBodyEl);

  //3) Il contenuto dei div relativi ai messaggi di output viene cancellato
  document.getElementById("idTime").innerHTML = "";
  document.getElementById("idStatistics").innerHTML = "";
}

/* FUNZIONE START
 1) si inizializzano le variabili relative al tempo del processore t e tottime
 2) si inizializzano gli array rbt, wt, op
 3) si mostra la variabile tempo t
 4) si inseriscono nel corpo della tabella i dati dei processi (nome, tempo di arrivo, tempo di burst)
 5) si ordina (Selection sort) l'array op con l'indice dei processi in funzione dell'algoritmo di scheduling scelto
 (FCFS: ordine in base al tempo di arrivo at[i] > at[j])
 6) si determina il primo processo da eseguire aggiornando idfirst
*/
function start(){
  let i;
   //1) si inizializzano le variabili relative al tempo del processore t e tottime
   t = 0;  
  tottime = 0;
  //rbt = bt;
 //2) si inizializzano gli array rbt, wt, op
for(let i = 0; i<bt.length; i++){
  rbt[i] = bt[i];
  wt[i] = 0;
  op[i] = i;
}
   //3) si mostra la variabile tempo t
   document.getElementById("idTime").innerHTML = "Tempo: " + t;

   //4) si inseriscono nel corpo della tabella i dati dei processi (nome, tempo di arrivo, tempo di burst)
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');
   
   for(i=0; i<p.length; i++) {
      const trEl = newTBodyEl.insertRow(); //tr
      let tdEl = trEl.insertCell(); //td
      tdEl.appendChild(document.createTextNode(p[i]));
      tdEl = trEl.insertCell(); // td con valore
      tdEl.appendChild(document.createTextNode(at[i]));
      tdEl = trEl.insertCell(); //td con valore
      tdEl.appendChild(document.createTextNode(bt[i]));
      tdEl = trEl.insertCell(); //td con vaore
      tdEl.id = "idP" + i;
      tdEl.appendChild(document.createTextNode(rbt[i]));
      }
   
  tableEl.replaceChild(newTBodyEl, oldTBodyEl); //replaceChild prende il vecchio tag e lo sostituisce con uno nuovo
  // 5) si ordina (Selection sort) l'array op con l'indice dei processi in funzione dell'algoritmo di scheduling scelto
 //(FCFS: ordine in base al tempo di arrivo at[i] > at[j])
  let j, temp;
console.log(op);
for (i=0;i<p.length - 1;i++)
 for (j=i+1;j<p.length;j++){
   if (at[i] > at[j]) {
     temp=op[i];
     op[i]=op[j];
     op[j]=temp;
   }
 }
   //6) si determina il primo processo da eseguire aggiornando idfirst
console.log("ordine processi: "+op);
  idfirst = op[0];
 
     
}
/* FUNZIONE STEP
 Lo scopo della funzione è determinare ad ogni passo lo stato dei processi:
 NEW (processo non arrivato) - colore bianco
 READY (processo arrivato, ma non ancora in esecuzione) - colore bianco
 RUNNING (processo arrivato e con id corrispondente a idfirst, cioè scelto dallo scheduler) - colore verde
 TERMINATED (processo arrivato e con tempo di burst rimanente nullo) - colore rosso
 NB:
 - ogni volta che il processo è in READY si deve incrementare il tempo di attesa wt
 - quando il processo termina viene tolto dalla lista di ready
 
 1) si incrementa il tempo ad ogni click
 2) si visualizzano il tempo totale e il tempo di esecuzione del processore
 3) si verifica se ci sono ancora processi in ready list e si confrontano i processi dell'array p
 con quelli della ready list; solo un processo diminuirà il rbt, gli altri aumenteranno il wt
 4) se non ci sono processi in ready list si determina l'efficienza dell'algoritmo invocando la funzione findWaitingTime
(tempo di attesa media, tempo di turnaround totale, ...)
*/

function step(){
  let i;
  //1) si incrementa il tempo ad ogni click
  t=t + 1;
  //2) si visualizzano il tempo totale e il tempo di esecuzione del processore
  console.log("Tempo totale: " + tottime);
  console.log("Tempo; " + t);
  if (op.length>0){
 for (let i = 0; i<p.length; i++) {
   console.log("primo processo: " + idfirst);




   if (at[i]<=t){
     console.log(p[i] + " arrivato");
     if (rbt[i]>0)
     {
       console.log(p[i] + " arrivato con rbt>0");
       if (i==idfirst){
         console.log("processo arrivato ed in esecuzione: " + p[i]);
         rbt[i]-=1;
         document.getElementById("idP"+i).style.backgroundColor = "green";
         document.getElementById("idP"+i).innerHTML = rbt[i];
       }
       else{
         wt[i]+=1;
         console.log("processo arrivato in attesa con tempo rbt>0: " + p[i]);
         document.getElementById("idP"+i).style.backgroundColor = "white";
       }
     }
     else
     {
       console.log("processo terminato " + p[i]);
       document.getElementById("idP"+i).style.backgroundColor = "red";
       if (op.indexOf(i)!=-1){
         console.log("CC");
         op.shift();
         console.log("shift: " + op);
         idfirst = op[0];
       }
     }
   }
   else {
       document.getElementById("idP"+i).style.backgroundColor = "white";
       console.log("processo non arrivato: " + p[i]);
       }
   console.log("----------------")
 }
 document.getElementById("idTime").innerHTML = "Tempo: " + t;
}
// 4) se non ci sono processi in ready list si determina l'efficienza dell'algoritmo invocando la funzione findWaitingTime (tempo di attesa media, tempo di turnaround totale, ...)
else {
 document.getElementById("idTime").innerHTML = "Processi terminati";
 document.getElementById("idStatistics").innerHTML = "Tempo di attesa medio: " + findWaitingTime();
}
}
/*FUNZIONE FINDWAITINGTIME
1) si accumula il tempo di attesa dei processi
2) si calcola il tempo medio di attesa*/
function findWaitingTime() {
  // 1) Si accumula il tempo di attesa dei processi
  let totalWaitingTime = 0;
  for (let i = 0; i < wt.length; i++) {
    totalWaitingTime += wt[i];
  }
 
  // 2) Si calcola il tempo medio di attesa
  let averageWaitingTime = totalWaitingTime / wt.length;
 
  return averageWaitingTime.toFixed(2); // Restituisce il risultato con due cifre decimali
}
