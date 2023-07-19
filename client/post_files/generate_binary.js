#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const {randomBytes} = require("crypto");
const sizeStr = process.argv[2].trim()

const checkInputSize = (sizeStr) => {
    const filename = path.basename(sizeStr);
    const mat = filename.match(/^(\d+)(K|M|G)?$/)
    if(mat === null) {
        throw Error(`Name "${sizeStr}" does not match with binary pattern`);
    }
    const sizeNum = Number(mat[1]);
    const multiple = (mat[2] === "K") ? 1024 : (mat[2] === "M") ? 1024 ** 2 : (mat[2] === "G") ? 1024 ** 3 : 1;
    return sizeNum * multiple;
}

const generateBinary = (destination, size = 100) => {
    while(size > 0) {
        const sizeToWrite = Math.min(size, 10 * 1024 ** 2);
        size -= sizeToWrite;
        var buff = randomBytes(sizeToWrite);
        fs.appendFileSync(destination, buff);
    }
}

const size = checkInputSize(sizeStr);
const output = path.join("blobs", sizeStr+".bin");
generateBinary(output, size);



