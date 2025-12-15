"use strict"

module.exports = (sequelize, DataTypes) => {
    const stChamado = sequelize.define(
        "stChamado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            descricao: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: "status_chamado",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    stChamado.associate = function (models) {
        stChamado.hasMany(models.quChamado, {
            foreignKey: "id_stChamado",
            sourceKey: "id",
            as: "FilasChamados",
        });
    };

    return stChamado;
}
