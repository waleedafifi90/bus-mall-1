'use strict';


// Creating array to contain the names for each porduct image
let productArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

// Getting the input, button from the html document
let inputSession = document.getElementById('number-input');
let objectData = document.getElementById('object-data');
let sessionButton = document.getElementById('session-button');

//creating global array to contain the object new inctances
let all = [];

//creating variables to track appearence and the clicks for each images
let maxIterations; //specifying the session long
let iteration = 0; // initializing the iterator for session long

// a flag intializations to track which index in the array image is clicked
let leftClickflag = 0;
let middleClickflag = 0;
let rightClickflag = 0;

// Getting the section elements which will contain the images
const productImageSection = document.getElementById('img-section');
const leftProductImgae = document.getElementById('img-left');
const middleProductImgae = document.getElementById('img-middle');
const rightProductImgae = document.getElementById('img-right');

//creating the constructor
const Prodcut = function (name, ex) {
  this.name = name; //stores the name of the image
  this.image = `../assets/${name}.${ex}`; //stors the path for the image
  this.timesShown = 0; // track how many times the image shown
  this.clicks = 0; // track how many time the image got voted
  this.all = all.push(this); // pushing the methods to the global array
};

for (let index = 0; index < productArray.length; index++) {
  // this loop is to add the right path for each image

  if (productArray[index].toLocaleLowerCase().includes('.gif')) {
    // if the image ends with gif, create a new instance with the right path
    new Prodcut(productArray[index].replace('.gif', ''), 'gif');
  } else if (productArray[index].toLocaleLowerCase().includes('.png')) {
    // if the image ends with png, create a new instance with the right path
    new Prodcut(productArray[index].replace('.png', ''), 'png');
  } else {
    // if the image ends with jpg, create a new instance with the right path
    new Prodcut(productArray[index].replace('.jpg', ''), 'jpg');
  }
}

const randImagesIndex = function (min, max) {
  //this method creats a random number inclusive to min/max arguments passed to it
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const imgGenerate = function () {
  //this function is to render the images and update the global array with how many times each img shown
  let leftRandIndex = randImagesIndex(0, productArray.length - 1); // picking a random img for the left section

  // adding the random img path to the left img element in the html
  leftProductImgae.src = all[leftRandIndex].image;
  leftProductImgae.alt = all[leftRandIndex].name;

  //updating the number of appearance proparity for the img in the global array
  all[leftRandIndex].timesShown++;

  //assigning the img index in a global variable to increase the clicks of the image onClick
  leftClickflag = leftRandIndex;

  // creating the variables for the middle section and the right section
  let middleRandIndex;
  let rightRandIndex;

  do {
    middleRandIndex = randImagesIndex(0, productArray.length - 1);
  } while (leftRandIndex === middleRandIndex);

  do {
    rightRandIndex = randImagesIndex(0, productArray.length - 1);
  } while (rightRandIndex === middleRandIndex || rightRandIndex === leftRandIndex);

  // adding the random img path to the middle img element in the html
  middleProductImgae.src = all[middleRandIndex].image;
  middleProductImgae.alt = all[middleRandIndex].name;

  //updating the number of appearance proparity for the img in the global array
  all[middleRandIndex].timesShown++;

  //assigning the img index in a global variable to increase the clicks of the image onClick
  middleClickflag = middleRandIndex;

  // adding the random img path to the middle img element in the html
  rightProductImgae.src = all[rightRandIndex].image;
  rightProductImgae.alt = all[rightRandIndex].name;

  //updating the number of appearance proparity for the img in the global array
  all[rightRandIndex].timesShown++;

  //assigning the img index in a global variable to increase the clicks of the image onClick
  rightClickflag = rightRandIndex;
};
imgGenerate(); //involing the function to display a random three images

function appendData() {
  //this funtion basiclly append the data as un-ordered list
  let liElement;
  let msg;
  for (let index = 0; index < all.length; index++) {
    //looping over the global array to print it's proparties values as a msg to the user
    liElement = document.createElement('li');
    objectData.appendChild(liElement);
    msg = `${all[index].name} had ${all[index].clicks} votes, and was seen ${all[index].timesShown} times.`;
    liElement.textContent = msg;
  }
}

function sessionValidated() {
  //this function just to be invoked in a specific condition
  productImageSection.addEventListener('click', function productImage(event) {
    /*adding event listener to the images, so when the image is clicked a random imgs will be generated
    and the clicked images click attribute uodates by 1  */

    if (iteration < maxIterations) {
      let clickedElement = event.target; // specifying the clicked image
      if (
        clickedElement.id === 'img-left' ||
        clickedElement.id === 'img-middle' ||
        clickedElement.id === 'img-right'
      ) {
        if (clickedElement.id === 'img-left') {
          all[leftClickflag].clicks++;
        }
        if (clickedElement.id === 'img-middle') {
          all[middleClickflag].clicks++;
        }
        if (clickedElement.id === 'img-right') {
          all[rightClickflag].clicks++;
        }
      }
      iteration++; //update the iteration to reach the maxIterations
      imgGenerate(); // generate a new imgs after an img was clicked
    }

    if (iteration === maxIterations) {
      //this check is for the end of the session
      alert('End of session, Thank you for your time!');
      appendData(); //apeending the statistical data just after the user finish the session of voting
      productImageSection.removeEventListener('click', productImage); // removing the event listner
    }
  });
}

sessionButton.addEventListener('click', function (event) {
  event.preventDefault();
  //this event listener is for the submit button which takes the session value from the user
  maxIterations = Number(inputSession.value);

  //make sure that the user enter a value in range of 1-25
  if (maxIterations === undefined || maxIterations <= 0 || maxIterations > 25) {
    // if he entered a value within the range 1-25 an alert would pop-up
    alert('Please insert from 1 to 25');
  } else {
    sessionValidated();
    sessionButton.disabled = true;
  }
});
