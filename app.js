const {
  data,
  syncAndSeed,
  models: { User },
} = require("./db");
const express = require("express");
const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
// app.use("/Images", express.static(path.join(__dirname, "images")));

app.get("/", async (req, res, next) => {
  try {
    const cameras = await User.findAll();
    console.log(cameras);
    // const response = await client.query("SELECT * FROM camera;");
    // const cameras = response.rows;
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="./public/style.css" />
  </head>
  <body>
      <h1>Top Cameras</h1>
      <div class='list'>
      <h3>List</h3>
        <ul>
          ${cameras
            .map(
              (camera) => `
            <li>
              <a href='cameras/${camera.id}'>
                <h4 class='camera-model'>${camera.model}</h4>
                
              </a>
            </li>`
            )
            .join("")}
        </ul>
        </div>
  </body>
  </html>
  
  `;
    res.send(html);
  } catch (ex) {
    next(ex);
  }
});

app.get("/cameras/:id", async (req, res, next) => {
  try {
    const camera = await User.findByPk(req.params.id);
    // const response = await client.query("SELECT * FROM camera WHERE id=$1;", [
    //   req.params.id,
    // ]);
    // const camera = response.rows[0];
    const html = `<!DOCTYPE html>
  <html>
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="./public/item.css" />
      </head>
  <body>
      <div class="nav">
        <ul>
          <il><a href="/">Back</a>
        </ul>
      </div>

      <div class="camera-container">
        <h1 id="camera-title">${camera.model}</h1>
        <h3 id="camera-sub">${camera.description}</h3>
        <p>Brand: ${camera.company}</p>
        <p>Price: ${camera.price}</p>
      </div>

  </body>
  </html>`;
    res.send(html);
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title> My Cameras </title>
    <link type="text/css" rel="stylesheet" href="/item.css" />
  </head>
    <body>
      <div class="nav">
        <ul>
          <li><a href="/">Back</a></li>
        </ul>
      </div>
      <div class="err-container">
        <h1>Error 404</h1>
        <p>This Camera WILL never exist!</p>
      </div>
    </body>
  </html>
  `;
  res.status(404).send(html);
  next(err);
});

const port = process.env.PORT || 3000;

const setUp = async () => {
  try {
    await data.authenticate();
    await syncAndSeed();
    await User.findAll();
    console.log("connected");
    app.listen(port, () => console.log("listening on port 3000"));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
