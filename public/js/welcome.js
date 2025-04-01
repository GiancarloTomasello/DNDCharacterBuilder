const express = require(express);
const router = express.router();

const makeCharB = document.getElementById('makeCharacterButton');
// const viewCharB = document.getElementById('viewCharacterButton');

makeCharB.addEventListener("click", () => {
    router.get('/characterBuilder', (req,res) =>{
        res.redirect(`/characterBuilder`);
    });
})

// viewCharB.addEventListener("click", () => {
//     console.log('viewCharacter page missing');
// })