-- TODO: Разобраться с ролями (нет таблицы даже)

CREATE TABLE account_info (
    account_id UUID PRIMARY KEY,
    avatar_url VARCHAR(255),
    name VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    bio VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE account_credentials (
    account_credentials_id UUID PRIMARY KEY,
    account_id UUID,
    password_hash VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES account_info(account_id)
);

CREATE TABLE account_session (
    account_session_id UUID PRIMARY KEY,
    account_id UUID,
    token VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES account_info(account_id)
);