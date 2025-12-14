"use strict"

module.exports = (sequelize, DataTypes) => {
    const tpVeiculo = sequelize.define(
        "tpVeiculo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            nome: DataTypes.STRING,

        },
        {
            sequelize,
            tableName: "Tipo_Veiculo",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    tpVeiculo.associate = function (models) {
        tpVeiculo.hasMany(models.Veiculo, {
            foreignKey: "id_tpVeiculo",
            sourceKey: "id",
            as: "Veiculos",
        });
    };

    return tpVeiculo;
}
