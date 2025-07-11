import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {StorageService} from "./adapters/storage.service";
import {info, profile} from "./adapters/logger.service";
import {validateAndConvert} from "./utils/converter.utils";
import {z} from "zod";
import middy from "@middy/core";
import httpErrorHandler from '@middy/http-error-handler';
import {setMetrics} from "./main/metrics.config";
import {queryExecutors} from "./queries/types/user-with-order";
import databaseMiddleware from "./infra/middlewares/database.middleware";


const handler = async (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> => {
  try {
    profile('execute')
    const storage = new StorageService()

    const list = await storage.listBuckets()
    info(`List of buckets: ${JSON.stringify(list)}`)

    const data = validateAndConvert<{ test: string }>(event.queryStringParameters, z.object({
      test: z.string()
    }))

    const test = await queryExecutors
      .getUserWithOrder(
        context.connection,
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
  //.use(jsonBodyParser()) // POST REQUESTS
  .use(httpErrorHandler())
  .use(databaseMiddleware())