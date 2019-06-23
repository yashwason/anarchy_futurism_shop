const mongoose = require(`mongoose`);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    dbName: process.env.DB_NAME
})
.then((data) => {
    console.log(`DB has connected`);
})
.catch((err) => {
    console.log(`Error connecting to DB. Error: ${err}`);
});