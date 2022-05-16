Blockly.defineBlocksWithJsonArray([{
  "type": "turnLeft",
  "message0": "Turn Left",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Virar se para a direita",
  "helpUrl": "www.google.com"
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "turnRight",
  "message0": "Turn Right",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "moveForward",
  "message0": "Move Forward",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "star",
  "message0": "Star",
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.JavaScript['turnLeft'] = function(block) {
  var code = 'virarEsquerda();\n';
  return code;
};

Blockly.JavaScript['turnRight'] = function(block) {
  var code = 'virarDireita();\n';
  return code;
};

Blockly.JavaScript['moveForward'] = function(block) {
  var code = 'moverParaFrente();\n';
  return code;
};

Blockly.JavaScript['star'] = function(block) {
  var code = 'onTheZone()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};