const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, addCharacter, getCharacters, deleteCharacter, updateCharacterPower } = require('./controller')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post("/api/characters", addCharacter);
app.get("/api/characters", getCharacters);
app.delete("/api/characters/:id", deleteCharacter);
app.put("/api/characters/:id/power", updateCharacterPower);

app.listen(4000, () => console.log("Server running on 4000"));
