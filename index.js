const {
  data,
  syncAndSeed,
  models: { Model, Reviewer },
} = require("./db/data");
const express = require("express");
const path = require("path");

const app = express();

app.use("/style.css", (req, res) =>
  res.sendFile(path.join(__dirname, "style.css"))
);
app.use("/item.css", (req, res) =>
  res.sendFile(path.join(__dirname, "item.css"))
);
// app.use("/Images", express.static(path.join(__dirname, "images")));

app.get("/", async (req, res, next) => {
  try {
    const cameras = await Model.findAll();
    // const response = await client.query("SELECT * FROM camera;");
    // const cameras = response.rows;
    console.log("this is happening");
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="/style.css" />
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
                <h4 class='camera-model'>${camera.camModel}</h4>
                
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
    const camera = await Model.findByPk(req.params.id, { include: [Reviewer] });

    // const camera = await Model.findByPk(req.params.id, { include: [Reviewer] });
    // console.log(camera.reviewer.name);
    // const camera = await Model.findAll({ include: [Reviewer] });
    // const rev = reviewer[0].model[0].id;
    // console.log(rev);
    // const response = await client.query("SELECT * FROM camera WHERE id=$1;", [
    //   req.params.id,
    // ]);
    // const camera = response.rows[0];
    const html = `<!DOCTYPE html>
  <html>
  <head>
      <title>Top Cameras</title>
      <link rel="stylesheet" href="/item.css" />
      </head>
  <body>
      <div class="nav">
        <div class='button'>
          <il><a href="/">Back</a>
          <il><a href="">Next</a>
        </div>
          <div class='images'>
          <img src='${camera.img}' width="250" height="auto"/>
        </div>
      <div class="camera-container">
        <div>
          <h2 id="camera-title">${camera.camModel}</h2>
          <h3>Full review here:  <a href='${camera.url}'>${camera.reviewer.name}</a></h3>
        </div>  
        <div> 
          <h3>Description:</h3>
          <h4 id="camera-sub">${camera.description}</h4>
        </div>  
          <div>
            <p>Brand: ${camera.company}</p>
            <p>Price: ${camera.price}</p>
            <p>Buy Here: <a href='${camera.buyHere}'>Amazon</a></p>
          </div>
        </div>
  </body>
  </html>`;
    res.send(html);
  } catch (ex) {
    next(ex);
  }
});

//<il><a href="/">Back</a>
// {/* <il><a href="">Next</a> */}

app.use((err, req, res, next) => {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title> My Cameras </title>
    <link rel="stylesheet" href="./public/style.css" />
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

const setUp = async () => {
  try {
    await data.authenticate();
    await syncAndSeed();
    // await Model.findAll();
    console.log("connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log("listening on port 3000"));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
