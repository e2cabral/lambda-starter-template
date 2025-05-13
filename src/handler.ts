import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {StorageService} from "./utils/services/storage.service";
import {LoggerService} from "./utils/services/logger.service";

export const execute = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  LoggerService.init()
  LoggerService.profile('execute')
  const storage = new StorageService()

  const list = await storage.listBuckets()
  LoggerService.info(`List of buckets: ${JSON.stringify(list)}`)

  LoggerService.profile('execute')
  return {
    statusCode: 200,
    body: JSON.stringify({event, list}),
  }
}