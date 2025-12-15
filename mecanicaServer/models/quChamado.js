"use strict"

module.exports = (sequelize, DataTypes) => {
    const quChamado = sequelize.define(
        "quChamado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            tableName: "fila_chamados",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    quChamado.associate = function (models) {
        quChamado.belongsTo(models.Funcionario, {
            foreignKey: "id_funcionario",
            targetKey: "id",
            as: "Funcionario",
        });

        quChamado.belongsTo(models.Chamado, {
            foreignKey: "id_Chamado",
            targetKey: "id",
            as: "Chamado",
        });

        quChamado.belongsTo(models.stChamado, {
            foreignKey: "id_stChamado",
            targetKey: "id",
            as: "StatusChamado",
        });
    };

    return quChamado;
}
