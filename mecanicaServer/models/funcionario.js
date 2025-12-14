"use strict"

module.exports = (sequelize, DataTypes) => {
    const Funcionario = sequelize.define(
        "Funcionario",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nascimento: DataTypes.DATE,
            cpf: DataTypes.STRING,
            rg: DataTypes.STRING,

        },
        {
            sequelize,
            tableName: "Funcionarios",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    Funcionario.associate = function (models) {
        Funcionario.hasMany(models.Endereco, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
            as: "Enderecos",
        });

        Funcionario.hasMany(models.alFuncao, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
            as: "AlFuncoes",
        });

        Funcionario.hasMany(models.quChamado, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
            as: "FilasChamados",
        });

        Funcionario.belongsToMany(models.Permissao, {
            through: models.FuncionarioPermissao,
            foreignKey: "email",
            otherKey: "id_permissao",
            as: "Permissoes",
        });
    };

    return Funcionario;
}
