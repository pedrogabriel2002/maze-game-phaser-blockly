var demoWorkspace = Blockly.inject('blocklyDiv', {
  media: 'https://unpkg.com/blockly/media/',
  maxBlocks: 30,
  toolbox: document.getElementById('toolbox'),
  scrollbars: false,
});

var stepButton = document.getElementById('stepButton');
var myInterpreter = null;

function initApi(interpreter, globalObject) {
  //Adicionando a função prompt.
  var wrapper = function (text) {
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(globalObject, 'prompt',
    interpreter.createNativeFunction(wrapper));

  //Adicionando as função de movimento e rotação no interpretador.
  var wrapper = function () {
    return interpreter.createPrimitive(virarEsquerda());
  };
  interpreter.setProperty(globalObject, 'virarEsquerda',
    interpreter.createNativeFunction(wrapper));
  var wrapper = function () {
    return interpreter.createPrimitive(virarDireita());
  };
  interpreter.setProperty(globalObject, 'virarDireita',
    interpreter.createNativeFunction(wrapper));
  var wrapper = function () {
    return interpreter.createPrimitive(moverParaFrente());
  };
  interpreter.setProperty(globalObject, 'moverParaFrente',
    interpreter.createNativeFunction(wrapper));
  var wrapper = function () {
    return interpreter.createPrimitive(onTheZone());
  };
  interpreter.setProperty(globalObject, 'onTheZone',
    interpreter.createNativeFunction(wrapper));

  // Adicioando a função de highlight no interpretador
  var wrapper = function (id) {
    id = String(id || '');
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));

}

var highlightPause = false;
var latestCode = '\n';

function highlightBlock(id) {
  demoWorkspace.highlightBlock(id);
  highlightPause = true;
}

function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
}

function runBlocks(repeat) {

  const buttonImage = document.getElementById('btn-img')

  buttonImage.src = "css/restart.png"

  if (!myInterpreter &&	gameOver === false) {
    myInterpreter = new Interpreter(latestCode, initApi);
    console.log(latestCode)
    setTimeout(function () {
      highlightPause = true;
      myInterval = setInterval(nextCodeStep, 1000);
    }, 1);

    gameOver = true

    return;
  } else {
    buttonImage.src = "css/play.png"
    myInterpreter = null;
    resetPosition(repeat)
  }
}

function nextCodeStep() {
  highlightPause = false;
  do {
    try {
      var hasMoreCode = myInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        // Program complete, no more code to execute.
        myInterpreter = null;

        // Cool down, to discourage accidentally restarting the program.
        stepButton.disabled = 'disabled';
        setTimeout(function () {
          stepButton.disabled = '';
        }, 2000);
        clearInterval(myInterval);
        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

function showCodePopUp(btnNext) {
  document.getElementById("popup-1").classList.toggle("active")
  document.getElementById("code").textContent = ''
  const splitCode = latestCode.split(';\n')

  for (let index = 0; index < splitCode.length; index++) {
    document.getElementById("code").textContent += splitCode[index] + ';\n'
  }

  if (btnNext) {
    document.getElementById("nextStage").style.visibility = 'visible'
    document.getElementById("repeatStage").style.visibility = 'visible'
  } else {
    document.getElementById("nextStage").style.visibility = 'hidden'
    document.getElementById("repeatStage").style.visibility = 'hidden'
  }
}

document.getElementById("nextStage").addEventListener('click', () => {
  const { stage } = Qs.parse(location.search, { ignoreQueryPrefix: true })
  switch (stage) {
    case '1':
      location.href = 'game.html?stage=2&posx=368&posy=176'
      break;
  
    case '2':
      location.href = 'game.html?stage=3&posx=464&posy=240'
      break;
  
    case '3':
      location.href = 'game.html?stage=4&posx=176&posy=368'
      break;
  
    case '4':
      location.href = 'index.html'
      break;
  }
})

function enableMakerMode() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', runBlocks);
  });
}

enableMakerMode();
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function (event) {
  if (!(event instanceof Blockly.Events.Ui)) {
    // Something changed. Parser needs to be reloaded.
    generateCodeAndLoadIntoInterpreter();
  }
});
function onchange(event) {
  document.getElementById('capacity').textContent = '    ' + demoWorkspace.remainingCapacity();
}
demoWorkspace.addChangeListener(onchange);
onchange();