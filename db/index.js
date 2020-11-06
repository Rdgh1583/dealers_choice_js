const pg = require("pg");
const client = new pg.Client("postgres://localhost/cameras_db");

const syncAndSeed = async () => {
  const SQL = `
        DROP TABLE IF EXISTS camera;
        CREATE TABLE camera(id SERIAL UNIQUE, model VARCHAR(100) NOT NULL, description VARCHAR(1000), price VARCHAR(10), company VARCHAR(100));
        
        INSERT INTO camera (model, description, price, company) VALUES('Sony A7 III', 'The Sony a7 III is an entry-level full-frame camera that goes well beyond the basics in features, with excellent image quality, 10fps subject tracking, and 4K video capture.', '$1698', 'Sony');
        INSERT INTO camera (model, description, price, company) VALUES('Fujifilm X-T30', 'The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.', '$1699', 'Fujifilm');
        INSERT INTO camera (model, description, price, company) VALUES('Sony a6400', 'The Sony a6400 is a camera that straddles the line between consumer and enthusiast, delivering automatic operation for family snapshots with the image quality and speed aficionados love.', '$898', 'Sony');
        INSERT INTO camera (model, description, price, company) VALUES('Fujifilm X-T30', 'The Fujifilm X-T30 is a dial-based controls are appealing to enthusiasts and pros, and it backs them up with speedy, accurate focus, 4K video, and a strong lens library.', '$899', 'Fujifilm');
        INSERT INTO camera (model, description, price, company) VALUES('Canon PowerShot G5 X Mark II', 'The Canon PowerShot G5 X Mark II is a pocket camera that will make enthusiasts happy, with a solid zoom range, a 1-inch sensor, and an electronic viewfinder.', '$898', 'Canon');
    `;
  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed,
};
