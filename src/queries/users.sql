-- @name getUser
-- @description Busca usuário com seus pedidos
-- @param userId: number
-- @returnType User
-- @returnSingle true
-- @return users.id
-- @return users.name
-- @return users.email
select id, name, email from users where id = ?;