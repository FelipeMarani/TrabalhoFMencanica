"use strict"

module.exports = (sequelize, DataTypes) => {
    const tpChamado = sequelize.define(
        "tpChamado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            descricao: DataTypes.STRING,

        },
        {
            sequelize,
            tableName: "Tipo_Chamado",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    tpChamado.associate = function(models) {
        tpChamado.hasMany(models.Chamado, {
            foreignKey: "id_tpÇhamado",
            surceKey: "id",
        });
    };
}
