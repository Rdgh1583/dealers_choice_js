const Sequelize = require("sequelize");
const { STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const data = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/cameras_db"
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
  model: {
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
});

Model.belongsTo(Reviewer);
Reviewer.hasMany(Model);

const syncAndSeed = async () => {
  await data.sync({ force: true });
  const [rommel, jessica] = await Promise.all(
    ["rommel", "jessica"].map((name) => Reviewer.create({ name }))
  );
  await Model.create({
    model: "Sony A7 III",
    description:
      "The Sony a7 III is an entry-level full-frame camera that goes well beyond the basics in features, with excellent image quality, 10fps subject tracking, and 4K video capture.",
    price: "$1698",
    company: "Sony",
    reviewerId: jessica.id,
  });
  await Model.create({
    model: "Fujifilm X-T30",
    description:
      "The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.",
    price: "$1699",
    company: "Fujifilm",
    reviewerId: jessica.id,
  });
  await Model.create({
    model: "Sony a6400",
    description:
      "The Sony a6400 is a camera that straddles the line between consumer and enthusiast, delivering automatic operation for family snapshots with the image quality and speed aficionados love.",
    price: "$898",
    company: "Sony",
    reviewerId: jessica.id,
  });
  await Model.create({
    model: "Fujifilm X-T30",
    description:
      "The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.",
    price: "$899",
    company: "Fujifilm",
    reviewerId: rommel.id,
  });
  await Model.create({
    model: "Canon PowerShot G5 X Mark II",
    description:
      "The Canon PowerShot G5 X Mark II is a pocket camera that will make enthusiasts happy, with a solid zoom range, a 1-inch sensor, and an electronic viewfinder.",
    price: "$898",
    company: "Canon",
    reviewerId: rommel.id,
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
