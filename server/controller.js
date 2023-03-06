const characters = require('./db.json');


const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
const fortunes = [
  "Good things come to those who wait, but better things come to those who work for it.",
  "Your perseverance will pay off in the end.",
  "You will discover hidden talents you never knew you had.",
  "A journey of a thousand miles begins with a single step.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "You will soon receive unexpected good news.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."
];


const getCompliment = (req, res) => {
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];
  res.status(200).send(randomCompliment);
};

const getFortune = (req, res) => {
  let randomIndex1 = Math.floor(Math.random() * fortunes.length)
  let randomFortune = fortunes[randomIndex1];
  res.status(200).send(randomFortune);
};

const getCharacters = (req, res) => {
    res.status(200).json(characters);
  };

const addCharacter = (req, res) => {
    const { name, height, hairColor, age, power, imageURL } = req.body;
    const lastId = characters[characters.length - 1].id;
    const newCharacter = { id: lastId + 1, name, height, hairColor, age, power, imageURL };
    characters.push(newCharacter);
    res.status(200).send("Character added successfully");
};

const deleteCharacter = (req, res) => {
  const characterId = req.params.id;

  const characterIndex = characters.findIndex(character => character.id === parseInt(characterId));

  characters.splice(characterIndex, 1);

  res.status(200).send("Character deleted successfully");
};

const updateCharacterPower = (req, res) => {
  const characterId = req.params.id;
  const newPower = req.body.power;

  const characterIndex = characters.findIndex(character => character.id === parseInt(characterId));

  if (characterIndex !== -1) {
    characters[characterIndex].power = newPower;
    res.status(200).send("Power updated successfully");
  } else {
    res.status(404).send("Character not found");
  }
};


module.exports = { getCompliment, getFortune, addCharacter, getCharacters, deleteCharacter, updateCharacterPower };
