/**
 * Interface gerada para a tabela: users
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.126Z
 */
export interface User {
  created_at?: Date;
  email: string;
  id: number;
  name: string;
  password: string;
}

/**
 * Interfaces personalizadas
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.126Z
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

import mysql from 'mysql2/promise';

/**
 * getUser
 * Busca usuário com seus pedidos
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.126Z
 */

export interface User {
  id: number;
  name: string;
  email: string;
}
export interface GetUserParams {
  userId: number;
}

export type GetUserResult = User;

export const getUserQuery = `SELECT users.id AS "id", users.name AS "name", users.email AS "email" from users where id = ?;`;

/**
 * Executa a consulta getUser
 * @param params Parâmetros da consulta
 * @param db Conexão opcional com o banco de dados, se não fornecida será obtida automaticamente
 * @returns Resultado da consulta
 */
export async function getUser(db: mysql.Connection, params: GetUserParams): Promise<GetUserResult> {
  const rows = (await db.execute(getUserQuery, Object.values(params)))[0];
  return rows as unknown as GetUserResult;
}

/**
 * @generated Este arquivo foi gerado automaticamente - NÃO EDITAR
 * @timestamp 2025-06-27T17:53:56.126Z
 */

export const queryExecutors = {
  getUser,
};
