DROP TABLE IF EXISTS funcionario_permissao;

DROP TABLE IF EXISTS endereco;

DROP TABLE IF EXISTS fila_chamados;

DROP TABLE IF EXISTS alinhamento_funcao;

DROP TABLE IF EXISTS chamados;

DROP TABLE IF EXISTS veiculo;

DROP TABLE IF EXISTS cliente;

DROP TABLE IF EXISTS funcionarios;

DROP TABLE IF EXISTS funcao;

DROP TABLE IF EXISTS tipo_veiculo;

DROP TABLE IF EXISTS tipo_chamado;

DROP TABLE IF EXISTS status_chamado;

DROP TABLE IF EXISTS permissao;

-- Tabela: funcao
CREATE TABLE
    funcao (
        id BIGINT NOT NULL PRIMARY KEY,
        nome VARCHAR(250) NOT NULL,
        descricao VARCHAR(500) NOT NULL
    );

-- Tabela: funcionarios
CREATE TABLE
    funcionarios (
        id BIGINT NOT NULL PRIMARY KEY,
        nome VARCHAR(250) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(500) NOT NULL,
        nascimento DATE NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        rg VARCHAR(9) NOT NULL
    );

-- Tabela: alinhamento_funcao
CREATE TABLE
    alinhamento_funcao (
        id BIGINT NOT NULL PRIMARY KEY,
        id_funcao BIGINT NOT NULL,
        id_funcionario BIGINT NOT NULL,
        FOREIGN KEY (id_funcao) REFERENCES funcao (id),
        FOREIGN KEY (id_funcionario) REFERENCES funcionarios (id) ON DELETE CASCADE
    );

-- Tabela: endereco
CREATE TABLE
    endereco (
        id BIGINT NOT NULL PRIMARY KEY,
        logradouro VARCHAR(250) NOT NULL,
        numero VARCHAR(10) NOT NULL,
        complemento VARCHAR(100),
        bairro VARCHAR(100) NOT NULL,
        cidade VARCHAR(100) NOT NULL,
        estado CHAR(2) NOT NULL,
        cep VARCHAR(8) NOT NULL,
        id_funcionario BIGINT NOT NULL,
        FOREIGN KEY (id_funcionario) REFERENCES funcionarios (id) ON DELETE CASCADE
    );

-- Tabela: permissao
CREATE TABLE
    permissao (
        id BIGINT NOT NULL PRIMARY KEY,
        descricao VARCHAR(500) NOT NULL
    );

-- Tabela: funcionario_permissao
CREATE TABLE
    funcionario_permissao (
        email VARCHAR NOT NULL,
        id_permissao BIGINT NOT NULL,
        PRIMARY KEY (email, id_permissao),
        CONSTRAINT fk_usuario_permissao_usuario FOREIGN KEY (email) REFERENCES funcionarios (email),
        CONSTRAINT fk_usuario_permissao_permissao FOREIGN KEY (id_permissao) REFERENCES permissao (id)
    );

-- Tabela: cliente
CREATE TABLE
    cliente (
        id BIGINT NOT NULL PRIMARY KEY,
        nome VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL,
        nascimento DATE NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        rg VARCHAR(9)
    );

-- Tabela: tipo_veiculo
CREATE TABLE
    tipo_veiculo (
        id BIGINT NOT NULL PRIMARY KEY,
        nome VARCHAR(250) NOT NULL
    );

-- Tabela: veiculo
CREATE TABLE
    veiculo (
        id BIGINT NOT NULL PRIMARY KEY,
        modelo VARCHAR(250) NOT NULL,
        placa VARCHAR(10) NOT NULL,
        marca VARCHAR(100) NOT NULL,
        id_cliente BIGINT NOT NULL,
        id_tpveiculo BIGINT NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON DELETE CASCADE,
        FOREIGN KEY (id_tpveiculo) REFERENCES tipo_veiculo (id)
    );

