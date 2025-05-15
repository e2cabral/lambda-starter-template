import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {StorageService} from "./utils/services/storage.service";
import {info, profile} from "./utils/services/logger.service";
import {validateAndConvert} from "./utils/converter.utils";
import {z} from "zod";

export const execute = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  profile('execute')
  const storage = new StorageService()

  const list = await storage.listBuckets()
  info(`List of buckets: ${JSON.stringify(list)}`)

  const data = validateAndConvert<{ test: string }>(event.queryStringParameters, z.object({
    test: z.string()
  }))

  profile('execute')
  return {
    statusCode: 200,
    body: JSON.stringify({data, list}),
  }
}