import render from "../../render"
import { RenderRequest } from "../../renderServer"

export class BootstrapComponent {
  browser: boolean = null
  render: typeof render = null

  async element(req: RenderRequest): Promise<Element> {
    window["bootstrap"] = {
      user: req.user,
    }

    return (
      <script>
        {`window.bootstrap = ${JSON.stringify(
          window["bootstrap"]
        )};`}
      </script>
    )
  }
}

export default new BootstrapComponent()
