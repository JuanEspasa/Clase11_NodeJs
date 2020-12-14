const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");

// variables de entorno:
require("dotenv").config();

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.json("Hola, llegue")
});

let port;
if (process.env.MODO === "PRODUCCION") {
    port = process.env.PORT_PROD;
} else {
    port = process.env.PORT_DEV;
}

app.listen(port, function() {
    console.log("Servidor Activo", port, process.env.MODO);
})
