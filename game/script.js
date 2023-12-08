// Timer
let timerfunc = 0
function startTimer(duration, display, isPrep) {
  var timer = duration, minutes, seconds;
  clearInterval(timerfunc)
  timerfunc = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      if (isPrep) {
        display.style.color = 'green'
      } else {
        display.style.color = 'red'
      }

      if (--timer < 0 && !isPrep) {
          clearInterval(timerfunc)
          btnDisable(false)
          display.innerText = 'Timeout'
          draggable(false)

          if (levelNum == jsonData.length-1) {
            // LAST GAME
            completeRound()
            
            showResult()
            btnDisable(true)
            display.innerText = '00:00'
          }
      }

  }, 1000);
}
let resultDialogue = document.querySelector('.final_result')


function showResult() {
  let resultpoint = document.querySelector('.totalpoint')
  let resultgamepoint = document.querySelector('.totalgamepoint')

  resultpoint.innerText = `${Math.floor(points/10000)}🎖️`
  resultgamepoint.innerText = `${points}`

  resultDialogue.style.opacity = '1'
  resultDialogue.style.display = 'flex'
  resultDialogue.showModal()
}

let countdownTimer = document.querySelector('.countdown')
let points = 0

function completeRound() {
  let percentage = compareArrangement()
  points = Math.floor(percentage*100 + points)
  let display = document.querySelector('.points')
  display.innerText = points

}

// Drag
var dragSrcEl = null;

function handleDragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  e.stopPropagation();
  if (dragSrcEl !== this) {
    // Swap the positions of the dragged element and the drop target
    const temp = this.outerHTML;
    this.outerHTML = dragSrcEl.outerHTML;
    dragSrcEl.outerHTML = temp;
    
    // Reattach event listeners to the new elements
    let items = document.querySelectorAll(".grid-container .grid-item");
    items.forEach(function(item) {
      item.addEventListener("dragstart", handleDragStart, false);
      item.addEventListener("dragenter", handleDragEnter, false);
      item.addEventListener("dragover", handleDragOver, false);
      item.addEventListener("dragleave", handleDragLeave, false);
      item.addEventListener("drop", handleDrop, false);
      item.addEventListener("dragend", handleDragEnd, false);
    });
  }

  // PREVENT SKIPPING
  if (compareArrangement() != 100) {
    btnDisable(true)
  } else {
    btnDisable(false)
  }
  return false;
}

function handleDragEnd() {
  document.querySelectorAll(".grid-item").forEach(function(item) {
    item.classList.remove("over");
    item.style.opacity = '1'
  });
}
let items = document.querySelectorAll(".grid-container .grid-item");
items.forEach(function(item) {
  item.addEventListener("dragstart", handleDragStart, false);
  item.addEventListener("dragenter", handleDragEnter, false);
  item.addEventListener("dragover", handleDragOver, false);
  item.addEventListener("dragleave", handleDragLeave, false);
  item.addEventListener("drop", handleDrop, false);
  item.addEventListener("dragend", handleDragEnd, false);
});

let originalOrder = []; // Store original order of elements

// Function to store the original order of grid items
function storeOriginalOrder() {
  originalOrder = Array.from(document.getElementsByClassName("grid-item"));
}

// Function to reshuffle the pieces randomly
function reshufflePieces() {
  const gridContainer = document.getElementById('grid');
  const items = Array.from(document.querySelectorAll(".grid-item"));

  // Store original order if not already stored
  if (originalOrder.length === 0) {
    storeOriginalOrder();
  }

  // Randomly rearrange items
  const shuffledItems = items.sort(() => Math.random() - 0.5);
  gridContainer.innerHTML = ''; // Clear grid

  shuffledItems.forEach(function(item) {
    gridContainer.appendChild(item);
  });
}

// Function to compare the similarity percentage between original and current arrangement
function compareArrangement() {
  const items = Array.from(document.getElementsByClassName("grid-item"));
  if (originalOrder.length !== items.length) {
    console.error("Original order not stored properly.");
    return;
  }

  let similarCount = 0;
  items.forEach(function(item, index) {
    if (item.id === originalOrder[index].id) {
      similarCount++;
    }
  });

  const similarityPercentage = (similarCount / items.length) * 100;
  return similarityPercentage
}