-- Tabela: tipo_chamado
CREATE TABLE
    tipo_chamado (
        id BIGINT NOT NULL PRIMARY KEY,
        descricao VARCHAR(250) NOT NULL
    );

-- Tabela: chamados
CREATE TABLE
    chamados (
        id BIGINT NOT NULL PRIMARY KEY,
        descricao VARCHAR(500) NOT NULL,
        img_veiculo BYTEA,
        id_cliente BIGINT NOT NULL,
        id_veiculo BIGINT NOT NULL,
        id_tpchamado BIGINT NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES cliente (id),
        FOREIGN KEY (id_veiculo) REFERENCES veiculo (id),
        FOREIGN KEY (id_tpchamado) REFERENCES tipo_chamado (id)
    );

-- Tabela: status_chamado
CREATE TABLE
    status_chamado (
        id BIGINT NOT NULL PRIMARY KEY,
        descricao VARCHAR(250) NOT NULL
    );

-- Tabela: fila_chamados
CREATE TABLE
    fila_chamados (
        id BIGINT NOT NULL PRIMARY KEY,
        id_funcionario BIGINT NOT NULL,
        id_chamado BIGINT NOT NULL,
        id_stchamado BIGINT NOT NULL,
        FOREIGN KEY (id_funcionario) REFERENCES funcionarios (id) ON DELETE CASCADE,
        FOREIGN KEY (id_chamado) REFERENCES chamados (id) ON DELETE CASCADE,
        FOREIGN KEY (id_stchamado) REFERENCES status_chamado (id) ON DELETE CASCADE
    );

-- Inserir Funções
INSERT INTO
    funcao (id, nome, descricao)
VALUES
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

-- Inserir Funcionários
INSERT INTO
    funcionarios (id, nome, email, senha, nascimento, cpf, rg)
VALUES
    (
        1,
        'Felipe Silva',
        'felipesilva@gmail.com',
        'admin@1234',
        '2005-04-23',
        '12345678901',
        '123456789'
    );

-- Inserir Endereço
INSERT INTO
    endereco (
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
VALUES
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

-- Inserir Alinhamento de Função
INSERT INTO
    alinhamento_funcao (id, id_funcao, id_funcionario)
VALUES
    (1, 1, 1);

-- Inserir Tipos de Chamado
INSERT INTO
    tipo_chamado (id, descricao)
VALUES
    (1, 'Manutenção Preventiva'),
    (2, 'Manutenção Corretiva'),
    (3, 'Reparação de Colisão'),
    (4, 'Serviço de Pintura'),
    (5, 'Troca de Óleo e Filtros'),
    (6, 'Alinhamento e Balanceamento'),
    (7, 'Serviço de Lavagem e Detalhamento'),
    (8, 'Troca e Reparação de Pneus');

-- Inserir Tipos de Veículo
INSERT INTO
    tipo_veiculo (id, nome)
VALUES
    (1, 'Carro'),
    (2, 'Moto'),
    (3, 'Carro esportivo'),
    (4, 'Caminhonete'),
    (5, 'Moto-aquática');

-- Inserir Status de Chamado
INSERT INTO
    status_chamado (id, descricao)
VALUES
    (1, 'Aberto'),
    (2, 'Em Andamento'),
    (3, 'Concluído'),
    (4, 'Cancelado'),
    (5, 'Aguardando Peças'),
    (6, 'Aguardando Aprovação do Cliente'),
    (7, 'Em Espera'),
    (8, 'Reaberto');

-- Inserir Permissões
INSERT INTO
    permissao (id, descricao)
VALUES
    (1, 'Gerencia'),
    (2, 'Atendente'),
    (3, 'Rh'),
    (4, 'Mecanico'),
    (5, 'Estagiário');

-- Inserir Associações de Permissão
INSERT INTO
    funcionario_permissao (email, id_permissao)
VALUES
    ('felipesilva@gmail.com', 1);
