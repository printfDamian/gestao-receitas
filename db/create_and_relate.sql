-- Criação da base de dados e das tabelas com as suas relações
DROP DATABASE IF EXISTS gestao_receitas;
CREATE DATABASE gestao_receitas;
 --CREATE DATABASE gestao_receitas; created for the creation from the mvc structure
use gestao_receitas;

CREATE TABLE utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    custo DECIMAL(10,2) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categorias_receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    autor INT NOT NULL DEFAULT 1,
    ingredientes INT NOT NULL,
    categoria INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    dificuldade ENUM('Fácil', 'Média', 'Difícil') NOT NULL,
    tempo TIME NOT NULL,
    custo DECIMAL(10,2) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (autor) REFERENCES utilizadores(id),
    FOREIGN KEY (ingredientes) REFERENCES ingredientes(id),
    FOREIGN KEY (categoria) REFERENCES categorias_receitas(id)
);
-- tabela pivot necessária porque muitos ingredientes podem estar associados a muitas receitas e vice-versa
CREATE TABLE ingredientes_receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ingrediente INT NOT NULL,
    id_receita INT NOT NULL,
    quantidade INT NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id),
    FOREIGN KEY (id_receita) REFERENCES receitas(id)
);
INSERT INTO utilizadores (nome,email) VALUES ('unknown_name', 'unknown_email');