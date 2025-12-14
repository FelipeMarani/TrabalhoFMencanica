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
        Funcionario.hasMany(models.alinhamento_funcao, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
        });
    };

    Funcionario.associate = function (models) {
        Funcionario.hasMany(models.Fila_Chamados, {
            foreignKey: "id_funcionario",
            sourceKey: "id",
        });
    };
}
