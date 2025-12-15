"use strict"

module.exports = (sequelize, DataTypes) => {
    const Funcao = sequelize.define(
        "Funcao",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING

        },
        {
            sequelize,
            tableName: "funcao",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );
    Funcao.associate = function (models) {
        Funcao.hasMany(models.alFuncao, {
            foreignKey: "id_funcao",
            sourceKey: "id",
            as: "Funcoes",
        });
    };

    return Funcao;
}
