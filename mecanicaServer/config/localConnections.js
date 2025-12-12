const {Sequelize} = require("sequilize");
const cls = require("cls-hooked");
const transactionNamespace = cls.createNamespace("transaction_namespace");
Sequelize.useCLS(transactionNamespace);

const sequilize = new Sequelize({
    host: "localhost",
    port: "5432",
    database: "mecanica",
    username: "postgres",
    password: "mr.prince06",
    schema: "public",
    dialect: "postgres",
    freezeTableName: false,
    syncOnAssociation: false,
    logging: console.log,
        define: {
            freezeTableName: true,
            timestamps: false,
        },

});

module.exports = sequilize;
