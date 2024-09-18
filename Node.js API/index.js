const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONG0_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors");
const swaggerUi = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");

mongoose.Promise = global.Promise;
mongoose
    .connect(MONG0_DB_CONFIG.DB, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("DataBase connected")
        },
        (error) => {
            console.log("DataBase can't be connected" + err)
        }
    );

app.use(express.json());
app.use("./uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.port || 4000, function () {
    console.log("Ready to Go!")
});