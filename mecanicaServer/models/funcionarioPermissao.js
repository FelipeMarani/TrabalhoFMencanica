"use strict";

module.exports = (sequelize, DataTypes) => {
    const FuncionarioPermissao = sequelize.define(
        "FuncionarioPermissao",
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
                references: {
                    model: "Funcionario",
                    key: "email",
                },
            },
            id_permissao: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                references: {
                    model: "Permissao",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            tableName: "Funcionario_Permissao",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    FuncionarioPermissao.associate = function (models) {
        FuncionarioPermissao.belongsTo(models.Funcionario, {
            foreignKey: "email",
            targetKey: "email",
        });
        FuncionarioPermissao.belongsTo(models.Permissao, {
            foreignKey: "id_permissao",
            targetKey: "id",
            as: "Permissao",
        });
    };

    return FuncionarioPermissao;
};
