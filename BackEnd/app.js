const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const DB_URI = `mongodb+srv://habibsaeed905:habibsaeed123@cluster0.ztltcrg.mongodb.net/`;
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () =>
    console.log("My MongoDB Is Connected")
);
mongoose.connection.on("error", (err) => console.log("Error In MongoDb", err));
app.get("/", (req, res) => {
    res.json({
        message: "Server Up"
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})