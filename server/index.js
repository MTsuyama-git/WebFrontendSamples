const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
const multer = require("multer");
const upload = multer();

app.use(express.json())

const port_number = process.env["PORT"] || 3000;
const assert_dir = process.env["ASSETS"] || "./assets"
let file = "";
let obj = {};

if (fs.existsSync(assert_dir)) {
    fs.mkdirSync(assert_dir, { recursive: true });
}

app.get("/", (req, res) => {
    res.status(200).json({
        message: "ok"
    });
})

app.post("/json", (req, res) => {
    console.log(req.body);
    obj = req.body;
    res.status(200).json({
        message: "ok"
    })
})

app.get("/json", (req, res) => {
    res.status(200).json(obj);
})

app.post("/raw", upload.any(), (req, res) => {
    file = req.files[0].buffer.toString();
    console.log(file);

    res.status(200).json({
        message: "ok"
    })
})

app.get("/raw", (req, res) => {
    res.status(200).send(
        file
    )
})

app.listen(port_number, () => {
    console.log(`listening on: ${port_number}`)
})