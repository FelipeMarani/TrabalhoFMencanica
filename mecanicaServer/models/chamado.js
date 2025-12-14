"use strict"

module.exports = (sequelize, DataTypes) => {
    const Chamado = sequelize.define(
        "Chamados",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            descricao: DataTypes.STRING,
            img_Veiculo: DataTypes.Bytea,
            id_Cliente: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_Veiculo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_TPchamado: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }
        },
        {
            sequelize,
            tableName: "Chamados",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        },
    );

    Chamado.associate = function (models) {
        Chamado.belongsTo(models.Chamado, {
            foreignKey: "id_Cliente",
            sourceKey: "id",
        });
    }
    Chamado.associate = function (models) {
        Chamado.belongsTo(models.Chamado, {
            foreignKey: "id_Veiculo",
            sourceKey: "id",
        });
    }
    Chamado.associate = function (models) {
        Chamado.belongsTo(models.Chamado, {
            foreignKey: "id_TPchamado",
            sourceKey: "id",
        });
    }

}
