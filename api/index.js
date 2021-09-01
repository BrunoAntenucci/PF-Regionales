const server = require("./src/app");
const mongoose = require("mongoose");

const dbURL = "mongodb+srv://matitest:matias123@cluster0.y5xbo.mongodb.net/E-Commerce?retryWrites=true&w=majority"

const port = process.env.PORT || 8080;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(port, () => {
        console.log(`Server listen at port: ${port} & DB connected Mongo Atlas`)
    }))
    .catch((err) => {
      return next(err)
    })