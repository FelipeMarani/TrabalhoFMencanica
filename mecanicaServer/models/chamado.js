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
        Chamado.belongsTo(models.Cliente, {
            foreignKey: "id_Cliente",
            targetKey: "id",
            as: "Cliente",
        });

        Chamado.belongsTo(models.Veiculo, {
            foreignKey: "id_Veiculo",
            targetKey: "id",
            as: "Veiculo",
        });

        Chamado.belongsTo(models.tpChamado, {
            foreignKey: "id_TPchamado",
            targetKey: "id",
            as: "TipoChamado",
        });

        Chamado.hasMany(models.quChamado, {
            foreignKey: "id_Chamado",
            sourceKey: "id",
            as: "FilasChamados",
        });
    };

    return Chamado;
}
