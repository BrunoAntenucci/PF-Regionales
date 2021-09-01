const server = require('./src/app.js');
require('dotenv').config();

const PORT = process.env.PORT 

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})