function draggable(bool) {
  document.querySelectorAll('.grid-item').forEach(e=>{
    e.setAttribute('draggable', bool)
  })
}

function btnDisable(bool) {
  let nextbtn = document.querySelector('.completebtn')
  nextbtn.disabled = bool
}

// Modify startGame function to store original order when starting the game
function startGame() {
  const { imageURL, splittingVariable, time, prep } = jsonData[levelNum%jsonData.length];
  createDraggablePieces(imageURL, splittingVariable);
  storeOriginalOrder(); // Store original order when starting the game
  btnDisable(true)
  clearInterval(timerfunc)
  countdownTimer.innerText = '00:00'
  document.querySelector('.lvcount').innerText = `${levelNum+1}/${jsonData.length}`
  startTimer(prep, countdownTimer, true)
  const timeout = setTimeout(()=>{
    reshufflePieces()
    draggable(true)
    // btnDisable(false) // PREVENT SKIPPING
    startTimer(time, countdownTimer, false)
  }, (prep+1)*1000)

}

// Sample JSON data stored in a variable
const jsonData2 = [
  {

    imageURL: 'data:image/png;base64,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',
    splittingVariable: 5, // Adjust the splitting variable as needed
    time: 30,
    prep: 5
  },
  // {
  //   imageURL: 'https://upload.wikimedia.org/wikipedia/commons/0/02/JATA_NEGARA_MALAYSIA.png',
  //   splittingVariable: 5, // Adjust the splitting variable as needed
  //   time: 30,
  //   prep: 5
  // },
  {
    imageURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAc0AAAGRCAYAAAAHCeiRAAAXkklEQVR4Ae3dwW2kxxGG4Ulgc3AINpSIQ/Bpz07AwKahm0JQCE7IgDMYY6ybAKGJErr+6q8fG3OwoZ/dVQT25TMkV6+3/9iADdiADdiADXxpA6///1Ov1/vtdfwOvr/9N2YD3396f/eK2MGP1+vtlbMD0Qz6YiEmGOIfEQvR/+0LH8HMCebncymaoilREzdAmTFfOIimaB7/NmbqW9GkGbQB0RRNb+uOfFubNElzorPcSTRFUzRFM1V4U+YKcpZoiqZoiqZoTolL6j1EM2gDoimaoimaqbGaMldQMkhTNEVTNEVzSlxS7yGaQRsQTdEUTdFMjdWUuYKSQZqiKZqiKZpT4pJ6D9EM2oBoiqZoimZqrKbMFZQM0hRN0RRN0ZwSl9R7iGbQBkRTNEVTNFNjNWWuoGSQpmiKpmiK5pS4pN5DNIM2IJqiKZqimRqrKXMFJYM0RVM0RVM0p8Ql9R6iGbQB0RRN0RTN1FhNmSsoGaQpmqIpmqI5JS6p9xDNoA2IpmiKpmimxmrKXEHJIE3RFE3RFM0pcUm9h2gGbUA0RVM0RTM1VlPmCkoGaYqmaIqmaE6JS+o9RDNoA6IpmqIpmqmxmjJXUDJIUzRFUzRFc0pcUu8hmkEbEE3RFE3RTI3VlLmCkkGaoimaoimaU+KSeg/RDNqAaIqmaIpmaqymzBWUDNIUTdEUTdGcEpfUe4hm0AZEUzRFUzRTYzVlrqBkkKZoiqZoiuaUuKTeQzSDNiCaoimaopkaqylzBSWDNEVTNEVTNKfEJfUeohm0AdEUTdEUzdRYTZkrKBmkKZqiKZqiOSUuqfcQzaANiKZoiqZopsZqylxBySBN0RRN0RTNKXFJvYdoBm1ANEVTNEUzNVZT5gpKBmmKpmiKpmhOiUvqPUQzaAOiKZqiKZqpsZoyV1AySFM0RVM0RXNKXFLvIZpBGxBN0RRN0UyN1ZS5gpJBmqIpmqIpmlPiknoP0QzagGiKpmiKZmqspswVlAzSFE3RFE3RnBKX1HuIZtAGRFM0RVM0U2M1Za6gZJCmaIqmaIrmlLik3kM0gzYgmqIpmqKZGqspcwUlgzRFUzRFUzSnxCX1HqIZtAHRFE3RFM3UWE2ZKygZpCmaoimaojklLqn3EM2gDYimaIqmaKbGaspcQckgTdEUTdEUzSlxSb2HaAZtQDRFUzRFMzVWU+YKSgZpiqZoiqZoTolL6j1EM2gDoimaoimaqbGaMldQMkhTNEVTNEVzSlxS7yGaQRsQTdEUTdFMjdWUuYKSQZqiKZqiKZpT4pJ6D9EM2oBoiqZoimZqrKbMFZQM0hRN0RRN0ZwSl9R7iGbQBkRTNEVTNFNjNWWuoGSQpmiKpmiK5pS4pN5DNIM2IJqiKZqimRqrKXMFJYM0RVM0RVM0p8Ql9R6iGbQB0RRN0RTN1FhNmSsoGaQpmqIpmqI5JS6p9xDNoA2IpmiKpmimxmrKXEHJIE3RFE3RFM0pcUm9h2gGbUA0RVM0RTM1VlPmCkoGaYqmaIqmaE6JS+o9RDNoA6IpmqIpmqmxmjJXUDJIUzRFUzRFc0pcUu8hmkEbEE3RFE3RTI3VlLmCkkGaoimaoimaU+KSeg/RDNqAaIqmaIpmaqymzBWUDNIUTdEUTdGcEpfUe4hm0AZEUzRFUzRTYzVlrqBkkKZoiqZoiuaUuKTeQzSDNiCaoimaopkaqylzBSWDNEVTNEVTNKfEJfUeohm0AdEUTdEUzdRYTZkrKBmkKZqiKZqiOSUuqfcQzaANiKZoiqZopsZqylxBySBN0RRN0RTNKXFJvYdoBm1ANEVTNEUzNVZT5gpKBmmKpmiKpmhOiUvqPUQzaAOiKZqiKZqpsZoyV1AySFM0RVM0RXNKXFLvIZpBGxBN0RRN0UyN1ZS5gpJBmqIpmqIpmlPiknoP0QzagGiKpmiKZmqspswVlAzSFE3RFE3RnBKX1HuIZtAGRFM0RVM0U2M1Za6gZJCmaIqmaIrmlLik3kM0gzYgmqIpmqKZGqspcwUlgzRFUzRFUzSnxCX1HqIZtAHRFE3RFM3UWE2ZKygZpCmaoimaojklLqn3EM2gDYimaIrm4Gi+f36/vc7fwev9fntl7ODfr/fbK2IHP378eHvl7ODzR+z5sRD83z6HgpkRzM/nUTBjdiCYOcH8fC5FMym4oimaYjsutqIpmmQ6NbSiKZqiKZreDt76djhpTg1g5V6iKZqiKZqiKZp+SOmLP6glmqIpmqIpmqIpmqJ53U8Fi9+4+FV/OMv3NH1P0/c0K2+ddjxDmqQptuNiK5qiKZodAaycIZqiKZqi6e1Zb896e9bbs96e9ZcdVN8effo50iRN0qwosOMZ0iRN0iRN0iRN0iRN0iTNp8VYPZ80SZM0O9RYOYM0SZM0SZM0SZM0SZM0SbMqvaefI03SJM2KAjueIU3SJE3SJE3SJE3SJE3SfFqM1fNJkzRJs0ONlTNIkzRJkzRJkzRJkzRJkzSr0nv6OdIkTdKsKLDjGdIkTdIkTdIkTdIkTdIkzafFWD2fNEmTNDvUWDmDNEmTNEmTNEmTNEmTNEmzKr2nnyNN0iTNigI7niFN0iRN0iRN0iRN0iRN0nxajNXzSZM0SbNDjZUzSJM0SZM0SZM0SZM0SZM0q9J7+jnSJE3SrCiw4xnSJE3SJE3SJE3SJE3SJM2nxVg9nzRJkzQ71Fg5gzRJkzRJkzRJkzRJkzRJsyq9p58jTdIkzYoCO54hTdIkTdIkTdIkTdIkTdJ8WozV80mTNEmzQ42VM0iTNEmTNEmTNEmTNEmTNKvSe/o50iRN0qwosOMZ0iRN0iRN0iRN0iRN0iTNp8VYPZ80SZM0O9RYOYM0SZM0SZM0SZM0SZM0SbMqvaefI03SJM2KAjueIU3SJE3SJE3SJE3SJE3SfFqM1fNJkzRJs0ONlTNIkzRJkzRJkzRJkzRJkzSr0nv6OdIkTdKsKLDjGdIkTdIkTdIkTdIkTdIkzafFWD2fNEmTNDvUWDmDNEmTNEmTNEmTNEmTNEmzKr2nnyNN0iTNigI7niFN0iRN0iRN0iRN0iRN0nxajNXzSZM0SbNDjZUzSJM0SZM0SZM0SZM0SZM0q9J7+jnSJE3SrCiw4xnSJE3SJE3SJE3SJE3SJM2nxVg9nzRJkzQ71Fg5gzRJkzRJkzRJkzRJkzRJsyq9p58jTdIkzYoCO54hTdIkTdIkTdIkTdIkTdJ8WozV80mTNEmzQ42VM0iTNEmTNEmTNEmTNEmTNKvSe/o50iRN0qwosOMZ0iRN0iRN0iRN0iRN0iTNp8VYPZ80SZM0O9RYOYM0SZM0SZM0SZM0SZM0SbMqvaefI03SJM2KAjueIU3SJE3SJE3SJE3SJE3SfFqM1fNJkzRJs0ONlTNIkzRJkzRJkzRJkzRJkzSr0nv6OdIkTdKsKLDjGdIkTdIkTdIkTdIkTdIkzafFWD2fNEmTNDvUWDmDNEmTNEmTNEmTNEmTNEmzKr2nnyNN0iTNigI7niFN0iRN0iRN0iRN0iRN0nxajNXzSZM0SbNDjZUzSJM0SZM0SZM0SZM0SZM0q9J7+jnSJE3SrCiw4xnSJE3SJE3SJE3SJE3SJM2nxVg9nzRJkzQ71Fg5gzRJkzRJkzRJkzRJkzRJsyq9p58jTdIkzYoCO54hTdIkTdIkTdIkTdIkTdJ8WozV80mTNEmzQ42VM0iTNEmTNEmTNEmTNEmTNKvSe/o50iRN0qwosOMZ0iRN0iRN0iRN0iRN0iTNp8VYPZ80SZM0O9RYOYM0SZM0SZM0SZM0SZM0SbMqvaefI03SJM2KAjueIU3SJE3SJE3SJE3SJE3SfFqM1fNJkzRJs0ONlTNIkzRJkzRJkzRJkzRJkzSr0nv6OdIkTdKsKLDjGdIkTdIkTdIkTdIkTdIkzafFWD2fNEmTNDvUWDmDNEmTNEmTNEmTNEmTNEmzKr2nnyNN0iTNigI7niFN0iRN0iRN0iRN0iRN0nxajNXzSZM0SbNDjZUzSJM0SZM0SZM0SZM0SZM0q9J7+jnSJE3SrCiw4xnSJE3SJE3SJE3SJE3SJM2nxVg9nzQDpfn6yz/eXgE7+PXv75dXxA6+ffv29srYQc7bH97K+nwuP1sQzJQvGgQzIpifL3wEMyOYn8+jaGbFVjRTgvmZQzRjdiCaoim2M2MrmqIZE5qkLxpEUzRFUzS9Dbw70KQZ8wWAaIqmaIqmaIpmTNR2q1Y0RVM0RVM0RVM0v/hugGiKpmiKpmiKpmiK5nU/GSx+M+NX/bx8phGz3THr+vhf/AN591uLPv6f/31Z0iTN6h/qntsbadHsClrHOaIZI1nRFE3x2xu/6n5FsyNmXWeIpmj6m4TGvf1b/cPZc6LpbeDd8RRN0RRN0bzuL2rujStp7g5Z58cXTdEUTdEUza1/daFodkZt91miKZqiKZqiKZr+DSxf/DewiKZoiqZoiqZoiqZo3vZrLH561k/P+kGg3u9VfnXf3p7d/ZZp58cnTdIkTdIkTdIkTdIkzRx53aborwrGPzdTlr//vJBmpwR3n0WapEmapEmapEmapEmapHmqUH8vFf/7DFH+0eeJNHfrr/PjkyZpkiZpkiZpkiZpkiZpkubZQvsjuZ32/5NmpwR3n0WapEmapEmapEmapEmapEmapDlBpaS5W3+dH580SZM0SZM0SZM0SZM0SZM0SZM0OxV2w1mkSZqkSZqkSZqkSZqkSZqkSZqkeYP+OmckTdIkTdIkTdIkTdIkTdIkTdIkzU6F3XAWaZImaZImaZImaZImaZImaZImad6gv84ZSZM0SZM0SZM0SZM0SZM0SZM0SbNTYTecRZqkSZqkSZqkSZqkSZqkSZqkSZo36K9zRtIkTdIkTdIkTdIkTdIkTdIkTdLsVNgNZ5EmaZImaZImaZImaZImaZImaZLmDfrrnJE0SZM0SZM0SZM0SZM0SZM0SZM0OxV2w1mkSZqkSZqkSZqkSZqkSZqkSZqkeYP+OmckTdIkTdIkTdIkTdIkTdIkTdIkzU6F3XAWaZImaZImaZImaZImaZImaZImad6gv84ZSZM0SZM0SZM0SZM0SZM0SZM0SbNTYTecRZqkSZqkSZqkSZqkSZqkSZqkSZo36K9zRtIkTdIkTdIkTdIkTdIkTdIkTdLsVNgNZ5EmaZImaZImaZImaZImaZImaZLmDfrrnJE0SZM0SZM0SZM0SZM0SZM0SZM0OxV2w1mkSZqkSZqkSZqkSZqkSZqkSZqkeYP+OmckTdIkTdIkTdIkTdIkTdIkTdIkzU6F3XAWaZImaZImaZImaZImaZImaZImad6gv84ZSZM0SZM0SZM0SZM0SZM0SZM0SbNTYTecRZqkSZqkSZqkSZqkSZqkSZqkSZo36K9zRtIkTdIkTdIkTdIkTdIkTdIkTdLsVNgNZ5EmaZImaZImaZImaZImaZImaZLmDfrrnJE0SZM0SZM0SZM0SZM0SZM0SZM0OxV2w1mkSZqkSZqkSZqkSZqkSZqkSZqkeYP+OmckTdIkTdIkTdIkTdIkTdIkTdIkzU6F3XAWaZImaZImaZImaZImaZImaZImad6gv84ZSZM0SZM0SZM0SZM0SZM0SZM0SbNTYTecRZqkSZqkSZqkSZqkSZqkSZqkSZo36K9zRtIkTdIkTdIkTdIkTdIkTdIkTdLsVNgNZ5EmaZImaZImaZImaZImaZImaZLmDfrrnJE0SZM0SZM0SZM0SZM0SZM0SZM0OxV2w1mkSZqkSZqkSZqkSZqkSZqkSZqkeYP+OmckTdIkTdIkTdIkTdIkTdIkTdIkzU6F3XAWaZImaZImaZImaZImaZImaZImad6gv84ZSZM0SZM0SZM0SZM0SZM0SZM0SbNTYTecRZqkSZqkSZqkSZqkSZqkSZqkOUeav/73/fI6fgf/+dff3l4ZO/jnX395e2Xs4PX99fYK2sH7A1nBjNiBYGYE8/N5FMyMYH4+j4IZFMzPF0CimaNs0RRNsZ0XW9EUzQiVJepaNEVTNEVTpDdHmjRJU2znxVb85sWv+jkRsc0R6/6esWiKpmiKZjUInlvHXTRF09uzQ39wSvzmxa/6ORGjdYxO2ZFoiqZoiqZfbdn86z2nBME913EXTdEUTdEUTdH0azFf/F1a0RRN0RRN0RRN0RTNO38H1Q8C+UGg6vfdPLfve6je9ly/7XnKjkiTNEmTNEmTNEmTNEkz8Rf+b5qJ/PbJr3u3pyjKPdciJk3SJE3SJE3SJE3SJM2bVJY4a7eGnLdPtgS3FtwpOyJN0iRN0iRN0iRN0iTNRH3dNBP57ZNf925PUZR7rkVMmqRJmqRJmqRJmqRJmjepLHHWbg05b59sCW4tuFN2RJqkSZqkSZqkSZqkSZqJ+rppJvLbJ7/u3Z6iKPdci5g0SZM0SZM0SZM0SZM0b1JZ4qzdGnLePtkS3Fpwp+yINEmTNEmTNEmTNEmTNBP1ddNM5LdPft27PUVR7rkWMWmSJmmSJmmSJmmSJmnepLLEWbs15Lx9siW4teBO2RFpkiZpkiZpkiZpkiZpJurrppnIb5/8und7iqLccy1i0iRN0iRN0iRN0iRN0rxJZYmzdmvIeftkS3BrwZ2yI9IkTdIkTdIkTdIkTdJM1NdNM5HfPvl17/YURbnnWsSkSZqkSZqkSZqkSZqkeZPKEmft1pDz9smW4NaCO2VHpEmapEmapEmapEmapJmor5tmIr998uve7SmKcs+1iEmTNEmTNEmTNEmTNEnzJpUlztqtIeftky3BrQV3yo5IkzRJkzRJkzRJkzRJM1FfN81Efvvk173bUxTlnmsRkyZpkiZpkiZpkiZpkuZNKkuctVtDztsnW4JbC+6UHZEmaZImaZImaZImaZJmor5umon89smve7enKMo91yImTdIkTdIkTdIkTdIkzZtUljhrt4act0+2BLcW3Ck7Ik3SJE3SJE3SJE3SJM1Efd00E/ntk1/3bk9RlHuuRUyapEmapEmapEmapEmaN6kscdZuDTlvn2wJbi24U3ZEmqRJmqRJmqRJmqRJmon6umkm8tsnv+7dnqIo91yLmDRJkzRJkzRJkzRJkzRvUlnirN0act4+2RLcWnCn7Ig0SZM0SZM0SZM0SZM0E/V100zkt09+3bs9RVHuuRYxaZImaZImaZImaZImad6kssRZuzXkvH2yJbi14E7ZEWmSJmmSJmmSJmmSJmkm6uummchvn/y6d3uKotxzLWLSJE3SJE3SJE3SJE3SvEllibN2a8h5+2RLcGvBnbIj0iRN0iRN0iRN0iRN0kzU100zkd8++XXv9hRFuedaxKRJmqRJmqRJmqRJmqR5k8oSZ+3WkPP2yZbg1oI7ZUekSZqkSZqkSZqkSZqkmaivm2Yiv33y697tKYpyz7WISZM0SZM0SZM0SZM0SfMmlSXO2q0h5+2TLcGtBXfKjkiTNEmTNEmTNEmTNEkzUV83zUR+++TXvdtTFOWeaxGTJmmSJmmSJmmSJmmS5k0qS5y1W0PO2ydbglsL7pQdkSZpkiZpkiZpkiZpkmaivm6aifz2ya97t6coyj3XIiZN0iRN0iRN0iRN0iTNm1SWOGu3hpy3T7YEtxbcKTsiTdIkTdIkTdIkTdIkzUR93TQT+e2TX/duT1GUe65FTJqkSZqkSZqkSZqkSZo3qSxx1m4NOW+fbAluLbhTdkSapEmapEmapEmapEmaifq6aSby2ye/7t2eoij3XIuYNEmTNEmTNEmTNEmTNG9SWeKs3Rpy3j7ZEtxacKfsiDRJkzRJkzRJkzRJkzQT9XXTTOS3T37duz1FUe65FjFpkiZpkiZpkiZpkiZp3qSyxFm7NeS8fbIluLXgTtkRaZImaZImaZImaZImaSbq66aZyG+f/Lp3e4qi3HMtYtIkTdIkTdIkTdIkTdK8SWWJs3ZryHn7ZEtwa8GdsiPSJE3SJE3SJE3SJE3STNTXTTOR3z75de/2FEW551rEpEmapEmapEmapEmapHmTyhJn7daQ8/bJluDWgjtlR6RJmqRJmqRJmqRJmqSZqK+bZiK/ffLr3u0pinLPtYhJM0ua/wOY5YKe35x3pAAAAABJRU5ErkJggg==',
    splittingVariable: 4, // Adjust the splitting variable as needed
    time: 30,
    prep: 5
  },
  {
    imageURL: 'res/lv_anim.jpg',
    splittingVariable: 5, // Adjust the splitting variable as needed
    time: 120,
    prep: 60
  }
];

