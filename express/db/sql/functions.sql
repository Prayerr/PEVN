CREATE OR REPLACE FUNCTION delete_old_session()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM account_session
    WHERE started_at < NOW() - INTERVAL '30d';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;