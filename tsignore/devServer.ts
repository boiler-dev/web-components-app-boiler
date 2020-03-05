import http from "http"
import { join } from "path"

import parseForm from "../formParser"
import stack from "./stack"

const port = 4000

http
  .createServer(async (req, res) => {
    const root = join(
      __dirname,
      __dirname.includes("/dist/") ? "../../../" : "../../"
    )

    const { renderServer } = await stack()
    const parsedForm = await parseForm.fromHttpRequest(req)

    const { body, code, type } = await renderServer.route(
      root,
      {
        headers: parseForm.cleanHeaders(req.headers),
        path: req.url,
        method: req.method,
        ...parsedForm,
      }
    )

    res.setHeader("content-type", type)
    res.statusCode = code
    res.end(body)
  })
  .listen(port, () =>
    // eslint-disable-next-line
    console.log(
      `🚀 Server ready at http://localhost:${port}`
    )
  )