let levelNum = 0 // LEVEL NUMBER

const jsonData = [
  // TEST
  {
    imageURL: 'res/lv_test1.png',
    splittingVariable: 3, // Adjust the splitting variable as needed
    time: 60,
    prep: 30
  },

  // COLOURS
  {
    imageURL: 'res/lv_colour.png',
    splittingVariable: 4, // Adjust the splitting variable as needed
    time: 90,
    prep: 45
  },

   // FLAGS
   {
    imageURL: 'res/lv_flag.png',
    splittingVariable: 4, // Adjust the splitting variable as needed
    time: 90,
    prep: 45
  },

    // CARS
    {
      imageURL: 'res/lv_cars.png',
      splittingVariable: 5, // Adjust the splitting variable as needed
      time: 90,
      prep: 60
    },

  // MUSIC
  {
    imageURL: 'res/lv_music.png',
    splittingVariable: 3, // Adjust the splitting variable as needed
    time: 60,
    prep: 60
  },

  // TEST 2
  {
    imageURL: 'res/lv_test.png',
    splittingVariable: 3, // Adjust the splitting variable as needed
    time: 60,
    prep: 30
  },

  // SPORTS
  {
    imageURL: 'res/lv_sports.jpg',
    splittingVariable: 4, // Adjust the splitting variable as needed
    time: 75,
    prep: 45
  },
  
  // CARTOON
  {
    imageURL: 'res/lv_cartoon.jpg',
    splittingVariable: 4, // Adjust the splitting variable as needed
    time: 90,
    prep: 60
  },

  // ANIMALS
  {
    imageURL: 'res/lv_anim.jpg',
    splittingVariable: 5, // Adjust the splitting variable as needed
    time: 105,
    prep: 60
  },

  // BRANDS
  {
    imageURL: 'res/lv_brands.png',
    splittingVariable: 5, // Adjust the splitting variable as needed
    time: 105,
    prep: 60
  }
];


