Create table
    Funcao (
        id bigint not null,
        nome varchar(250) not null,
        descricao varchar(500) not null,
        primary key (id)
    );
Create table
    Funcionarios (
        id bigint not null,
        nome varchar(250) not null,
        email varchar(150) not null,
        senha varchar(500) not null,
        nascimento date not null,
        CPF varchar(11) not null,
        RG varchar(9),
        id_funcao bigint not null,
        primary key (id),
        foreign key (id_funcao) references Funcao (id)
    );
Create table
    Endereco (
        id bigint not null,
        logradouro varchar(250) not null,
        numero varchar(10) not null,
        complemento varchar(100),
        bairro varchar(100) not null,
        cidade varchar(100) not null,
        estado char(2) not null,
        cep varchar(8) not null,
        id_funcionario bigint not null,
        primary key (id),
        foreign key (id_funcionario) references Funcionarios (id)
    );
create table
    Cliente (
        id bigint not null,
        nome varchar(250) not null,
        email varchar(250) not null,
        nascimento date not null,
        cpf varchar(11) not null,
        rg varchar(9),
        primary key (id)
    );
create table
    Tipo_Veiculo (
        id bigint not null,
        nome varchar(250) not null,
        primary key (id)
    );
Create table
    Veiculo (
        id bigint not null,
        modelo varchar(250) not null,
        placa varchar(10) not null,
        marca varchar(100) not null,
        id_Cliente bigint not null,
        id_TpVeiculo bigint not null,
        primary key (id),
        foreign key (id_Cliente) references Cliente (id),
        foreign key (id_TpVeiculo) references Tipo_Veiculo (id)
    );
create table
    Tipo_Chamado (
        id bigint not null,
        descricao varchar(250) not null,
        primary key (id)
    );
Create table
    Chamados (
        id bigint not null,
        descricao varchar(500) not null,
        img_Veiculo Bytea,
        id_Cliente bigint not null,
        id_Veiculo bigint not null,
        id_TPchamado bigint not null,
        primary key (id),
        foreign key (id_Cliente) references Cliente (id),
        foreign key (id_Veiculo) references Veiculo (id),
        foreign key (id_TPchamado) references Tipo_Chamado (id)
    );
Create table
    Fila_Chamados (
        id bigint not null,
        id_funcionario bigint not null,
        id_Chamado bigint not null,
        primary key (id),
        foreign key (id_funcionario) references Funcionarios (id),
        foreign key (id_Chamado) references Chamados (id)
    );
Insert into
    Funcao (id, nome, descricao)
Values
    (1, 'Gerente', 'Gerencia de operações da empresa'),
    (
        2,
        'Atendentes',
        'Realiza os atendimentos aos clientes'
    ),
    (
        3,
        'Mecânico',
        'Realiza os serviços de reparação, manutenção, revisão e troca de peças dos veículos'
    ),
    (
        4,
        'Funileiro',
        'Realiza serviços de funilaria e pintura dos veículos'
    ),
    (
        5,
        'Lavador',
        'Realiza serviços de lavagem e limpeza dos veículos'
    ),
    (
        6,
        'Borracheiro',
        'Realiza serviços de troca, manutenção e balanceamento de pneus dos veículos'
    );

Insert into
    Funcionarios (
        id,
        nome,
        email,
        senha,
        nascimento,
        CPF,
        RG,
        id_funcao
    )
Values
    (
        1,
        'Felipe Silva',
        'felipesilva@gmail.com',
        'admin@1234',
        '2005-04-23',
        '12345678901',
        null,
        1
    );

Insert into
    Endereco (
        id,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        id_funcionario
    )
Values
    (
        1,
        'Rua B, Travessa da Avenida Chico Mendes',
        '47',
        'casa',
        'Parque Imperial',
        'Barueri',
        'SP',
        '06462350',
        1
    );

Insert into
    Tipo_Chamado (id, descricao)
Values
    (1, 'Manutenção Preventiva'),
    (2, 'Manutenção Corretiva'),
    (3, 'Reparação de Colisão'),
    (4, 'Serviço de Pintura'),
    (5, 'Troca de Óleo e Filtros'),
    (6, 'Alinhamento e Balanceamento'),
    (7, 'Serviço de Lavagem e Detalhamento'),
    (8, 'Troca e Reparação de Pneus');

Insert into Tipo_Veiculo(id, nome)
Values 
    (1, 'Carro'),
    (2, 'Moto'),
    (3, 'Carro esportivo'),
    (4, 'Caminhonete'),
    (5, 'Moto-aquática');
