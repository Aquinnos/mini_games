const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

var ambient1 = new Audio();

ambient1.src = "ambient1.mp3";
ambient1.volume = 0.3;
ambient1.loop = true;

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

window.onload = function() {
  document.getElementById("but1").addEventListener("click", play);
  document.getElementById("but2").addEventListener("click", back);
}

function play() {
  document.getElementById("main").style.display = "grid";
  document.getElementById("form").style.display = "none";
  ambient1.play();
}

function back() {
  location.href = '../index.html';
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerHTML = textNode.text;
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
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }

  const gameOver = option.gameOver;
  if(gameOver == true) {
    location.reload();
  } 
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId)
}

const textNodes = [

  //intro
  {
    id: 1,
    text: 'Your name is Jeffrey Stallson, you are a reporter for a newspaper in a small town located in the middle of the United States. Recently there has been a report of a teenager went missing. His last known location was a forest thn, that is rumoured by the locals to be haunted. Your decide to make a report on the mansion and prove the local rumours wrong, you were not issued an official permit. Since your work was not approved you have to go at night. You are on your own. You have already arrived at the destination. You step out of the car.',
    options: [
      {
        text: "Start",
        nextText: 2
      }
    ]
  },
  //gameplay -> outside [1-1]
  {
    id: 2,
    text: 'You faintly see the house through the fog.' + "<br>" + "<a href='maps/outside1_1.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
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
  //outside [1-2]
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
    text: "You attempt to go through the boarded up front door, to nobodies surprise you were not succesful.",
    options: [
      {
        text: 'Back',
        nextText: 7
      }
    ]
  },
  {
    id: 9,
    text: "You've nearly lost sight of your car, the fog neatly covered it up.",
    options: [
      {
        text: 'Back',
        nextText: 7
      }
    ]
  },
  {
    id: 10,
    text: "The house is definitely abandoned, it appears that nobody has been inside for years.",
    options: [
      {
        text: 'Back',
        nextText: 7
      }
    ]
  },
  {
    id: 11,
    text: "You walk around the house and attempt going through the backdoor, the door opens right before you, as if it was inviting you to come inside.",
    options: [
      {
        text: 'Next',
        nextText: 12
      }
    ]
  },
  //inside [1-1]
  {
    id: 12,
    text: "You step into the house, and get surrounded by warmness. Normally it would be soothing, but you have a feeling that a house that has been abandoned for years should not be warm.",
    options: [
      {
        text: 'Try the door',
        nextText: 13
      },
      {
        text: 'Go to the kitchen',
        nextText: 14
      },
      {
        text: 'Go to the living room',
        nextText: 16
      },
      {
        text: 'Go upstairs',
        nextText: 18
      }
    ]
  },
  {
    id: 13,
    text: "The door is locked shut and most likely stuck that way.",
    options: [
      {
        text: 'Back',
        nextText: 12
      }
    ]
  },
  //kitchen [2-1]
  {
    id: 14,
    text: "You walk into the kitchen, and smell the stench of rotten food, most likely coming from the pots at the counter. You'd rather not look inside them. " + "<br>" + "<a href='maps/kitchen2_1.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Read a note on the fridge',
        nextText: 15
      },
      {
        text: 'Return',
        nextText: 12
      }
    ]
  },
  {
    id: 15,
    text: "The note states: " + "<span style='font-family: Caveat; font-size: 25px; letter-spacing: 0.01em';>" + '"Ill be back home at 6PM! Your dinner is in the fridge, remember to clear the bookshelf upstairs. After I come back we can finally go to see show!' + "<br>" + 'much love, ███████ "' + "</span>",
    options: [
      {
        text: 'Back',
        nextText: 12
      }
    ]
  },
  //living room [2-2]
  {
    id: 16,
    text: "You walk into the living room, you feel the dust of old furniture in the air, apart from that it is a neat living room. It appears That the carpet is out of place. " + "<br>" + "<a href='maps/living_room2_2.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Look under the carpet',
        nextText: 17
      },
      {
        text: 'Go back',
        nextText: 12
      }
    ]
  },
  {
    id: 17,
    text: "You find a dirty note, most of is blurry and washed off, but you manage to make out this: " + "<span style='font-family: Caveat; font-size: 25px; letter-spacing: 0.01em';>" + "██████████bookshelf upstairs████tried escaping again█████████better security need███████buy new locks████chains██. " + "</span>" +  "You have a feeling that it might be for the better that the note was damaged.",
    options: [
      {
        text: 'Back',
        nextText: 16
      }
    ]
  },
  //upstairs -> inside [1-2]
  {
    id: 18,
    text: "You are now upstairs, and you're definitely not alone. You see the door at the end of the hallway close right before your eyes." + "<br>" + "<a href='maps/upstairs.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Check the bathroom',
        nextText: 20
      },
      {
        text: 'Go to the freshly closed room',
        nextText: 19
      }
    ]
  },
  {
    id: 20,
    text: "It's an ordinary bathroom. You hear a sqeak of the door of the medicine cabinet, it's been empty for a long time. The closed room downstairs is just below, it's probably just a second bathroom.",
    options: [
      {
        text: 'Back',
        nextText: 18
      }
    ]
  },
  {
    id: 19,
    text: "You slowly open the door, you hear the silent whisper of wind flowing through the open window. To your surprise the room is empty, The person you heard was probably a scavenger that just went out the window. At least that's what you tell yourself to not panic. The moonlight shows that the floor next to the bookshelf has been scractched, the bookshelf must've been moved.",
    options: [
      {
        text: 'Look around the room',
        nextText: 21
      },
      {
        text: 'Try moving the bookshelf',
        nextText: 22
      }
    ]
  },
  //inside [2-3]
  {
    id: 21,
    text: "It's an old fashioned bedroom. The most eyecatching thing is a massive bookshelf in the corner. It's also the coldest room in the house, the window is wide open and let's in the cold, aswell as the moonlight." + "<br>" + "<a href='maps/bedroom2_3.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Back',
        nextText: 19
      }
    ]
  },
  {
    id: 22,
    text: "There is definitely something up with the scratch marks on the floor. You attempt moving the bookshelf. It reveals a passage to a thin crawl space, you have high hopes that this is not the way the person you heard went. Without thinking it over too much, you decide on walking down the corridor.",
    options: [
      {
        text: 'Next',
        nextText: 23
      }
    ]
  },
  //secret room [1-1]
  {
    id: 23,
    text: "You're walking down the staircase towards the darkness below. The only way forward is to take the ladder down, despite your inner self telling you not to, it's either that or going back home without anything special to report. You climbed down the ladder revealing a filthy stone room, with a passage further." + "<br>" + "<a href='maps/secret_room1_1.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Look around',
        nextText: 25
      },
      {
        text: 'Go further',
        nextText: 24
      }
    ]
  },
  {
    id: 25,
    text: "The room is cold, you have a feeling that you definitely should not be here. To your right you see jailcells, but you desperately hope they were not in use recently. Inside them you can see dark red stains on the walls, and thankfully they look old. To your left you see chains mounted to the wall. You'd rather not think of whatever that might've happend in this room, but it's definitely good report material.",
    options: [
      {
        text: 'Back',
        nextText: 23
      }
    ]
  },
  {
    id: 24,
    text: "You arrive at the next room, that is definitely a storage for various tools.",
    options: [
      {
        text: 'Next',
        nextText: 26
      }
    ]
  },
  //secret room [1-2]
  {
    id: 26,
    text: "You enter the tool room, it's quite a grim sight.",
    options: [
      {
        text: 'Look around',
        nextText: 27
      },
      {
        text: 'Inspect the chair',
        nextText: 28
      },
      {
        text: 'Use the ladder',
        nextText: 30
      }
    ]
  },
  {
    id: 27,
    text: "You see various tools scattered all around the room, a lot of them with the same dark red stains. This is definitely report material that'll get you cash, but definitely not the report you wanted to write. There is a chair with leather straps in the corner of the room. You also notice a ladder, that most likely leads outside. It's definitely the fastest way out of this mess.",
    options: [
      {
        text: 'Back',
        nextText: 26
      }
    ]
  },
  {
    id: 28,
    text: "You see a stained chair with leather straps. Upon closer inspection you see a wallet lying on the chair.",
    options: [
      {
        text: 'Pick up the wallet',
        setState: { wallet: true },
        nextText: 29
      },
      {
        text: 'Leave the wallet',
        nextText: 26
      }
    ]
  },
  {
    id: 29,
    text: "You pick up the wallet and look through it. Inside is an ID of a " +  '"Dave ' + "<span style='letter-spacing: 0.01em;'>" + 'O████"' + "</span>" + " the last name is covered by stains. It appears you found your missing person, or at least what's left of him.	(you got proof of the missing teen)",
    options: [
      {
        text: 'Back',
        nextText: 26
      }
    ]
  },
  //outside [2-1]
  {
    id: 30,
    text: "The trapdoor shuts behind you, and through the darkness you can't find it anymore. You're stuck here without a way back. There is only one thing catches your eye, it is a pale white table that stands right before you.",
    options: [
      {
        text: 'Approach the table',
        nextText: 31
      }
    ]
  },
  {
    id: 31,
    text: "The table turns out to be an altar. Above it hangs an upside down cross. The altar is dirty from the same dark red stains you saw in the hidden room, but there is also a fresh new light stream flowing from it's side. You have a feeling that the man you heard before was not in fact a scavenger. You hear a noise behind you.",
    options: [
      {
        text: 'Turn around',
        nextText: 32
      }
    ]
  },
  {
    id: 32,
    text: "You see a tall silhouette right behind you. Without time to react the man knocks you out. You feel the darkness take over your mind. You've passed out.",
    options: [
      {
        text: '???',
        nextText: 33
      }
    ]
  },
  //cell [1]
  {
    id: 33,
    text: "You are awake, only darkness and a heavy sound of breathing surrounds you. You see your opressor through metal bars, he trapped you here. He's a tall man, he is wearing a hood and you cannot see his face. His only distinguishing feature is his deep voice.\n'You are finally awake, wonderful.' - He says. 'Now you will be used to serve my purpose.'" + "<br>" + "<a href='maps/cell.html' target='_blank' style='color: aqua; text-decoration: none;' >" + "(Map)" + "</a>",
    options: [
      {
        text: 'Who are you?',
        nextText: 34
      },
      {
        text: 'Why did you lock me up?',
        nextText: 35
      },
      {
        text: "What's going on here",
        nextText: 36
      },
      {
        text: "Just let me out already!",
        nextText: 37
      }
    ]
  },
  {
    id: 34,
    text: "I am the chosen one, can't you tell? I was given a purpose and I'm fullfiling my duty.",
    options: [
      {
        text: 'Back',
        nextText: 33
      }
    ]
  },
  {
    id: 35,
    text: "Simple, possesing divine knowledge requiers sacrifices, and I shall gain it no matter the price.",
    options: [
      {
        text: 'Back',
        nextText: 33
      }
    ]
  },
  {
    id: 36,
    text: "You've been chosen by me to serve a greater purpose than us both. I still need to claim more sacrifices, and you will soon become one.",
    options: [
      {
        text: 'Back',
        nextText: 33
      }
    ]
  },
  {
    id: 37,
    text: "You've come to me, only yourself is to blame. You had the chance to go away but curiosity is the first step to hell as they say.",
    options: [
      {
        text: 'Next',
        nextText: 38
      }
    ]
  },
  {
    id: 38,
    text: "'Well, I have to make necessary preparations. Hold on tight, I will be back soon.' The man leaves. You hear a metal clinging sound, his keys have fallen out of his pocket. You can consider yourself lucky, at least this time.",
    options: [
      {
        text: 'Look around the cage',
        nextText: 40
      },
      {
        text: 'Pick up the keys and unlock the door',
        nextText: 39
      }
    ]
  },
  {
    id: 40,
    text: "You take a closer look around you. The cage is mostly wooden with metal bars, you're most likely in some sort of shed, somewhere outside instead of the underground cells you've seen before.",
    options: [
      {
        text: 'Back',
        nextText: 38
      }
    ]
  },
  {
    id: 39,
    text: "You hastily go down on the ground and stick your hand through the bars, grabbing the keys from the floor outside the cage, Than you get up and unlock your cell from the inside, you're now free to walk away.",
    options: [
      {
        text: 'Escape!',
        nextText: 41
      }
    ]
  },
  //outside the shed
  {
    id: 41,
    text: "You've opened the door of your prison, and walked outside. It's warmer and the fog is nearly gone, the birds are quietly chirping. The sun will soon rise. You see the house before you, you must have not seen this shed because of how thick the fog was when you arrived. There is a little slip of paper hammered to the door of the shed.",
    options: [
      {
        text: 'Take a look around',
        nextText: 42
      },
      {
        text: 'Pick the note up',
        nextText: 43
      },
      {
        text: 'Run to the car',
        nextText: 44
      }
    ]
  },
  {
    id: 42,
    text: "You take a final look around. The house stands right before, but now you know what it hides. You definitely do not wish to get back inside. You hear the forest living around you, you know you're almost out of this mess. Your car still stands right where you left it.",
    options: [
      {
        text: 'Back',
        nextText: 41
      }
    ]
  },
  {
    id: 43,
    text: "You pick the note up, it says: " + "<span style='font-family: Caveat; font-size: 25px';>" + '"The divine voice told me to make a sacrifice again and I shall provide. Only than I can truly obtain the forbidden knowledge. I cannot not dissapoint. I will not dissapoint." ' + "</span>" + "It appears your opressor hears voices, perfect, more reasons to get out of here as fast as possible. (you got proof of the residents insanity).",
    options: [
      {
        text: 'Back',
        setState: { note: true },
        nextText: 41
      }
    ]
  },
  {
    id: 44,
    text: "Without hesitation you run to your car, your ticket back home. You reach for your key and unlock the car, than quickly get in. You start up the car and drive away. You made it out alive.",
    options: [
      {
        text: 'Next',
        nextText: 45
      }
    ]
  },
  //endgame
  {
    id: 45,
    text: "It's a warm morning, and you arrive at your personal office. It's been 3 days since you escaped the house. The missing teen case has till not been officialy resolved, However with the things you saw at the mansion you can imagine what happened. You are now presented with a choice, either write the report on the things you witnessed in the mansion,  or leave the case and the mansion an unsolved mystery.",
    options: [
      {
        text: 'Write the report',
        nextText: 46
      },
      {
        text: 'Leave the case',
        nextText: 51
      }
    ]
  },
  {
    id: 46,
    text: "It's a warm morning, and you arrive at your personal office. It's been 3 days since you escaped the house. The missing teen case has till not been officialy resolved, However with the things you saw at the mansion you can imagine what happened. You are now presented with a choice, either write the report on the things you witnessed in the mansion,  or leave the case and the mansion an unsolved mystery.",
    options: [
      {
        text: 'Make a raport (Without note and wallet)',
        nextText: 47
      },
      {
        text: 'Make a raport (Without note)',
        requiredState: (currentState) => currentState.wallet,
        nextText: 48
      },
      {
        text: 'Make a raport (Without wallet)',
        requiredState: (currentState) => currentState.note,
        nextText: 49
      },
      {
        text: 'Make a full raport (wallet and note)',
        requiredState: (currentState) => currentState.note,
        requiredState: (currentState) => currentState.wallet,
        nextText: 50
      }
    ]
  },
  {
    id: 47,
    text: "You write the report on the abandoned house and the man who kidnapped you, but nobody believes you. You've been fired from the office for investigating without permission, and for your proclaimed dishnonesty in the report. The truth about mysterious man was never revealed, and the mansion still attracts gullibe and curious people, while you look for a new less stress inducing job.",
    options: [
      {
        text: 'End (back to begin)',
        gameOver: true
      }
    ]
  },
  {
    id: 48,
    text: "You write the report about the mansion, and about the lost teenager. The report piqued the interest of the local forces, and led to an investigation by the police. The mansion along with the altar have been found and marked as a no entry area, the mansion itself no longer poses a threat to curious souls, but the mysterious man was never found.",
    options: [
      {
        text: 'End (back to begin)',
        gameOver: true
      }
    ]
  },
  {
    id: 49,
    text: "You write the report about the mansion and it's insane resident. Alltough the description of the mansions secret have been deemed fake news to make the report more interesting, the note was enough of proof to lead to an ambush and arrest of the mysterious man. He is now being held captive and questioned by the police. The case of the missing teen was never solved, but you can imagine what happened.",
    options: [
      {
        text: 'End (back to begin)',
        gameOver: true
      }
    ]
  },
  {
    id: 50,
    text: "The report you've written proved very succesful. The wallet expalained the unfortunate case of the missing teenager, and the note helped with capturing. The crazy man. The mansion has been secured by the police and thoroughly searched through, finding even more proof of previously missing people. The man has been arrested and is now being questioned by the local police. The mansion itself was leveled, and the grounds have been covered with trees. You, of course got yourself a decent pay and a raise.",
    options: [
      {
        text: 'End (back to begin)',
        gameOver: true
      }
    ]
  },
  {
    id: 51,
    text: "You decide to leave the case, nobody will believe you anyway. You act as if nothing ever happened and move onto your usual paperwork, while the man and the mansion are still out there.",
    options: [
      {
        text: 'End (back to begin)',
        gameOver: true
      }
    ]
  }
] 

startGame()