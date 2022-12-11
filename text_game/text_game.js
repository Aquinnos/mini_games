const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

var gameOver = false;

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

window.onload = function() {
  document.getElementById("but1").addEventListener("click", play);
  document.getElementById("but2").addEventListener("click", back)
}

function play() {
  document.getElementById("main").style.display = "grid";
  document.getElementById("form").style.display = "none";
}

function back() {
  location.href = '../index.html';
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Your name is Jeffrey Stallson, you are a reporter for a newspaper in a small town located in the middle of the United States. Recently there has been a report of a teenager went missing. His last known location was a forest thn, that is rumoured by the locals to be haunted. Your decide to make a report on the mansion and prove the local rumours wrong, you were not issued an official permit. Since your work was not approved you have to go at night. You are on your own. You have already arrived at the destination. You step out of the car.',
    options: [
      {
        text: 'Start',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You faintly see the house through the fog.',
    options: [
      {
        text: 'Look around',
        nextText: 3
      },
      {
        text: 'Look at the car',
        nextText: 4
      },
      {
        text: 'Look at the house',
        nextText: 5
      },
      {
        text: 'Walk closer',
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: "You barely see the house, behind you sits your car, still warm from the engine. You're accompanied only by the whisper of the surrounding trees.",
    options: [
      {
        text: 'Back',
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: "It's your own car, the report is not official, so you weren't issued one from the office, they're all worse anyways.",
    options: [
      {
        text: 'Back',
        nextText: 2
      }
    ]
  },
  {
    id: 5,
    text: "You just barely make out the shape of the mansion, it'd be easier if the fog wasn't this thick.",
    options: [
      {
        text: 'Back',
        nextText: 2
      }
    ]
  },
  {
    id: 6,
    text: "You walk closer to the house, it's silhouette becomes clearer",
    options: [
      {
        text: 'Next',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "You got closer to the house, it looks like an ordinary family home, allthough nearly every point of entrance is boarded up. The house is surrounded by various trees.",
    options: [
      {
        text: 'Try the front door',
        nextText: 8
      },
      {
        text: 'Look behind',
        nextText: 9
      },
      {
        text: 'Look through the window',
        nextText: 10
      },
      {
        text: 'Try the backdoor',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Tekst',
    options: [
      {
        text: 'Tekst',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'Tekst',
    options: [
      {
        text: 'Tekst',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'Tekst',
    options: [
      {
        text: 'Tekst',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'Tekst',
    options: [
      {
        text: 'Gratulacje. Zagraj ponownie.',
        nextText: 1
      }
    ]
  } 
] 

startGame()