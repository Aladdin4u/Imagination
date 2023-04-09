const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();
const app = express();
const configuration = new Configuration({
  organization: "org-AdmrFarRzl3wwJeWngiNliMP",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/generate-image", async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 1,
      size: "256x256",
    });
    const imageUrl = response.data.data[0].url;
    res.json(imageUrl);
  } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
  }
});

app.listen(process.env.PORT, () =>
  console.log(`connected on port ${process.env.PORT}`)
);
