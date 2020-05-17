const config = require('./config/config');
const app = require('./config/express');
const mongo = require('./config/mongoose');

(async () => {
    await mongo.connect()
    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`);
    });
})();


module.exports = app;
