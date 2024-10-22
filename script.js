let mean, median, mode, double, triple
mean = document.getElementById("mean");
median = document.getElementById("median");
mode = document.getElementById("mode");
double = document.getElementById("double");
triple = document.getElementById("triple"); 
tbl = document.getElementById("table1");

let initialize = () => {
  setMax();  
}

//Doesn't allow input under 1 for any input and input over 3 for # of dice
let setMax = () => {
  let num = document.getElementById("numOfDice");
  let num2 = document.getElementById("numOfRolls")
  num.addEventListener("input", function(e) {
      if(num.value>3) {
          alert("Maximum value reached! ");
          num.value = 3;
      }
      if(num.value<1) {
        alert("Minimum value must be 1! ");
        num.value = 1;
      }
    }
  )
  num2.addEventListener("input", function(e){
    if(num2.value<1) {
      alert("Minimum value must be 1! ");
      num2.value = 1;
    }
  })
}

//Call on specific methods based on # of dice
let rollDice = () => {
  setTable();
  numOfDice = document.getElementById("numOfDice").value;
  numOfRolls = document.getElementById("numOfRolls").value;
  table=document.getElementById("table1");

  (numOfDice==="1")?rollWhenDiceEq1():(numOfDice==="2")?rollWhenDiceEq2():rollWhenDiceEq3();

  const node = document.querySelector(".rollButton");

  if (node.style.backgroundColor == "rgb(255, 125, 0)") {
    node.style.backgroundColor = "#78290F";
  } else{
    node.style.backgroundColor = "#FF7D00";
  }
}

//Set the table length based on # of dice
let setTable = () =>{
  numOfDice = document.getElementById("numOfDice").value;
  tblBody = document.createElement("tbody");
  while(tbl.rows.length>1){
    tbl.deleteRow(1);
  }
  for(i = numOfDice; i<=numOfDice*6; i++){
    row = document.createElement("tr");
    col0 = document.createElement("td");
    col1 = document.createElement("td");
    const cellText = document.createTextNode(`${i}`);
    col0.appendChild(cellText);
    row.appendChild(col0);
    const cellText1 = document.createTextNode("0");
    col1.appendChild(cellText1);
    row.appendChild(col1);
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
}

//Roll when # of dice is 1
let rollWhenDiceEq1 = () => {
  const array1 = [];
  for(a=1; a<=numOfRolls; a++){
    let roll = Math.floor(Math.random()*6)+1;
    array1.push(roll);
  }

  findMeannMedian(array1);

  for(row=1; row<=table.rows.length; row++){
      for(index = 0; index<array1.length; index++){
        value = array1[index];
        if(table.rows[row] && table.rows[row].cells[0] && value==table.rows[row].cells[0].innerHTML){
          table.rows[row].cells.item(1).innerHTML = parseInt(table.rows[row].cells.item(1).innerHTML)+1;
        }
      }
    }
    findMode();
}

//Roll when # of dice is 2
let rollWhenDiceEq2 = () => {
  const array1 = [];
  const array2 = [];
  const final = [];
  for(a=1; a<=numOfRolls; a++){
    let roll = Math.floor(Math.random()*6)+1;
    let roll1 = Math.floor(Math.random()*6)+1;
    array1.push(roll);
    array2.push(roll1);
    final.push((roll+roll1));
  }
  let currentDouble = 0;
  for(a = 0; a<array1.length; a++){
    if(parseInt(array1[a])==parseInt(array2[a])){
      currentDouble++;
    }
  }
  double.innerHTML = currentDouble;
  findMeannMedian(final);
  
  for(row=1; row<=table.rows.length; row++){
    for(index = 0; index<final.length; index++){
      value = final[index];
      if(table.rows[row] && table.rows[row].cells[0] && value==table.rows[row].cells[0].innerHTML){
        table.rows[row].cells.item(1).innerHTML = parseInt(table.rows[row].cells.item(1).innerHTML)+1;
      }
    }
  }

  findMode();
}

//Roll when # of dice is 3
let rollWhenDiceEq3 = () => {
  const array1 = [];
  const array2 = [];
  const array3 = [];
  const final = [];
  
  for(a=1; a<=numOfRolls; a++){
    let roll = Math.floor(Math.random()*6)+1;
    let roll1 = Math.floor(Math.random()*6)+1;
    let roll2 = Math.floor(Math.random()*6)+1
    array1.push(roll);
    array2.push(roll1);
    array3.push(roll2);
    final.push((roll+roll1+roll2)); 
  }
  findMeannMedian(final);
  
  for(row=1; row<table.rows.length; row++){
    for(index = 0; index<final.length; index++){
      value = final[index];
      if(table.rows[row] && table.rows[row].cells[0] && value==table.rows[row].cells[0].innerHTML){
        table.rows[row].cells.item(1).innerHTML = parseInt(table.rows[row].cells.item(1).innerHTML)+1;
      }
    }
  }

  let currentDouble = 0;
  let currentTriple = 0;
  for(a = 0; a<array1.length; a++){
    if(parseInt(array1[a])==parseInt(array2[a]) || parseInt(array2[a])==parseInt(array3[a])){
      currentDouble++;
    }
    if(parseInt(array1[a])==parseInt(array2[a]) && parseInt(array2[a])==parseInt(array3[a])){
      currentTriple++;
    }
  }
  double.innerHTML = currentDouble;
  triple.innerHTML = currentTriple;

  findMode();
}

//Find mean and median
function findMeannMedian(array){
  //finding mean
  console.log(array);
  let sum = 0;
  for(ind=0; ind<array.length; ind++){
    sum+= array[ind];
  }
  currentMean = Math.round((sum/array.length) * 100)/100;
  mean.innerHTML = currentMean;

  //finding median
  const newArray = array.toSorted(function(a, b){return a-b});
  if((newArray.length) %2 == 1){
    currentMedian = newArray[Math.floor(newArray.length/2)]    
  } else{
    currentMedian = (newArray[(newArray.length/2)]+newArray[(newArray.length/2)-1])/2;
  }
  median.innerHTML = currentMedian;
  
}

//find mode
function findMode(){
  //finding mode
  tbl = document.getElementById("table1");
  const frqArray = [];
  for(row=1; row<=tbl.rows.length; row++){
    if(table.rows[row] && table.rows[row].cells[0]){
      frqArray.push(table.rows[row].cells[1].innerHTML);
    }

  } 
  frqArray.sort();
  
  len = frqArray.length;
  if(parseInt(frqArray[len-1])>parseInt(frqArray[len-2])){
    mode.innerHTML = frqArray[len-1];
  }    

}
  