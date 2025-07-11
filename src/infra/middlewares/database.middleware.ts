import {info} from "../../adapters/logger.service";
import {Database} from "../../main/database.config";

interface DatabaseMiddlewareOptions {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
}

const databaseMiddleware = (options: DatabaseMiddlewareOptions = {}) => {
  const database = new Database();
  
  return {
    before: async (request: any) => {
      try {
        const host = options.host || process.env.DB_HOST;
        const user = options.user || process.env.DB_USER;
        const password = options.password || process.env.DB_PASS;
        const dbName = options.database || process.env.DB_NAME;
        
        if (!host || !user || !password || !dbName) {
          throw new Error('Credenciais de banco de dados não configuradas');
        }
        
        await database.getConnection(host, user, password, dbName);
        info('Conexão com o banco de dados estabelecida');

        request.context.connection = database.connection;
      } catch (error: any) {
        info(`Erro ao conectar ao banco de dados: ${error.message}`);
        throw error;
      }
    },
    after: async (request: any) => {
    },
    onError: async (request: any) => {
      if (database.connection) {
        try {
          await database.closeConnection();
          info('Conexão com o banco de dados encerrada após erro');
        } catch (error) {
          info('Erro ao encerrar conexão com o banco de dados');
        }
      }
    }
  };
};

export default databaseMiddleware;