const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const data = require("./data");
app.use(express.static(path.join(__dirname, "public")));

const head = ``;

app.get("/", (req, res) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
      <h1>Top Camera List</h1>
        <div class="container">${data.cameras
          .map(
            (camera) => `<div class="content">
        <h3><a href=/camera/${camera.cameraId}>${camera.name}</a></h3>
        
        </div>`
          )
          .join("")}
  </body>
  </html>
  
  `;
  res.send(html);
});

app.get("/camera/:cameraId", (req, res) => {
  const camera = data.cameras.find((c) => c.cameraId === req.params.cameraId);
  if (!camera) {
    throw new Error("Not Found");
  }

  const html = `<!DOCTYPE html>
  <html>
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="/item.css" />
  </head>
  <body>
      <div id="nav">
        <ul>
          <il><a href="/">Back</a>
        </ul>
      </div>
      
      <div id="camera-container">
        <h1 id="camera-title">${camera.name}</h1>
        <h3 id="camera-sub">${camera.description}</h3>
        <p>Brand: ${camera.brand}</p>
        <p>Price: ${camera.price}</p>
      </div>

  </body>
  </html>`;
  res.send(html);
});

app.use((err, req, res, next) => {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title> My Cameras </title>
    <link type="text/css" rel="stylesheet" href="/item.css" />
  </head>
    <body>
      <div id="nav">
        <ul>
          <li><a href="/">Back</a></li>
        </ul>
      </div>
      <div id="err-container">
        <h1>Error 404</h1>
        <p>This Camera WILL never exist!</p>
      </div>
    </body>
  </html>
  `;
  res.status(404).send(html);
  next(err);
});

app.listen(3000);
