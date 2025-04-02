//const data = require('./data/dndData.json');
import data from '../data/dndData.json' with {type: 'json'};
console.log(data.data.classes);
const classes = data.data.classes;
const spells = data.data.spells;

console.log(classes);

/* Get Elemetns*/
var listDiv = document.getElementById('classList');
var classPrimaryAbility = document.getElementById('primariyAbility');
var classLikes = document.getElementById('likes');
//Description //
var hitDiceElement = document.getElementById('hitDie');
var saveThrowElement = document.getElementById('savingThrows');
// insert saving throw logic //
var weaponProficiencyElement = document.getElementById('weaponProficiencies');
var armorTrainingElement = document.getElementById('armorTraining');
var startingEquipmentElement = document.getElementById('startingEquipment');


//Spell elements
var skillSelectionElement = document.getElementById('skillSelection');
var spellChoiceElement = document.getElementById('spellChoices');
var numSpellsElement = document.getElementById('numberOfSpellsChosen');
var spellMenuButton = document.getElementById('spellMenuButton');
var spellPopupElement = document.getElementById('spellPopupMenu');
var isSpellMenuOpen = false;
var leftSpellButton = document.getElementById('leftSpellbutton');
var rightSpellButton = document.getElementById('rightSpellButton');
var addSpellButton = document.getElementById('addSpellButton');

var spellMenuElement = document.getElementById('spellMenu');
var preparedSpellsElement = document.getElementById('preparedSpells');

//Cantrip elements
var cantripPopupElement = document.getElementById('cantripPopupMenu');
var cantripMenuElement = document.getElementById('cantripMenu');
var preparedCantripElement = document.getElementById('preparedCantrips');
var iscantripMenuOpen = false;

var cantripMenuButton = document.getElementById('cantripMenuButton');
var leftCantripButton = document.getElementById('leftCantripbutton');
var rightCantripButton = document.getElementById('rightCantripButton');
var addCantripButton = document.getElementById('addCantripButton');

var numCantripElement = document.getElementById('numberOfCantripsChosen');



var characterForm = document.getElementById('');


for(var i=0; i<classes.length; i++){
    var option= document.createElement('option');
    option.text= classes[i].className;
    listDiv.appendChild(option);
}


const updateVal = function() {
    console.log(listDiv.value);

    classPrimaryAbility.textContent = `Primary Ability: ${classes[listDiv.selectedIndex].primaryAbility}`;
    classLikes.textContent = `Likes: ${classes[listDiv.selectedIndex].likes}`;
    hitDiceElement.textContent = `${classes[listDiv.selectedIndex].hitDie} per ${listDiv.value} level`;
    /*Saving Throws*/
    if(!classes[listDiv.selectedIndex].savingThrows){
        return;
    }
    var savingThrows = "";
    for(const savingThrow of classes[listDiv.selectedIndex].savingThrows){
        if(!savingThrows){
            savingThrows+=savingThrow;
        }else{
            savingThrows+=`, ${savingThrow}`;
        }
    }
    saveThrowElement.textContent = savingThrows;
    /*Skill Selection*/
    // Dynamically Add skills to option list
    //Stretch: remove already selected elements from other options
    skillSelectionElement.innerHTML = '';
    let availableskills = classes[listDiv.selectedIndex].SkillList;
    for(let numChoises = 0; numChoises < classes[listDiv.selectedIndex].NumberOfSkills; numChoises++){
        let skillSelector = document.createElement('select');
        for(const skill of availableskills){
            let skillOption = document.createElement('option');
            skillOption.textContent = skill;
            skillSelector.appendChild(skillOption);
        }
        console.log(numChoises);
        let newDiv = document.createElement('div');
        skillSelectionElement.appendChild(newDiv);
        skillSelectionElement.appendChild(skillSelector);
    }
    /* Weapon Proficiency*/
    var weapons = "";
    if(!classes[listDiv.selectedIndex].weaponProficiencies){
        return;
    }
    for(const weapon of classes[listDiv.selectedIndex].weaponProficiencies){
        if(!weapons){
            weapons+=weapon;
        }else{
            weapons+=`, ${weapon}`;
        }
    }
    weaponProficiencyElement.textContent = weapons;

    /* Weapon Proficiency*/
    var armors = "";
    if(!classes[listDiv.selectedIndex].armorTraining){
        return;
    }
    for(const armor of classes[listDiv.selectedIndex].armorTraining){
        if(!armors){
            armors+=armor;
        }else{
            armors+=`, ${armor}`;
        }
    }
    if(!armors){
        armors = "None";
    }
    armorTrainingElement.textContent = armors;

    if(classes[listDiv.selectedIndex].preparedSpells <= 0){
        numSpellsElement.innerHTML = "no spells available for class";
        numCantripElement.innerHTML = "no cantrips available for class";
        // spellMenuButton.style.display = 'none'
        // cantripMenuButton.style.display = 'none'


        return;
    }else{
        // spellMenuButton.style.display = 'block'
        // cantripMenuButton.style.display = 'block'
    }

    // /* Cantrip Selection */
    // let availableSpells = getSpellList(0);


    // /* Spell Selection*/
    // spellChoiceElement.innerHTML = '';

    //Make a seperate function?
    classSpells = getSpellList(1);
    spellIndex = 0;
    classCantrips = getSpellList(0, true);
    cantripIndex = 0;


    UpdateSpellMenu(null, 0);
    UpdateCantripMenu(null, 0);

    // need to clear out spells added incase they no longer apply to the new calss
    preparedSpells.clear();
    preparedCantrips.clear();
    updatePreparedSpells();
    updatePreparedCantrips();

}

