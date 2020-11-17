const Sequelize = require("sequelize");
const { STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const data = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/cameras_db",
  { logging: false }
);

const Reviewer = data.define("reviewer", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(20),
    allowNull: false,
  },
});

const Model = data.define("model", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  img: {
    type: TEXT,
    allowNull: false,
  },
  camModel: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  price: {
    type: TEXT,
    allowNull: false,
  },
  company: {
    type: TEXT,
    allowNull: false,
  },
  url: {
    type: TEXT,
    allowNull: false,
  },
  buyHere: {
    type: TEXT,
    allowNull: false,
  },
});

Model.belongsTo(Reviewer);
Reviewer.hasMany(Model);

const syncAndSeed = async () => {
  await data.sync({ force: true });
  const [theVerge, digitalCameraWorld] = await Promise.all(
    ["theVerge", "digitalCameraWorld"].map((name) => Reviewer.create({ name }))
  );
  await Model.create({
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71PSzOXyzKL._AC_SL1500_.jpg",
    camModel: "Sony A7 III",
    description:
      "The Sony a7 III is an entry-level full-frame camera that goes well beyond the basics in features, with excellent image quality, 10fps subject tracking, and 4K video capture.",
    price: "$1698",
    company: "Sony",
    reviewerId: theVerge.id,
    url:
      "https://www.theverge.com/2018/3/30/17176246/sony-a7-a7r-iii-alpha-3-mirrorless-camera-review-specs-price",
    buyHere:
      "https://www.amazon.com/Sony-Digital-24-105mm-Battery-Backpack/dp/B07BFJ9VCW/ref=sr_1_1_sspa?dchild=1&keywords=sony+a73&qid=1605542000&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyQlFDM0NSTU1MSERCJmVuY3J5cHRlZElkPUEwODA1Mjg5MzZaRkI1WDBWT1ZGMyZlbmNyeXB0ZWRBZElkPUEwMDExNDA0MlVJRlZQTldNTEY4RCZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=",
  });

  // await Model.create({
  //   model: "Fujifilm X-T30",
  //   description:
  //     "The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.",
  //   price: "$1699",
  //   company: "Fujifilm",
  //   reviewerId: jessica.id,
  // });

  await Model.create({
    img:
      "https://images-na.ssl-images-amazon.com/images/I/81XeVWWyUUL._AC_SL1500_.jpg",
    camModel: "Sony a6400",
    description:
      "The Sony a6400 is a camera that straddles the line between consumer and enthusiast, delivering automatic operation for family snapshots with the image quality and speed aficionados love.",
    price: "$898",
    company: "Sony",
    reviewerId: theVerge.id,
    url:
      "https://www.theverge.com/2019/3/15/18266143/sony-a6400-review-mirrorless-compact-vlogging-camera",
    buyHere:
      "https://www.amazon.com/Sony-Mirrorless-Batteries-Messenger-Flexible/dp/B07PXQRJG1/ref=sr_1_2_sspa?dchild=1&keywords=sony+a6400&qid=1605541969&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyOTNEQ0VOT1JJUlRSJmVuY3J5cHRlZElkPUEwMzEwNjM4RDBOTFJLOVJEVUxIJmVuY3J5cHRlZEFkSWQ9QTA1NTgwODkzQTVMSElJUlNMTzdTJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  });
  await Model.create({
    img:
      "https://www.imaging-resource.com/PRODS/fuji-x-t30/Z-FUJI-X-T30-BEAUTY.JPG",
    camModel: "Fujifilm X-T30",
    description:
      "The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.",
    price: "$899",
    company: "Fujifilm",
    reviewerId: digitalCameraWorld.id,
    url:
      "https://www.theverge.com/2019/4/12/18306026/fujifilm-xt30-camera-review-fuji-xt3-mirrorless",
    buyHere:
      "https://www.amazon.com/Fujifilm-X-T30-Mirrorless-Black-Body/dp/B07NQBQ9F2/ref=sr_1_2?dchild=1&keywords=fuji+x-t30&qid=1605541850&sr=8-2",
  });
  await Model.create({
    img:
      "https://www.photoreview.com.au/wp-content/uploads/2019/09/G5-X-II-front_EVF-Flash.jpg",
    camModel: "Canon PowerShot G5 X Mark II",
    description:
      "The Canon PowerShot G5 X Mark II is a pocket camera that will make enthusiasts happy, with a solid zoom range, a 1-inch sensor, and an electronic viewfinder.",
    price: "$898",
    company: "Canon",
    reviewerId: digitalCameraWorld.id,
    url:
      "https://www.digitalcameraworld.com/reviews/canon-powershot-g5-x-mark-ii-review",
    buyHere:
      "https://www.amazon.com/PowerShot-G7-II-Optical-Digital/dp/B07B19TFWG/ref=sr_1_1_sspa?dchild=1&keywords=canon+powershot+g5x+mark+ii&qid=1605541939&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUE5R0VBNDUzNTNNMEsmZW5jcnlwdGVkSWQ9QTA4OTc1NTIxQ08wV1ZLMEZOSlJFJmVuY3J5cHRlZEFkSWQ9QTA5MDA4MjQzRlpSRkxNWFFLQzFQJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  });
};

module.exports = {
  data,
  syncAndSeed,
  models: {
    Model,
    Reviewer,
  },
};

// const pg = require("pg");
// const client = new pg.Client("postgres://localhost/cameras_db");

// const syncAndSeed = async () => {
//   const SQL = `
//         DROP TABLE IF EXISTS camera;

//         CREATE TABLE camera(id SERIAL UNIQUE, model VARCHAR(100) NOT NULL, description VARCHAR(1000), price VARCHAR(10), company VARCHAR(100));

//         INSERT INTO camera (model, description, price, company) VALUES('Sony A7 III', 'The Sony a7 III is an entry-level full-frame camera that goes well beyond the basics in features, with excellent image quality, 10fps subject tracking, and 4K video capture.', '$1698', 'Sony');
//         INSERT INTO camera (model, description, price, company) VALUES('Fujifilm X-T30', 'The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.', '$1699', 'Fujifilm');
//         INSERT INTO camera (model, description, price, company) VALUES('Sony a6400', 'The Sony a6400 is a camera that straddles the line between consumer and enthusiast, delivering automatic operation for family snapshots with the image quality and speed aficionados love.', '$898', 'Sony');
//         INSERT INTO camera (model, description, price, company) VALUES('Fujifilm X-T30', 'The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.', '$899', 'Fujifilm');
//         INSERT INTO camera (model, description, price, company) VALUES('Canon PowerShot G5 X Mark II', 'The Canon PowerShot G5 X Mark II is a pocket camera that will make enthusiasts happy, with a solid zoom range, a 1-inch sensor, and an electronic viewfinder.', '$898', 'Canon');
//     `;
//   await client.query(SQL);
// };

// module.exports = {
//   client,
//   syncAndSeed,
// };

// const pg = require("pg");
// const client = new pg.Client(
//   process.env.DATABASE_URL,
//   "postgres://localhost/cameras_db"
// );
// const fs = require("fs");
// const path = require("path");

// const syncAndSeed = async () => {
//   const sql = fs.readFileSync(path.join(__dirname, "../seed.sql")).toString();
//   await client.query(sql);
// };

// module.exports = {
//   client,
//   syncAndSeed,
// };