// Function to create draggable pieces for the image rearranging game
function createDraggablePieces(imageURL, splittingVariable) {
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = ''; // Clear previous content

  const img = new Image();
  img.crossOrigin = 'anonymous'; // Allow loading images from different domains
  img.onload = function() {
    const pieceWidth = img.width / splittingVariable;
    const pieceHeight = img.height / splittingVariable;
    gridContainer.style.setProperty("--grid-size", `${splittingVariable}`)

    for (let i = 0; i < splittingVariable; i++) {
      for (let j = 0; j < splittingVariable; j++) {
        const piece = document.createElement('div');
        piece.draggable = false;
        piece.classList.add('grid-item');
        piece.setAttribute("id", `${i}-${j}`)
        piece.style.width = `${pieceWidth}px`;
        piece.style.height = `${pieceHeight}px`;
        piece.style.backgroundImage = `url(${imageURL})`;
        piece.style.backgroundSize = `${img.width}px ${img.height}px`;
        piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`;

        piece.addEventListener('dragstart', handleDragStart, false);
        piece.addEventListener('dragenter', handleDragEnter, false);
        piece.addEventListener('dragover', handleDragOver, false);
        piece.addEventListener('dragleave', handleDragLeave, false);
        piece.addEventListener('drop', handleDrop, false);
        piece.addEventListener('dragend', handleDragEnd, false);

        gridContainer.appendChild(piece);
      }
    }
  };
  img.src = imageURL;
}



// Start the game when the window loads
window.onload = function() {
  let startbtncon = document.querySelector('.startbtncon')
  startbtncon.addEventListener('click', ()=>{
    startbtncon.close()
    startGame()
  })
  startbtncon.showModal()


};
