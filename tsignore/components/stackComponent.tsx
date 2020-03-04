import render from "../../render"
import renderServer, {
  RenderRequest,
} from "../../renderServer"
import ssr from "../../ssr"

import app from "../app"

export class StackComponent {
  app: typeof app = null
  render: typeof render = null
  ssr: typeof ssr = null

  libs = {
    app: "./dist",
    fetch: "./dist",
    loaded: "./dist",
    logger: "./dist",
    patch: "./dist",
    render: "./dist",
    renderClient: "./dist",
    router: "./dist",
    tinyId: "./dist",
  }

  components = {
    homeComponent: "./dist",
  }

  models = {}

  async element({ path }: RenderRequest): Promise<Element> {
    const [components, libs, models] = await Promise.all([
      renderServer.assetsForClient(this.components),
      renderServer.assetsForClient(this.libs),
      renderServer.assetsForClient(this.models),
    ])

    return (
      <script type="module" crossorigin="use-credentials">
        {this.ssr.script(
          this.app.router.route(path),
          libs,
          components
        )}
        {`\nwindow.paths = ${JSON.stringify(
          Object.assign({}, components, models)
        )};`}
      </script>
    )
  }
}

export default new StackComponent()
