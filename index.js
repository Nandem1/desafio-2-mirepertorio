const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

app.listen(
  3000,
  console.log("\x1b[36m%s\x1b[0m", "Servidor en puerto http://localhost:3000")
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  res.send(repertorio);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  canciones.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Cancion agregada correctamente");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  const index = canciones.findIndex((cancion) => cancion.id === id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Cancion eliminada correctamente");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((cancion) => cancion.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Cancion actualizada correctamente");
});
