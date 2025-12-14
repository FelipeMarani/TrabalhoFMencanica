"use strict"

module.exports = (sequelize, DataTypes) => {
    const quChamado = sequelize.define(
        "quChamado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_funcionario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_Chamado: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_stChamado: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }

        },
        {
            sequelize,
            tableName: "Fila_Chamados",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    quChamado.associate = function (models) {
        quChamado.belongsTo(models.Funcionario, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
        });
    };
    quChamado.associate = function (models) {
        quChamado.belongsTo(models.Chamado, {
            foreignKey: "id_chamado",
            sourceKey: "id",
        });
    };
    quChamado.associate = function (models) {
        quChamado.belongsTo(models.stChamado, {
            foreignKey: "id_stChamado",
            sourceKey: "id",
        });
    };
}
