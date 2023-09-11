require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');



///////////// MONGO DB CONNECTION
// const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(e => console.log('Db connected successfuly')).catch(err => { throw err });
///////////////////////////////////////



//////////// APPLY MIDDLEWARES
var corsOptions = {
  origin: process.env.FRONTEND_URI,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));


////////// API ROUTES
const formApi = require("./routes/formApi");
app.use("/api/form", formApi);
///////////////////////////////////////


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running!");
})