function getSpellList(spellLimit = 9, getCantrips = false){
    return getCantrips ?
        spells.filter( spell => spell.classRestrict.includes(classes[listDiv.selectedIndex].className) && spell.spellLevel == 0) :
        spells.filter( spell => spell.classRestrict.includes(classes[listDiv.selectedIndex].className) && spell.spellLevel > 0 && spell.spellLevel <= spellLimit);
}

let classSpells = getSpellList(1);
// console.log(classSpells);
let spellIndex = 0;
let classCantrips = getSpellList(0, true);
let cantripIndex = 0;
//console.log(classCantrips);

function ToggleSpellMenu(e){
    e.preventDefault();

    UpdateSpellMenu(e, 0);

    if(isSpellMenuOpen){
        isSpellMenuOpen = false;
        spellPopupElement.style.display = 'none';
        spellMenuButton.textContent = 'Open Spell Menu';
    }else{
        isSpellMenuOpen = true;
        spellPopupElement.style.display = 'block';
        spellMenuButton.textContent = 'Hide Spell Menu';
    }
    // console.log("openSpellMenu");
}



function UpdateSpellMenu(e, spellChange){
    if(e)
        e.preventDefault();
    //window.alert(spellChange)
    
    spellIndex += spellChange;
    
    if(spellIndex >= classSpells.length){
        spellIndex = 0;
    }else if(spellIndex < 0){
        spellIndex = classSpells.length -1;
    }
    // console.log(spellIndex);
    
    //---Update Spell Menu------//
    spellMenuElement.querySelector("#spellTitle").textContent = classSpells[spellIndex].spellName;
    spellMenuElement.querySelector("#spellSchool").textContent = `Level ${classSpells[spellIndex].spellLevel} ${classSpells[spellIndex].spellSchool} [${classSpells[spellIndex].classRestrict.toString()}]`;
    spellMenuElement.querySelector("#castingTime").textContent = `Casting Time: ${classSpells[spellIndex].castingTime}`;
    spellMenuElement.querySelector("#range").textContent = `Range: ${classSpells[spellIndex].range}`;
    spellMenuElement.querySelector("#component").textContent = `Components: [${classSpells[spellIndex].components.toString()}]`;
    spellMenuElement.querySelector("#duration").textContent = `Duration: ${classSpells[spellIndex].duration}`;
    spellMenuElement.querySelector("#description").textContent = `Duration: ${classSpells[spellIndex].description}`;
    
    
}

const preparedSpells = new Set();
function AddSpellToCharacter(e){
    e.preventDefault();
    
    if(preparedSpells.has(classSpells[spellIndex].spellName)){
        // console.log("Spell already in library")
        preparedSpells.delete(classSpells[spellIndex].spellName);
    }else if(preparedSpells.size < classes[listDiv.selectedIndex].preparedSpells){ 
        preparedSpells.add(classSpells[spellIndex].spellName);
        // console.log(preparedSpells);
    }
    //console.log("test:" + numSpellsElement.textContent)
    updatePreparedSpells();
    
}

