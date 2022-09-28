'use strict'

/*
if(retrievedDucks){
  for(let i = 0; i < parsedDucks.length; i++){
    if(parsedDucks[i].name === 'sweep'){
      let reconstructedSweep = new Duck(parsedDucks[i].name, 'png');
      reconstructedSweep.votes = parsedDucks[i].votes;
      reconstructedSweep.views = parsedDucks[i].views;
    } else{
      let reconstructedSweep = new Duck(parsedDucks[i].name);
      reconstructedSweep.votes = parsedDucks[i].votes;
      reconstructedSweep.views = parsedDucks[i].views;

    }
  }
} else{
  new Duck('bag');
  new Duck('banana');
  new Duck('bathroom');
  new Duck('boots');
  new Duck('breakfast');
  new Duck('bubblegum');
  new Duck('chair');
  new Duck('cthulhu');
  new Duck('dog-duck');
  new Duck('dragon');
  new Duck('pen');
  new Duck('pet-sweep');
  new Duck('scissors');
  new Duck('shark');
  new Duck('sweep','png');
  new Duck('tauntaun');
  new Duck('unicorn');
  new Duck('water-can');
  new Duck('wine-glass');
}
  */

'use strict';
console.log('Is this thing on?');

//--------Global Variables -----------------------------------
let voteCount = 25;
let duckArray = [];
let canvasElem = document.getElementById('my-chart');

//-------- DOM References ------------------------------------
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
/*let resultsContainer = document.getElementById('results-container');*/
imgOne.addEventListener('click', handleClick);
imgTwo.addEventListener('click', handleClick);
imgThree.addEventListener('click', handleClick);

//-------- Constructor Function ------------------------------

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;

  duckArray.push(this);
}

//-------- Helper Function / Utilities -----------------------

function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}
let noRepeat = [];

function renderImgs(){
  while (noRepeat.length < 6) {
    let randomNum = randomIndex();
    if (!noRepeat.includes(randomNum)) {
      noRepeat.push(randomNum);
    }
  }
  let imgOneIndex = noRepeat.shift();
  let imgTwoIndex = noRepeat.shift();
  let imgThreeIndex = noRepeat.shift();

  /*
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();
*/
  /*
  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }
  while(imgOneIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }
  while(imgTwoIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }*/
  console.log(imgOneIndex);
  console.log(imgTwoIndex);
  console.log(imgThreeIndex);
  console.log(noRepeat);

  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;
  imgThree.src = duckArray[imgThreeIndex].img;

  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;
  duckArray[imgThreeIndex].views++;

  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
  imgThree.alt = duckArray[imgThreeIndex].name;
}
//------------Canvas / Chart Function
function renderChart() {
  let duckNames = [];
  let duckVotes = [];
  let duckViews = [];

  for (let i = 0; i < duckArray.length; i++) {
    duckNames.push(duckArray[i].name);
    duckVotes.push(duckArray[i].votes);
    duckViews.push(duckArray[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: duckNames,
      datasets: [
        {
          data: duckVotes,
          label: '# of Votes',
          backgroundColor: ['grey'],
          borderColor: ['yellow'],
          borderWidth: 5,
        },
        {
          data: duckViews,
          label: '# of Views',
          backgroundColor: ['grey'],
          borderColor: ['blue'],
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks:{color:'black'},
        },
        x: {
          ticks:{color:'black'},
        }
      },
    },
  };

  new Chart(canvasElem, myChartObj);
}

//-------------------- Event Handlers ---------------------

function handleClick(event){
  /*console.dir(event.target);*/
  let imgClicked = event.target.alt;
  /*console.log('img clicked >>', imgClicked);*/
  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){
      duckArray[i].votes++;
    }
  }
  voteCount--;

  renderImgs();

  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
    //---------local storage------------------------------------
    let stringifiedDucks = JSON.stringify(duckArray);

    console.log('stringified ducks >>>', stringifiedDucks);

    localStorage.setItem('myDucks', stringifiedDucks);
  }
}

function handleShowResults(){
  if(voteCount === 0){
  /*  for(let i = 0; i < duckArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name} had ${duckArray[i].clicks} votes, and was seen ${duckArray[i].views} times`;
      resultsContainer.appendChild(liElem);
    }*/
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//-----------------more local storage code
//---------- Pull DATA out of Local Storage
let retrievedDucks = localStorage.getItem('myDucks');
console.log('retrievedDucks >>>', retrievedDucks);

//---- Step 4 - Parse my data into code my app can use
let parsedDucks = JSON.parse(retrievedDucks);

console.log('parsed Ducks >>>', parsedDucks);
//------------- EXECUTABLE CODE ----------------------------//

if(retrievedDucks){
  duckArray = parsedDucks;
} else{
  new Duck('bag');
  new Duck('banana');
  new Duck('bathroom');
  new Duck('boots');
  new Duck('breakfast');
  new Duck('bubblegum');
  new Duck('chair');
  new Duck('cthulhu');
  new Duck('dog-duck');
  new Duck('dragon');
  new Duck('pen');
  new Duck('pet-sweep');
  new Duck('scissors');
  new Duck('shark');
  new Duck('sweep','png');
  new Duck('tauntaun');
  new Duck('unicorn');
  new Duck('water-can');
  new Duck('wine-glass');
}
  
renderImgs();
  
/*new Chart(canvasElem, myChartObj);*/

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
