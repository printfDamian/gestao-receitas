DROP DATABASE IF EXISTS gestao_receitas;
CREATE DATABASE gestao_receitas;
 --CREATE DATABASE gestao_receitas; created for the creation from the mvc structure
use gestao_receitas;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);