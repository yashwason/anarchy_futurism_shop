require(`dotenv`).config({path: `../process.env`});
const mongoose = require(`mongoose`);

mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    dbName: `${process.env.DB_NAME}`
});

mongoose.connection.on(`connected`, () => { console.log(`DB has connected`); });