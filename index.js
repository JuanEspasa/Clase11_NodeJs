const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");

const sequelize = require("sequelize");
const Nuevos = require("./models").nuevos;

// variables de entorno:
require("dotenv").config();

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// rutas y funciones
app.get("/", function(req, res) {
    return Nuevos.findAll({})
    .then(Nuevos => res.status(200).send(Nuevos))
    .catch(error => res.status().send(error))
});

app.post("/", function(req,res){
    return Nuevos.create({
        nombre: req.body.nombre,
        precio: req.body.precio
    })
    .then(Nuevos => res.status(200).send(Nuevos))
    .catch(error => res.status().send(error))
})

app.get("/:id", function(req, res) {
    return Nuevos.findAll({
        where: {
            id:req.params.id
        }
    })
    .then(Nuevos => res.status(200).send(Nuevos))
    .catch(error => res.status().send(error))
})

let port;
if (process.env.NODE_ENV === "production") {
    port = process.env.PORT_PROD;
} else {
    port = process.env.PORT_DEV;
}

app.listen(port, function() {
    console.log("Servidor Activo", port, process.env.NODE_ENV);
})
