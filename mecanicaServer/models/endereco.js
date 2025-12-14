"use strict";

module.exports =
    "use strict";

module.exports = (sequelize, DataType) => {
    const Endereco = sequelize.define(
        "Endereco",
        {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
            },
            logradouro: DataType.STRING,
            numero: DataType.STRING,
            complemento: DataType.STRING,
            bairro: DataType.STRING,
            cidade: DataType.STRING,
            estado: DataType.STRING,
            cep: DataType.STRING,
            id_funcionario: {
                type: DataType.INTEGER,
                primaryKey: true,
            }
        },
        {
            sequelize,
            tableName: "Endereco",
            schema: "public",
            freezeTablename: true,
            timestamps: false,
        },
    );

    Endereco.associate = function (models) {
        Endereco.belongsTo(models.Endereco, {
            foreingKey: "id_funcionario",
            sourceKey: "id",
        });
    }

}
