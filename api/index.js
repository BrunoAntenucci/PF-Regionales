const server = require('./src/app.js');
require('dotenv').config();

const PORT = process.env.PORT 

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})