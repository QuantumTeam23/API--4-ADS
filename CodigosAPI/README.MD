## Para executar o projeto
1. Na pasta backend:
<h4> Instalar as pastas node_modules: </h4>

```console
    npm install
``` 
    
<h4> O banco de dados foi feito usando postgresql e foi colocado em um servidor (ElephantSQL), caso queira testar localmente, 
mudar as conexões no arquivo index nas linhas 46-50 conforme a configuração dos seu banco. Para utilizar o banco local, foi utilizado o PgAdmin4, onde a database é criado nele e após isso é colocado o script. O script do banco é o seguinte </h4>

```console
CREATE DOMAIN DESC100 VARCHAR(100);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Parceiros (
	parceiro_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	parceiro_razao_social DESC100 null,
	parceiro_nome_fantasia DESC100 null,
	parceiro_cnpj_cpf VARCHAR(18) NOT null,
	parceiro_logradouro DESC100 null,
	parceiro_logradouro_numero VARCHAR(10),
	parceiro_bairro DESC100 null,
    parceiro_cidade DESC100 null,
	parceiro_estado DESC100 null,
    parceiro_cep VARCHAR(10) null,
	parceiro_regiao DESC100 null,
	parceiro_telefone VARCHAR (20) null,
    parceiro_cidades_atende DESC100 null,
	parceiro_saldo DECIMAL(8,2) DEFAULT 0.00,
	parceiro_volume_coleta_mes DECIMAL(8,1) DEFAULT 0.0,
	parceiro_email DESC100 null,
	parceiro_senha DESC100 null,
    parceiro_tipo DESC100 null
);

CREATE TABLE Estabelecimentos(
	estabelecimento_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	estabelecimento_razao_social DESC100 null,
	estabelecimento_nome_fantasia DESC100 null,
	estabelecimento_cnpj_cpf VARCHAR(18) NOT null,
	estabelecimento_logradouro DESC100 null,
	estabelecimento_logradouro_numero VARCHAR(10),
	estabelecimento_bairro DESC100 null,
    estabelecimento_cidade DESC100 null,
	estabelecimento_estado DESC100 null,
    estabelecimento_cep VARCHAR(10) null,
	estabelecimento_regiao DESC100 null,
	estabelecimento_telefone VARCHAR (20) null,
	estabelecimento_saldo DECIMAL(8,2) DEFAULT 0.00,
	estabelecimento_volume_comercializado_mes DECIMAL(8,1) DEFAULT 0.0,
	estabelecimento_email DESC100 null,
	estabelecimento_senha DESC100 null,
    estabelecimento_tipo DESC100 null
);

CREATE TABLE Administradores(
	administrador_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	administrador_nome DESC100 null,
	administrador_email DESC100 null,
	administrador_senha DESC100 null,
	administrador_saldo DECIMAL(8,2) null
);

CREATE TABLE ParceiroCarteira (
	parceiro_carteira_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	parceiro_nome DESC100 null,
	estabelecimento_nome DESC100 null,
	id_parceiro UUID NOT null,
	id_estabelecimento UUID NOT null,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE AcaoColeta (
	acao_coleta_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	acao_descricao DESC100 null,
	quantidade_oleo_coletado DESC100 null,
	parceiro_nome DESC100 null,
	estabelecimento_nome DESC100 null,
	id_parceiro UUID NOT null,
	id_estabelecimento UUID NOT null,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE AcoesAdministrativas (
	acao_administrativa_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	administrador_nome DESC100 null,
	parceiro_nome DESC100 null,
	estabelecimento_nome DESC100 null,
	acao_descricao DESC100 null,
	acao_tipo DESC100 null,
	id_administrador UUID NOT null,
	id_parceiro UUID null,
	id_estabelecimento UUID null,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE Transacoes (
	transacao_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	estabelecimento_nome DESC100 null,
	parceiro_nome DESC100 null,
	administrador_nome DESC100 null,
	transacao_tipo DESC100 null,
	transacao_quantidade DESC100 null,
	transacao_descricao DESC100 null,
	id_administrador UUID null,
	id_parceiro UUID null,
	id_estabelecimento UUID null,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_estabelecimento) REFERENCES Estabelecimentos(estabelecimento_id)
);

CREATE TABLE Oleo (
	oleo_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	oleo_tipo DESC100 null,
	oleo_nome DESC100 null,
	oleo_preco DESC100 null
);

CREATE TABLE Creditos (
	credito_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT null,
	credito_valor VARCHAR(20) null
);
``` 

<h4> Para rodar o backend: </h4>

```console
    npm run dev
``` 

2. Na pasta frontend:
<h4> Instalar as pastas node_modules: </h4>

```console
    npm install
``` 
<h4> Para rodar o frontend: </h4>

```console
    npm start
``` 