function updatePreparedSpells(){
    numSpellsElement.textContent = `Choose Spells ${preparedSpells.size}/${classes[listDiv.selectedIndex].preparedSpells}`

    preparedSpellsElement.innerHTML = '';
    preparedSpells.forEach((spell) => {
        let newdiv = document.createElement('div');
        newdiv.textContent = spell;
        preparedSpellsElement.appendChild(newdiv);
    });
    //preparedSpellsElement.innerHTML;
    //console.log(preparedSpellsElement);
}

//---Cantrip Functions---//
function ToggleCantripMenu(e){
    e.preventDefault();

    UpdateCantripMenu(e, 0);

    if(iscantripMenuOpen){
        iscantripMenuOpen = false;
        cantripPopupElement.style.display = 'none';
        cantripMenuButton.textContent = 'Open Spell Menu';
    }else{
        iscantripMenuOpen = true;
        cantripPopupElement.style.display = 'block';
        cantripMenuButton.textContent = 'Hide Spell Menu';
    }
    //console.log("openCantripMenu");
}

function UpdateCantripMenu(e, cantripChange){
    if(e)
        e.preventDefault();
    //window.alert(spellChange)

    cantripIndex += cantripChange;

    if(cantripIndex >= classCantrips.length){
        cantripIndex = 0;
    }else if(cantripIndex < 0){
        cantripIndex = classCantrips.length -1;
    }
    // console.log(cantripIndex);
    // console.log(classCantrips);


    //---Update cantrip Menu------//
    cantripMenuElement.querySelector("#spellTitle").textContent = classCantrips[cantripIndex].spellName;
    cantripMenuElement.querySelector("#spellSchool").textContent = `Level ${classCantrips[cantripIndex].spellLevel} ${classCantrips[cantripIndex].spellSchool} [${classCantrips[cantripIndex].classRestrict.toString()}]`;
    cantripMenuElement.querySelector("#castingTime").textContent = `Casting Time: ${classCantrips[cantripIndex].castingTime}`;
    cantripMenuElement.querySelector("#range").textContent = `Range: ${classCantrips[cantripIndex].range}`;
    cantripMenuElement.querySelector("#component").textContent = `Components: [${classCantrips[cantripIndex].components.toString()}]`;
    cantripMenuElement.querySelector("#duration").textContent = `Duration: ${classCantrips[cantripIndex].duration}`;
    cantripMenuElement.querySelector("#description").textContent = `${classCantrips[cantripIndex].description}`;

}

const preparedCantrips = new Set();
function AddCantripToCharacter(e){
    e.preventDefault();
    
    if(preparedCantrips.has(classCantrips[cantripIndex].spellName)){
        console.log("Spell already in library")
        preparedCantrips.delete(classCantrips[cantripIndex].spellName);
    }else if(preparedCantrips.size < classes[listDiv.selectedIndex].preparedCantrips){ 
        preparedCantrips.add(classCantrips[cantripIndex].spellName);
        // console.log(preparedCantrips);
    }
    //console.log("test:" + numSpellsElement.textContent)
    updatePreparedCantrips();
    
}

function updatePreparedCantrips(){
    numCantripElement.textContent = `Choose Cantrips ${preparedCantrips.size}/${classes[listDiv.selectedIndex].preparedCantrips}`

    preparedCantripElement.innerHTML = '';
    preparedCantrips.forEach((spell) => {
        let newdiv = document.createElement('div');
        newdiv.textContent = spell;
        preparedCantripElement.appendChild(newdiv);
    });
    //preparedSpellsElement.innerHTML;
    //console.log(preparedCantripElement);
}

//----//
updateVal();

/* Event Listenters */
listDiv.addEventListener("change", updateVal);
spellMenuButton.addEventListener("click", ToggleSpellMenu);
cantripMenuButton.addEventListener("click", ToggleCantripMenu);

rightSpellButton.addEventListener("click", (event)=> {UpdateSpellMenu(event, 1)});
leftSpellButton.addEventListener("click", (event)=> {UpdateSpellMenu(event, -1)});
addSpellButton.addEventListener("click", AddSpellToCharacter);


rightCantripButton.addEventListener("click", (event)=> {UpdateCantripMenu(event, 1)});
leftCantripButton.addEventListener("click", (event)=> {UpdateCantripMenu(event, -1)});
addCantripButton.addEventListener("click", AddCantripToCharacter);


function validateForm(event) {
    event.preventDefault();
    console.log("validating.....");
    return true;
}
