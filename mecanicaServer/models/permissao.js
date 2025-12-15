"use strict";

module.exports = (sequelize, DataTypes) => {
    const Permissao = sequelize.define(
        "Permissao",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "permissao",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    Permissao.associate = function (models) {
        Permissao.belongsToMany(models.Funcionario, {
            through: models.FuncionarioPermissao,
            foreignKey: "id_permissao",
            otherKey: "email",
            as: "Funcionarios",
        });
    };

    return Permissao;
};
