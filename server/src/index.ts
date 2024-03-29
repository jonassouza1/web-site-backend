import express from "express";
import database from "../infra/database";
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

function transformTheFirstLetterOfThePhraseIntoUppercase(text: any): string {
  const inputText = String(text);
  if (inputText.length === 0) {
    return "";
  }
  return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
}
function checkExistenceOfValueAndConvertToDateFormat(release_date?: string) {
  return release_date ? new Date(release_date) : undefined;
}

app.get("/", (req, res) => {
  return res.status(200).send("hello word");
});
app.post("/user", async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res
      .status(400)
      .send({ message: "It is necessary to fill in the field" });
  } else if (name.length <= 5) {
    return res
      .status(400)
      .send({ message: "Your name must have at least 5 letters..." });
  } else if (password.length <= 8) {
    return res
      .status(400)
      .send({ message: "our password must be at least 8 letters long..." });
  }
  try {
    const nameConverted = transformTheFirstLetterOfThePhraseIntoUppercase(name);
    const queryDuplicateUserName: any = await database.query(
      `SELECT COUNT(DISTINCT id) FROM users WHERE LOWER(name) = LOWER($1) AND password = $2;`,
      [nameConverted, password]
    );

    if (queryDuplicateUserName.rows[0].count > 0) {
      return res
        .status(200)
        .send({ message: "duplicate name, it is not possible to register" });
    }

    await database.query(
      `INSERT INTO users (name,password)
       VALUES ($1,$2);`,
      [nameConverted, password]
    );
  } catch (error) {
    return res.status(500).send({ message: "Failed to register user" });
  }

  return res.status(201).send({ message: "you registered successfully" });
});

app.post("/userlogin", async (req, res) => {
  const { name, password } = req.body;
  const nameConverted = transformTheFirstLetterOfThePhraseIntoUppercase(name);
  if (!name) {
    return res
      .status(400)
      .send({ message: "It is necessary to fill in the field" });
  }
  try {
    const queryDuplicateUser: any = await database.query(
      `SELECT COUNT(*) FROM users WHERE LOWER(name) = LOWER($1) AND password = $2`,
      [nameConverted, password]
    );

    if (queryDuplicateUser.rows[0].count > 0) {
      return res.status(200).send({ message: "Login Successfully " });
    } else {
      return res.status(404).send({ message: "user not registred" });
    }
  } catch (error) {
    return res.status(500).send({ message: "The search failed!!" });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port} `);
});
