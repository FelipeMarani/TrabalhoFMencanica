"use strict";

module.exports = (sequelize, DataType) => {
    const Cliente = sequelize.define(
        "Cliente",
        {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
            },
            email: DataType.STRING,
            nome: DataType.STRING,
            nascimento: DataType.DATE,
            cpf: DataType.STRING,
            rg: DataType.STRING,
        },
        {
            sequelize,
            tableName: "Cliente",
            schema: "public",
            freezeTableName: true,
            timestamps: false,
        }
    );

    Cliente.associate = function (models) {
        Cliente.hasMany(models.Chamado, {
            foreignKey: "id_Cliente",
            sourceKey: "id",
            as: "Chamados",
        });

        Cliente.hasMany(models.Veiculo, {
            foreignKey: "id_cliente",
            sourceKey: "id",
            as: "Veiculos",
        });
    };

    return Cliente;
}
