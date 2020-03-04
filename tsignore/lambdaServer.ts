import { join } from "path"
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda"
import parseForm from "../formParser"

import stack from "./stack"

export async function lambdaServer(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const root = join(__dirname, "../../")
  const parsedForm = await parseForm.fromApiGateway(event)

  const { renderServer } = await stack()
  const { code, body, type } = await renderServer.route(
    root,
    {
      headers: parseForm.cleanHeaders(event.headers),
      path: event.path,
      method: event.httpMethod,
      ...parsedForm,
    }
  )

  return {
    body,
    headers: {
      "content-type": type,
    },
    statusCode: code,
  }
}
