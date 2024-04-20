CREATE TRIGGER delete_old_session_trigger
AFTER INSERT ON account_session
FOR EACH ROW EXECUTE FUNCTION delete_old_session();