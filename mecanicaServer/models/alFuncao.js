"use strict"

module.exports = (sequelize, DataTypes) => {
    const alFuncao = sequelize.define(
        "alFuncao",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_funcao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_funcionario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }
        },
        {
            sequelize,
            tableName: "Alinhamento_funcao",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    alFuncao.associate = function (models) {
        alFuncao.belongsTo(models.Funcao, {
            foreignKey: "id_funcao",
            sourceKey: "id",
            as: "Funcao",
        });
    };

    alFuncao.associate = function (models) {
        alFuncao.belongsTo(models.Funcionario, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
            as: "Funcionario",
        });
    };
}
