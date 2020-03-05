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
    app: "./dist/src-esm/web",
    loaded: "./dist/src-esm",
    logger: "./dist/src-esm",
    patch: "./dist/src-esm",
    render: "./dist/src-esm",
    renderClient: "./dist/src-esm",
    router: "./dist/src-esm",
    tinyId: "./dist/src-esm",
  }

  components = {
    homeComponent: "./dist/src-esm/web",
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
