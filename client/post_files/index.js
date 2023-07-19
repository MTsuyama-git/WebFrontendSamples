#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const input = process.argv[2].trim()

const postFile = (url, filename, body) => {
    import("node-fetch").then((module) => {
        const fetch = module.default;
        let formData = new FormData();
        formData.append("file", body, filename);
        fetch(url, {
            method: "post",
            body: formData,
        }).then(async (resp) => {
            console.log(await resp.text())
        }).catch((error) => {
            console.log(error);
        })
    })
}

postFile("http://localhost:3000/raw", path.basename(input), new Blob([fs.readFileSync(input, "utf-8")], {type: "text/plain"}));



