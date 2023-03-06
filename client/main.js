const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addCharacterForm = document.getElementById("addCharacterForm");
const characterContainer = document.querySelector("#characterContainer");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/")
  .then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/")
  .then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getAllCharacters = () => {
  axios.get("http://localhost:4000/api/characters")
  .then((res) => {
    const characters = res.data;
    displayCharacters(characters);
    console.log(characters)
  });
};

const displayCharacters = (characters) => {
  characterContainer.innerHTML = "";
  characters.forEach(character => {

    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character")

    const nameH2 = document.createElement("h2");
    nameH2.textContent = character.name;
    characterDiv.appendChild(nameH2);

    const heightPara = document.createElement("p");
    heightPara.textContent = `height: ${character.height}`;
    characterDiv.appendChild(heightPara);

    const hairColorPara = document.createElement("p");
    hairColorPara.textContent = `Hair Color: ${character.hairColor}`;
    characterDiv.appendChild(hairColorPara);

    const agePara = document.createElement("p");
    agePara.textContent = `Age: ${character.age}`;
    characterDiv.appendChild(agePara);

    const powerPara = document.createElement("p");
    powerPara.textContent = `Power: ${character.power}`;
    characterDiv.appendChild(powerPara);

    const updatePowerBtn = document.createElement("button");
    updatePowerBtn.textContent = "Update Power";
    updatePowerBtn.addEventListener("click", () => {
      const newPower = prompt("Enter new power:");
      if (newPower) {
        updatePower(character.id, newPower);
      }
    });
    characterDiv.appendChild(updatePowerBtn);

    const image = document.createElement("img");
    image.src = character.imageURL;
    characterDiv.appendChild(image);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteCharacter(character.id);
    });
    characterDiv.appendChild(deleteBtn);

    characterContainer.appendChild(characterDiv);
  });
};

const addCharacter = () => {
  const name = document.getElementById("nameInput").value;
  const height = document.getElementById("heightInput").value;
  const hairColor = document.getElementById("hairColorInput").value;
  const age = document.getElementById("ageInput").value;
  const power = document.getElementById("powerInput").value;
  const imageURL = document.getElementById("imageURLInput").value;
  
  axios.post("http://localhost:4000/api/characters", {
  name,
  height,
  hairColor,
  age,
  power,
  imageURL
  }).then((response) => {
  console.log(response.data);
  getAllCharacters();
  }).catch((error) => {
  console.log(error);
  });
  
  addCharacterForm.reset();
};

const deleteCharacter = (id) => {
    axios.delete(`http://localhost:4000/api/characters/${id}`)
      .then(() => {
        console.log(`Character with ID ${id} deleted`);
        getAllCharacters();
      })
      .catch((error) => {
        console.log(error);
      });
};

const updatePower = (id, power) => {
  axios.put(`http://localhost:4000/api/characters/${id}/power`, { power })
  .then((res) => {
      console.log(res.data);
      getAllCharacters(); 
    })
    .catch((error) => {
      console.log(error);
    });
};
  

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
addCharacterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCharacter();
});
getAllCharacters();