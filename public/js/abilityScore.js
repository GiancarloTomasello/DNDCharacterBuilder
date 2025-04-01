
var StrengthInput = document.getElementById('StrengthInput');
var DexterityInput = document.getElementById('DexterityInput');
var ConsitutionInput = document.getElementById('ConstitutionInput');
var IntelligenceInput = document.getElementById('IntelligenceInput');
var WisdomInput = document.getElementById('WisdomInput');
var CharismaInput = document.getElementById('CharismaInput');

var DexterityDisplay = document.getElementById('DexterityBaseScore');
var ConsitutionDisplay = document.getElementById('ConstitutionBaseScore');
var IntelligenceDisplay = document.getElementById('IntelligenceBaseScore');
var WisdomDisplay = document.getElementById('WisdomBaseScore');
var CharismaDisplay = document.getElementById('CharismaBaseScore');


const updateStrength = function(){
    var StrengthDisplay = document.getElementById('StrengthBaseScore');
    var StrengthModifierDisplay = document.getElementById('strengthModifier');
    var statNum = StrengthInput.value;

    StrengthDisplay.textContent = "Base Score: " + statNum;
    var ModifierText = "Modifier: "
    statNum = parseInt(((statNum-10)/2), 10);
    if(statNum < 0){
        ModifierText += statNum
    }else{
        ModifierText += "+" + statNum
    }
    StrengthModifierDisplay.textContent = ModifierText;
    
}

const updateStat = function(statName){
    var StatInput = document.getElementById(statName + 'Input');
    
    var StatDisplay = document.getElementById(statName + 'BaseScore');
    var StatModifierDisplay = document.getElementById(statName + 'Modifier');
    var statNum = StatInput.value;
    
    //console.log(StatDisplay);
    
    StatDisplay.textContent = "Base Score: " + statNum;
    var ModifierText = "Modifier: "
    statNum = parseInt(((statNum-10)/2), 10);
    if(statNum < 0){
        ModifierText += statNum
    }else{
        ModifierText += "+" + statNum
    }
    StatModifierDisplay.textContent = ModifierText;
}

const updateDexterity = function(){
    DexterityDisplay.textContent = "Base Score: " + DexterityInput.value;
}
const updateConstitution = function(){
    ConsitutionDisplay.textContent = "Base Score: " + ConsitutionInput.value;
}
const updateIntelligence = function(){
    IntelligenceDisplay.textContent = "Base Score: " + IntelligenceInput.value;
}
const updateWisdom = function(){
    WisdomDisplay.textContent = "Base Score: " + WisdomInput.value;
}
const updateCharisma = function(){
    CharismaDisplay.textContent = "Base Score: " + CharismaInput.value;
}

StrengthInput.addEventListener('change', () => {updateStat('Strength')});
DexterityInput.addEventListener('change', () => {updateStat('Dexterity')});
ConsitutionInput.addEventListener('change', () => {updateStat('Constitution')});
IntelligenceInput.addEventListener('change', () => {updateStat('Intelligence')});
WisdomInput.addEventListener('change', () => {updateStat('Wisdom')});
CharismaInput.addEventListener('change', () => {updateStat('Charisma')});





