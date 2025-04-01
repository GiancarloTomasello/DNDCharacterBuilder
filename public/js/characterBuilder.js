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


var cantripMenuElement = document.getElementById('cantripMenu');
var preparedCantripElement = document.getElementById('preparedCantrips');


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
        spellChoiceElement.innerHTML = "no spells available for class";
        return;
    }

    // /* Cantrip Selection */
    // let availableSpells = getSpellList(0);


    // /* Spell Selection*/
    // spellChoiceElement.innerHTML = '';

    //Make a seperate function?
    classSpells = getSpellList(1);
    spellIndex = 0;
    classCantrips = getSpellList(0);
    UpdateSpellMenu(null, 0);

    // availableSpells = getSpellList(1);

    // for(let numSpells = 0; numSpells < 4; numSpells++){
    //     let spellSelector = document.createElement('select');
    //     for(const spell of availableSpells){
    //         let spellOption = document.createElement('option');
    //         spellOption.textContent = spell.spellName;
    //         spellSelector.appendChild(spellOption);
    //     }

    //     let newDiv = document.createElement('div');
    //     spellChoiceElement.appendChild(newDiv);
    //     spellChoiceElement.appendChild(spellSelector);
        
    // }
    


}

function getSpellList(spellLimit = 9, getCantrips = false){
    return getCantrips ?
        spells.filter( spell => spell.classRestrict.includes(classes[listDiv.selectedIndex].className) && spell.spellLevel == 0) :
        spells.filter( spell => spell.classRestrict.includes(classes[listDiv.selectedIndex].className) && spell.spellLevel > 0 && spell.spellLevel <= spellLimit);
}

let classSpells = getSpellList(1);
// console.log(classSpells);
let spellIndex = 0;
let classCantrips = getSpellList(0);
// console.log(classCantrips);

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
    console.log("openSpellMenu");
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
    console.log(spellIndex);

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
        console.log("Spell already in library")
        preparedSpells.delete(classSpells[spellIndex].spellName);
    }else if(preparedSpells.size < classes[listDiv.selectedIndex].preparedSpells){ 
        preparedSpells.add(classSpells[spellIndex].spellName);
        console.log(preparedSpells);
    }
    //console.log("test:" + numSpellsElement.textContent)
    numSpellsElement.textContent = `Choose Spells ${preparedSpells.size}/${classes[listDiv.selectedIndex].preparedSpells}`
    updatePreparedSpells();
    
}

function updatePreparedSpells(){
    preparedSpellsElement.innerHTML = '';
    preparedSpells.forEach((spell) => {
        let newdiv = document.createElement('div');
        newdiv.textContent = spell;
        preparedSpellsElement.appendChild(newdiv);
    });
    //preparedSpellsElement.innerHTML;
    console.log(preparedSpellsElement);
}

function updateCantripMenu(e, cantripChange){
    if(e)
        e.preventDefault();
    //window.alert(spellChange)

    spellIndex += spellChange;

    if(spellIndex >= classSpells.length){
        spellIndex = 0;
    }else if(spellIndex < 0){
        spellIndex = classSpells.length -1;
    }
    console.log(spellIndex);

    //---Update Spell Menu------//
    cantripMenuElement.querySelector("#spellTitle").textContent = classSpells[spellIndex].spellName;
    cantripMenuElement.querySelector("#spellSchool").textContent = `Level ${classSpells[spellIndex].spellLevel} ${classSpells[spellIndex].spellSchool} [${classSpells[spellIndex].classRestrict.toString()}]`;
    cantripMenuElement.querySelector("#castingTime").textContent = `Casting Time: ${classSpells[spellIndex].castingTime}`;
    cantripMenuElement.querySelector("#range").textContent = `Range: ${classSpells[spellIndex].range}`;
    cantripMenuElement.querySelector("#component").textContent = `Components: [${classSpells[spellIndex].components.toString()}]`;
    cantripMenuElement.querySelector("#duration").textContent = `Duration: ${classSpells[spellIndex].duration}`;
    cantripMenuElement.querySelector("#description").textContent = `Duration: ${classSpells[spellIndex].description}`;

}

updateVal();

/* Event Listenters */
listDiv.addEventListener("change", updateVal);
spellMenuButton.addEventListener("click", ToggleSpellMenu);
rightSpellButton.addEventListener("click", (event)=> {UpdateSpellMenu(event, 1)});
leftSpellButton.addEventListener("click", (event)=> {UpdateSpellMenu(event, -1)});
addSpellButton.addEventListener("click", AddSpellToCharacter);


function validateForm(event) {
    event.preventDefault();
    console.log("validating.....");
    return true;
}
