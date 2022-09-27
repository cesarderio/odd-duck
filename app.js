'use strict';

console.log('hey there hey!');

//--------Global Variables --------------------------------------//

let voteCount = 25;
let duckArray = [];

//-------- DOM References ---------------------------------------//

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');
/*
function Goose(){
  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === 'sweep'){
      fileExtension = 'png'
      duckArray.push(fileExtension);
} else{
  fileExtension = 'jpg'
  duckArray.push(fileExtension);
}
Goose();
*/

//-------- Constructor Function --------------------------------//

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  /*this.fileExtension = name.split('.').pop();*/
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  /*
  if(this.name === 'sweep'){
    fileExtension = 'png';
  }
  */


  duckArray.push(this);
}

duckArray.push(this);

//-------- Helper Function / Utilities -------------------------//
function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}

function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }
  while(imgOneIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }
  while(imgTwoIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }

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

//-------------------- Event Handlers --------------------------//

function handleClick(event){
  console.dir(event.target);
  let imgClicked = event.target.alt;

  //---------- Keep vote count for images clicked --------------//

  console.log('img clicked >>', imgClicked);

  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){
      // increase vote counts
      duckArray[i].clicks++;
    }
  }

  //--------------decrement vote count ------------------------//
  voteCount--;

  //-------------- Render and Reload new images ---------------//
  renderImgs();

  //-------------- End clicks after 25 voting Rounds ----------//
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

//------------------ Display Results -------------------------//
function handleShowResults(){
  if(voteCount === 0){
    for(let i = 0; i < duckArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name} had ${duckArray[i].clicks} votes, and was seen ${duckArray[i].views} times`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//------------- EXECUTABLE CODE ----------------------------//

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

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
