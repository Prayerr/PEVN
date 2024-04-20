-- TODO: Разобраться с ролями (нет таблицы даже) (сделать таблицу сообщества подписчики )
-- TODO: МБ поработать с обработкой фингерпринтов 
-- TODO: Так как через триггер удаляется запись с сессией спустя 30 дней, то нужно проработать логику входа в учётку спусти 30 дней (Репозиторий с его get в помощь)

CREATE TABLE account_info (
    PRIMARY KEY (account_id),
    account_id        UUID         NOT NULL,
    registration_date TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    name              VARCHAR(16)  UNIQUE NOT NULL,
    email             VARCHAR(64)  UNIQUE NOT NULL,  
    avatar_url        VARCHAR(255),
    bio               VARCHAR(255)
);

CREATE TABLE account_credentials (
    PRIMARY KEY (account_credentials_id),
    FOREIGN KEY (account_id) REFERENCES account_info(account_id) ON DELETE CASCADE,
    account_credentials_id UUID         NOT NULL,
    account_id             UUID         NOT NULL,
    password_hash          VARCHAR(255) NOT NULL
);

CREATE TABLE account_session (
    PRIMARY KEY (account_session_id), 
    FOREIGN KEY (account_id) REFERENCES account_info(account_id) ON DELETE CASCADE,
    account_session_id UUID         NOT NULL,
    account_id         UUID         NOT NULL,
    started_at         TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    ip_address         VARCHAR(45)  NOT NULL,
    refresh_token      VARCHAR(255) NOT NULL,
    device_type        VARCHAR(128)
);

CREATE TABLE post (
    PRIMARY KEY (post_id)
    FOREIGN KEY (account_id) REFERENCES account_info(account_id)
    post_id    UUID,
    account_id UUID          NOT NULL,
    title      VARCHAR(64)   NOT NULL,
    post_text  VARCHAR(2048) NOT NULL,
    created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    views      INT           DEFAULT 0 NOT NULL
);

CREATE TABLE comment (
    comment_id UUID PRIMARY KEY,
    account_id UUID NOT NULL,
    post_id UUID NOT NULL,
    parent_comment_id UUID,
    comment_text VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
    FOREIGN KEY (account_id) REFERENCES post(account_id)
    FOREIGN KEY (parent_comment_id) REFERENCES comment(parent_comment_id)
);
-- Индекс
CREATE INDEX idx_account_info_name ON account_info (name);