import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {StorageService} from "./adapters/storage.service";
import {info, profile} from "./adapters/logger.service";
import {validateAndConvert} from "./utils/converter.utils";
import {z} from "zod";
import middy from "@middy/core";
import httpErrorHandler from '@middy/http-error-handler';
import {setMetrics} from "./main/metrics.config";
import {queryExecutors} from "./queries/types/user-with-order";
import {Database} from "./main/database.config";


const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    profile('execute')
    const storage = new StorageService()

    const list = await storage.listBuckets()
    info(`List of buckets: ${JSON.stringify(list)}`)

    const data = validateAndConvert<{ test: string }>(event.queryStringParameters, z.object({
      test: z.string()
    }))

    const database = new Database()

    await database.getConnection(
      process.env.DB_HOST,
      process.env.DB_USER,
      process.env.DB_PASS,
      process.env.DB_NAME
    )

    const test = await queryExecutors
      .getUserWithOrder(
        database.connection,
        {userId: 1}
      )

    info(JSON.stringify(test))

    setMetrics('template', true)
    profile('execute')
    return {
      statusCode: 200,
      body: JSON.stringify(test),
    }
  } catch (err: any) {
    setMetrics('template', false)
    return {
      statusCode: 500,
      body: JSON.stringify({error: err.message}),
    }
  }
}

export const execute = middy(handler)
  .use(httpErrorHandler())