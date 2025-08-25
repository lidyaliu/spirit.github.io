function startQuiz() {
  const nar = [
    "You find yourself on a path split into four. Mist surrounds you, and a soft humming sound calls from somewhere beyond.",
    "You discover an old letter sealed with wax, addressed to no one. It's faded, fragile, and resting on a shrine.",
    "A childlike spirit seems confused, looking for something they’ve lost.",
    "Your lantern begins to flicker in the middle of a silent clearing.",
    "In the middle of the ghost festival, a loud clash of drums startles a few wandering spirits nearby.",
    "You see a spirit gently folding a paper boat but struggling to let it go into the river.",
    "A nearby lantern tumbles and goes out during the celebration.",
    "You find a hidden door behind a spirit’s shrine, half open."
  ];

  const ep = [
    [
      "What do you do?"
    ],
    [
      "How do you handle it?"
    ],
    [
      "You..."
    ],
    [
      "What's your instinct?"
    ],
    [
      "What do you do?"
    ],
    [
      "You choose to..."
    ],
    [
      "Your reaction?"
    ],
    [
      "What draws you most?"
    ]
  ];

  const options = [
  [
    ["Light your lantern high and step forward confidently", "Sit still and listen to the sound carefully", "Call out gently, hoping someone will answer", "Step into the shadows and watch from a distance"]
  ],
  [
    ["Read it aloud, believing the words need to be heard.", "Place it back carefully and bow. Some things aren’t meant for us.","Add a flower beside it to honor its sender.","Hide it in your cloak to keep it from being destroyed."]
  ],
  [
    ["Offer to lead them home.", "Kneel and ask what they remember.","Hold their hand and comfort them.","Silently walk behind to ensure their safety."]
  ],
  [
    ["Shield it from the wind and keep walking.", "Raise it higher — maybe someone else will see it.","Cup it with both hands and whisper to it.","Sit beside it and wait for the darkness to speak."]
  ],
  [
    ["Calmly guide them to a quiet space."," Observe how they respond — some may be processing.","Offer a sweet to distract and comfort them.","Stand guard at the edge to prevent any further shocks."]
  ],
  [
    ["Encourage them: “Let it carry your story onward.”","Sit beside them in silence until they’re ready.","Fold one too, and float it with them.","Take theirs and release it yourself, quietly."]
  ],
  [
    ["Quickly relight it, keeping the energy alive.","Reflect — maybe its time had passed.","Hold a moment of silence before helping.","Step forward and shield others from the falling debris."]
  ],
  [
    ["The light escaping from it — it could guide someone.","The whispering breeze — something is speaking through it.","The carved symbols — someone left a story here.","The worn edges — who or what has tried to enter?"]
  ]
  ];

  let currEp = 0;
  let currQuest = 0;
  let ans = { E: 0, S: 0, T: 0, J: 0, I: 0, N: 0, F: 0, P: 0 };
  let choicesMade = 0; 
  let currOpt = 0;

  const totalEpisodes = ep.flat().length;

  function updateProgressBar(){
    // const totalQuest = nar.length * ep[0].length;
    const currProgress = currQuest * ep[0].length + currEp;
    const progPercent = (currProgress/totalEpisodes)*100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progPercent + '%';
  }

  function dispQuest() {
    const quizCont = document.getElementById('quiz');
    quizCont.innerHTML = ''; // Clear the quiz container

    updateProgressBar();

    // Create narration element
    if(currEp == 0){
      const questDiv = document.createElement('div');
      questDiv.classList.add('question', 'nar-style');
      questDiv.textContent = nar[currQuest];
      quizCont.appendChild(questDiv);
    }
    
    // Create episode element
    const epDiv = document.createElement('div');
    epDiv.classList.add('episode', 'ep-style');
    epDiv.textContent = ep[currQuest][currEp];
    quizCont.appendChild(epDiv);

    // Display options for current episode only
    const optionsForCurrentEpisode = options[currQuest][currEp];
    for (let i = 0; i < optionsForCurrentEpisode.length; i++) {
      const optDiv = document.createElement('div');
      optDiv.classList.add('option');

      const optTxt = document.createElement('p');
      optTxt.classList.add('ep-style');

      optDiv.appendChild(optTxt);

      const optA = document.createElement('button');
      optA.textContent = optionsForCurrentEpisode[i];
      optA.addEventListener('click', function () {
        recChoice(true, i);
      });
      optDiv.appendChild(optA);

      quizCont.appendChild(optDiv);
    }
  }

  function recChoice(choice, opt) {
    const questionType = currQuest % 4; // 0 = E/I, 1 = S/N, 2 = T/F, 3 = J/P
    const optionType = opt; // 0 or 1

    const properties = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];

    ans[properties[questionType][optionType]] += choice ? 1 : -1;


    if (opt != currOpt){
      currOpt = opt;
      choicesMade++;
    } else{
      choicesMade++;
    }

    if(choicesMade === 1){
      currEp++;
      choicesMade = 0; 
    }

    if (currEp === ep[currQuest].length) {
      currQuest++;
      currEp = 0;
    }

    if (currQuest < nar.length) {
      dispQuest();
    } else {
      rsltPg();
    }
  }

  function calcRslt() {
    let mbti = '';
    mbti += ans.E > ans.I ? 'E' : 'I';
    mbti += ans.S > ans.N ? 'S' : 'N';
    mbti += ans.T > ans.F ? 'T' : 'F';
    mbti += ans.J > ans.P ? 'J' : 'P';
    return mbti;
  }

  function rsltPg() {
    const mbti = calcRslt();
    window.location.href = `result.html?mbti=${mbti}`;
  }

  dispQuest();
}

startQuiz();
