const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`
  <html>
  <link rel="stylesheet" href="css/style.css">
    <body>
      <h1>My Gear</h1>
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/leica-Q2">Leica Q2</a>
          <a href="/sony-a7">Sony A7</a>
          <a href="/nikon-d850">Nikon D850</a>
      </nav>
    </div>
    </body> 
  </html>
  `);
});

app.get("/leica-Q2", (req, res) => {
  res.send(`
  <html>
  <link rel="stylesheet" href="css/style.css">
    <body>
      <h1>Leica Q2</h1>
      <div>
        <p>
        Main Features
        47MP - Full frame CMOS Sensor
        No Optical low-pass (anti-aliasing) filter
        ISO 50 - 50000
        28 mm f1.70 Prime Lens
        Optical Image Stabilization
        3 Fixed Type Screen
        3680k dot Electronic viewfinder
        20.0 fps continuous shooting
        4K (UHD) - 3840 x 2160 video
        Built-in Wireless
        718g. 130 x 80 x 92 mm
        Weather Sealed Body
        Also known as Type No. 4889
        </p>
      </div>
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/leica-Q2">Leica Q2</a>
          <a href="/sony-a7">Sony A7</a>
          <a href="/nikon-d850">Nikon D850</a>
      </nav>
    </div>
    </body> 
  </html>
  `);
});

app.get("/sony-a7", (req, res) => {
  res.send(`
  <html>
  <link rel="stylesheet" href="css/style.css">
    <body>
      <h1>Sony A7</h1>
      <div>
        <p>
        Main Features
        42MP - Full frame BSI-CMOS Sensor
        No Optical low-pass (anti-aliasing) filter
        ISO 100 - 25600( expands to 50-102400)
        5-axis Sensor-shift Image Stabilization
        3 Tilting Screen
        2359k dot Electronic viewfinder
        5.0 fps continuous shooting
        4K (UHD) - 3840 x 2160 video
        Built-in Wireless
        625g. 127 x 96 x 60 mm
        Weather Sealed Body
        </p>
      </div>
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/leica-Q2">Leica Q2</a>
          <a href="/sony-a7">Sony A7</a>
          <a href="/nikon-d850">Nikon D850</a>
      </nav>
    </div>
    </body> 
  </html>
  `);
});

app.get("/nikon-d850", (req, res) => {
  res.send(`
  <html>
  <link rel="stylesheet" href="css/style.css">
    <body>
      <h1>Nikon D850</h1>
      <div>
        <p>
        Main Features
        46MP - Full frame BSI-CMOS Sensor
        No Optical low-pass (anti-aliasing) filter
        ISO 64 - 25600( expands to 32-102400)
        3.2" Tilting Screen
        Optical (pentaprism) viewfinder
        7.0 fps continuous shooting
        4K (UHD) - 3840 x 2160 video
        Built-in Wireless
        1015g. 146 x 124 x 79 mm
        Weather Sealed Body
        
        </p>
      </div>
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/leica-Q2">Leica Q2</a>
          <a href="/sony-a7">Sony A7</a>
          <a href="/nikon-d850">Nikon D850</a>
        </nav>
      </div>
    </body> 
  </html>
  `);
});

app.listen(3000);
