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
                    model: "Permisssao",
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

    UsuarioPermissao.associate = function (models) {
        UsuarioPermissao.belongsTo(models.Usuario, {
            foreignKey: "email",
            targetKey: "email",
        });
        UsuarioPermissao.belongsTo(models.Permissao, {
            foreignKey: "id_permissao",
            targetKey: "id",
            as: "Permissao",
        });
    };

    return UsuarioPermissao;
};
