/**
 * Interface gerada para a tabela: users
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.271Z
 */
export interface User {
  created_at?: Date;
  email: string;
  id: number;
  name: string;
  password: string;
}

/**
 * Interface gerada para a tabela: orders
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.271Z
 */
export interface Order {
  created_at?: Date;
  id: number;
  total: any;
  user_id: number;
}

/**
 * Interfaces personalizadas
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.271Z
 */

export interface UserWithOrder {
  userId: number;
  username: string;
  email: string;
  orderId: number;
  orderDate: string;
}

import mysql from 'mysql2/promise';

/**
 * getUserWithOrder
 * Busca usuário com seus pedidos
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.271Z
 */

export interface UserWithOrder {
  userId: number;
  username: string;
  email: string;
  orderId: number;
  orderDate: string;
}
export interface GetUserWithOrderParams {
  userId: number;
}

export type GetUserWithOrderResult = UserWithOrder;

export const getUserWithOrderQuery = `SELECT u.id AS "userId", u.name AS "username", u.email AS "email", o.id AS "orderId", o.created_at AS "orderDate" FROM users u
         INNER JOIN orders o ON u.id = o.user_id
ORDER BY o.created_at DESC;`;

/**
 * Executa a consulta getUserWithOrder
 * @param params Parâmetros da consulta
 * @param db Conexão opcional com o banco de dados, se não fornecida será obtida automaticamente
 * @returns Resultado da consulta
 */
export async function getUserWithOrder(
  db: mysql.Connection,
  params: GetUserWithOrderParams
): Promise<GetUserWithOrderResult> {
  const rows = (await db.execute(getUserWithOrderQuery, Object.values(params)))[0];
  return rows as unknown as GetUserWithOrderResult;
}

/**
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.271Z
 */

export const queryExecutors = {
  getUserWithOrder,
};
