"use strict";

module.exports = (sequelize, DataType) => {
    const Endereco = sequelize.define(
        "Endereco",
        {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            tableName: "endereco",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    Endereco.associate = function (models) {
        Endereco.belongsTo(models.Funcionario, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
            as: "Funcionario",
        });
    };

    return Endereco;
}
