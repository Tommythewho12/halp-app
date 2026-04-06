"use strict"

import axios from "axios"
import fs from "fs/promises"

const URL = "http://localhost:3000"
const PATH = "api-spec/generated"
const DESTINATION = "../external"
const FILE = "schema.d.ts"

async function main() {
    try {
        const response = await axios.get([URL, PATH, FILE].join("/"), { responseType: "arraybuffer" })
        const fileData = Buffer.from(response.data, "binary")
        await fs.writeFile([DESTINATION, FILE].join("/"), fileData)
    } catch (err) {
        console.error(err)
    }
}

main()