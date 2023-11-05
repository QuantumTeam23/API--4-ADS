CREATE DOMAIN DESC100 VARCHAR(100);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Parceiros (
	parceiro_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_razao_social DESC100 NULL,
	parceiro_nome_fantasia DESC100 NULL,
	parceiro_cnpj_cpf VARCHAR(18) NOT NULL,
	parceiro_logradouro DESC100 NULL,
	parceiro_logradouro_numero VARCHAR(10),
	parceiro_bairro DESC100 NULL,
    parceiro_cidade DESC100 NULL,
	parceiro_estado DESC100 NULL,
    parceiro_cep VARCHAR(10) NULL,
	parceiro_regiao DESC100 NULL,
	parceiro_telefone VARCHAR (20) NULL,
    parceiro_cidades_atende DESC100 NULL,
	parceiro_saldo   DEFAULT 0.00,
	parceiro_volume_coleta_mes DECIMAL(8,1) DEFAULT 0.0,
	parceiro_email DESC100 NULL,
	parceiro_senha DESC100 NULL,
    parceiro_tipo DESC100 NULL
);

CREATE TABLE Estabelecimentos(
	estabelecimento_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	estabelecimento_razao_social DESC100 NULL,
	estabelecimento_nome_fantasia DESC100 NULL,
	estabelecimento_cnpj_cpf VARCHAR(18) NOT NULL,
	estabelecimento_logradouro DESC100 NULL,
	estabelecimento_logradouro_numero VARCHAR(10),
	estabelecimento_bairro DESC100 NULL,
    estabelecimento_cidade DESC100 NULL,
	estabelecimento_estado DESC100 NULL,
    estabelecimento_cep VARCHAR(10) NULL,
	estabelecimento_regiao DESC100 NULL,
	estabelecimento_telefone VARCHAR (20) NULL,
	estabelecimento_saldo DECIMAL(8,2) DEFAULT 0.00,
	estabelecimento_volume_comercializado_mes DECIMAL(8,1) DEFAULT 0.0,
	estabelecimento_email DESC100 NULL,
	estabelecimento_senha DESC100 NULL,
    estabelecimento_tipo DESC100 NULL
);

CREATE TABLE Administradores(
	administrador_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	administrador_nome DESC100 NULL,
	administrador_email DESC100 NULL,
	administrador_senha DESC100 NULL,
	administrador_saldo DECIMAL(8,2) NULL
);

CREATE TABLE ParceiroCarteira (
	parceiro_carteira_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	id_parceiro UUID NOT NULL,
	id_estabelecimento UUID NOT NULL,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE AcaoTransacoes (
	acao_transacao_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	quantidade_oleo_coletado DESC100 NULL,
	quantidade_moedas DESC100 NULL,
	acao_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
	id_parceiro UUID NOT NULL,
	id_estabelecimento UUID NOT NULL,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE AcaoTransacaoCompra (
	acao_transacao_compra_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	valor_comprado DESC100 NULL,
	acao_compra_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
	id_parceiro UUID NOT NULL,
	aprovado BOOLEAN NULL,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id)
);

CREATE TABLE AcoesAdministrativas (
	acao_administrativa_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	acao_descricao DESC100 NULL,
	acao_tipo DESC100 NULL,
	id_administrador UUID NOT NULL,
	id_parceiro UUID NULL,
	id_estabelecimento UUID NULL,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE Preco (
	preco_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	preco_regiao DESC100 NULL,
	preco_oleo_virgem DESC100 NULL,
	preco_oleo_usado DESC100 NULL,
	id_administrador UUID NOT NULL,
	FOREIGN KEY (id_administrador) REFERENCES Administradores(administrador_id)
);
