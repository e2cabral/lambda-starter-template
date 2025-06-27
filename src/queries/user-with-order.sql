-- @name getUserWithOrder
-- @description Busca usuário com seus pedidos
-- @param userId: number
-- @returnType UserWithOrder
-- @returnSingle true
-- @return users.id to userId
-- @return users.name to username
-- @return users.email
-- @return orders.id to orderId
-- @return orders.created_at to orderDate
SELECT u.id         as user_id,
       u.name       as user_name,
       u.email,
       o.id         as order_id,
       o.created_at as order_date
FROM users u
         INNER JOIN orders o ON u.id = o.user_id
ORDER BY o.created_at DESC;