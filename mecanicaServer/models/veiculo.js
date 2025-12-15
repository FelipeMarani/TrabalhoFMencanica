"use strict"

module.exports = (sequelize, DataTypes) => {
    const Veiculo = sequelize.define(
        "Veiculo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            modelo: DataTypes.STRING,
            placa: DataTypes.STRING,
            marca: DataTypes.STRING,
            id_cliente: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_tpVeiculo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }

        },
        {
            sequelize,
            tableName: "veiculo",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    Veiculo.associate = function (models) {
        Veiculo.belongsTo(models.Cliente, {
            foreignKey: "id_cliente",
            targetKey: "id",
            as: "Cliente",
        });

        Veiculo.belongsTo(models.tpVeiculo, {
            foreignKey: "id_tpVeiculo",
            targetKey: "id",
            as: "TipoVeiculo",
        });
    };

    return Veiculo;
}
