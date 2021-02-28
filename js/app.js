'use strict';

/* Feature Tasks

1. display three unique products by chance so that the viewers can pick a favorite.

FINISHED: Create a constructor function that creates an object associated with each product, and has the following properties:
- Name of the product
- File path of image //BUG BUG BUG
- Times the image has been shown.

FINISHED: Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

FINISHED: For each of the three images, increment its property of times it has been shown by one.

FINISHED: Attach an event listener to the section of the HTML page where the images are going to be displayed.

FINISHED: Once the users ‘clicks’ a product, generate three new products for the user to pick from.

2. As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.

FINISHED: In the constructor function define a property to hold the number of times a product has been clicked.

FINISHED: After every selection by the viewer, update the newly added property to reflect if it was clicked.

3. As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.

FINISHED: By default, the user should be presented with 25 rounds of voting before ending the session.

FINISHED: Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

4. As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.

TODO: Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

TODO: After voting rounds have been completed, remove the event listeners on the product.

TODO: Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.
*/

// Creating array to contain the names for each porduct image
let productArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];
let inputSession = document.getElementById('number-input');
let objectData = document.getElementById('object-data');
let sessionButton = document.getElementById('session-button');
let all = [];
let maxIterations;
let iteration = 0;
let leftClickflag = 0;
let middleClickflag = 0;
let rightClickflag = 0;

const productImageSection = document.getElementById('img-section');
const leftProductImgae = document.getElementById('img-left');
const middleProductImgae = document.getElementById('img-middle');
const rightProductImgae = document.getElementById('img-right');

const Prodcut = function (name) {
  this.name = name;
  this.image = `../assets/${name}.jpg`;
  this.timesShown = 0;
  this.clicks = 0;
  this.all = all.push(this);
};

for (let index = 0; index < productArray.length; index++) {
  new Prodcut(productArray[index]); //BUG : getting the .gif img BUG
}

const randImagesIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const imgGenerate = function () {
  let leftRandIndex = randImagesIndex(0, productArray.length - 1);
  leftProductImgae.src = all[leftRandIndex].image;
  leftProductImgae.alt = all[leftRandIndex].name;
  all[leftRandIndex].timesShown++;
  leftClickflag = leftRandIndex;
  //   console.log(all[leftRandIndex].timesShown);

  let middleRandIndex;
  let rightRandIndex;

  for (;;) {
    middleRandIndex = randImagesIndex(0, productArray.length - 1);
    if (!(middleRandIndex === leftRandIndex)) {
      break;
    }
  }
  middleProductImgae.src = all[middleRandIndex].image;
  middleProductImgae.alt = all[middleRandIndex].name;
  all[middleRandIndex].timesShown++;
  middleClickflag = middleRandIndex;

  for (;;) {
    rightRandIndex = randImagesIndex(0, productArray.length - 1);
    if (
      !(rightRandIndex === middleRandIndex && rightRandIndex === leftRandIndex)
    ) {
      break;
    }
  }
  rightProductImgae.src = all[rightRandIndex].image;
  rightProductImgae.alt = all[rightRandIndex].name;
  all[rightRandIndex].timesShown++;
  rightClickflag = rightRandIndex;
};
imgGenerate();

function appendData() {
  let liElement;
  let msg;
  for (let index = 0; index < all.length; index++) {
    liElement = document.createElement('li');
    objectData.appendChild(liElement);
    msg = `${all[index].name} had ${all[index].clicks} votes, and was seen ${all[index].timesShown} times.`;
    liElement.textContent = msg;
  }
}

function sessionValidated() {
  productImageSection.addEventListener('click', function productImage(event) {
    if (iteration < maxIterations) {
      let clickedElement = event.target;
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
      iteration++;
      imgGenerate();
      console.log(all);
      console.log(iteration);
    }
    if (iteration === maxIterations) {
      alert('End of session, Thank you for your time!');
      appendData();
      productImageSection.removeEventListener('click', productImage);
    }
  });
}

sessionButton.addEventListener('click', function (event) {
  event.preventDefault();

  maxIterations = Number(inputSession.value);
  if (maxIterations === undefined || maxIterations <= 0 || maxIterations > 25) {
    alert('Please insert from 1 to 25');
  } else {
    sessionValidated();
    sessionButton.disabled = true;
  }
});
