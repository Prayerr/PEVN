-- TODO: Разобраться с ролями (нет таблицы даже) (сделать таблицу сообщества подписчики )

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

CREATE TABLE post (
    post_id UUID PRIMARY KEY NOT NULL,
    account_id UUID NOT NULL,
    title VARCHAR(64) NOT NULL,
    post_text VARCHAR(2048) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP, -- Напишу потом триггер на автоматическое обновление
    views INT DEFAULT 0 NOT NULL;
    FOREIGN KEY (account_id) REFERENCES account_info(account_id)
)

CREATE TABLE comment (
    comment_id UUID PRIMARY KEY,
    creator_id UUID NOT NULL,
    post_id UUID NOT NULL,
    parent_comment_id UUID,
    comment_text VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
    FOREIGN KEY (creator_id) REFERENCES account_info(account_id)
    FOREIGN KEY (parent_comment_id) REFERENCES comment(parent_comment_id)
)

-- Индекс
CREATE INDEX idx_account_info_name ON account_info (name);