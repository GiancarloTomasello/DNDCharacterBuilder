import data from '../data/dndData.json' with {type: 'json'};
const backgrounds = data.data.backgrounds;
const species = data.data.species;

console.log(data.data.species);

var backgroundList = document.getElementById('backgroundsList');
var specieList =  document.getElementById('speciesList');
var characterBackground = {
    abilityScores: document.getElementById('abilityScores'),
    skillProficency: document.getElementById('skillProficiency'),
    originFeat: document.getElementById('originFeat'),
    toolProficiency: document.getElementById('toolProficiency')
};
var speciesElement = {
    creatureType: document.getElementById('creatureType'),
    sizeClass: document.getElementById('sizeClass'),
    speed: document.getElementById('speed')
}



console.log(characterBackground);

for(var i=0; i<backgrounds.length; i++){
    var option= document.createElement('option');
    option.text= backgrounds[i].backgroundName;
    backgroundList.appendChild(option);
}

for(var i=0; i<species.length; i++){
    var option= document.createElement('option');
    option.text= species[i].speciesName;
    specieList.appendChild(option);
}

const updateBackgroundVal = function() {
    characterBackground.abilityScores.textContent = ""

    /*Ability Score*/
    if(!backgrounds[backgroundList.selectedIndex].abilityScore){
        return;
    }
    var abilityScores = "";
    for(const abilityScore of backgrounds[backgroundList.selectedIndex].abilityScore){
        if(!abilityScores){
            abilityScores+=abilityScore;
        }else{
            abilityScores+=`, ${abilityScore}`;
        }
    }
    characterBackground.abilityScores.textContent = abilityScores;

    /*Background Feat*/
    characterBackground.originFeat.textContent = backgrounds[backgroundList.selectedIndex].feat;

    /*Skill Proficiency */
    if(!backgrounds[backgroundList.selectedIndex].skillProficency){
        return;
    }
    var skills = "";
    for(const skill of backgrounds[backgroundList.selectedIndex].skillProficency){
        if(!skills){
            skills+=skill;
        }else{
            skills+=`, ${skill}`;
        }
    }
    characterBackground.skillProficency.textContent = skills;

    /*Tool Proficiency*/
    characterBackground.toolProficiency.textContent = backgrounds[backgroundList.selectedIndex].toolProficency;

};

const updateSpeciesVal = function() {
  speciesElement.creatureType.textContent = species[specieList.selectedIndex].creatureType;
  speciesElement.sizeClass.textContent = species[specieList.selectedIndex].sizeClass;
  speciesElement.speed.textContent = species[specieList.selectedIndex].speed;

    let speciePanel = document.getElementById('SpecieFeat');
    speciePanel.innerHTML = '';

    if(!speciePanel){
        console.log("problem");
    }

    for(const feature of species[specieList.selectedIndex].racialFeatures){
        let newFeatureText = document.createElement("p");
        newFeatureText.textContent = feature.abilityName;
        speciePanel.appendChild(newFeatureText);
    }


};

updateBackgroundVal();
backgroundList.addEventListener("change", updateBackgroundVal);

updateSpeciesVal();
specieList.addEventListener("change", updateSpeciesVal);
