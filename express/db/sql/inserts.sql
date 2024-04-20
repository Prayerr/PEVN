INSERT INTO account_info        (account_id, avatar_url, name, email, bio)          VALUES ($1, $2, $3, $4, $5);

INSERT INTO account_credentials (account_credentials_id, account_id, password_hash) VALUES ($1, $2, $3);

INSERT INTO account_session     (account_session_id, account_id, token)             VALUES ($1, $2, $3);