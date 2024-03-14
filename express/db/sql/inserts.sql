INSERT INTO account_info (account_id, avatar_url, name, email, bio) VALUES ($1, $2, $3, $4, $5);

INSERT INTO account_credentials (account_id, password_hash) VALUES ($1, $2);

INSERT INTO account_session (account_id, token) VALUES ($1, $2);