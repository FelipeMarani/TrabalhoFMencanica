"use strict"

module.exports = (sequelize, DataTypes) => {
    const Funcao = sequelize.define(
        "Funcao",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING

        },
        {
            sequelize,
            tableName: "Funcao",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );
    Funcao.associate = function (models) {
        Funcao.hasMany(models.alinhamento_funcao, {
            foreignKey: "id_funcao",
            sourceKey: "id,"
        });
    };
}
