import loaded from "../loaded"
import render from "../render"
import {
  RenderRequest,
  RenderResponse,
} from "../renderServer"

export class NotFoundComponent {
  browser: boolean = null
  evalLoad: typeof loaded.evalLoad = null
  render: typeof render = null

  id = "not-found"

  async element(
    req: RenderRequest,
    res: RenderResponse
  ): Promise<Element> {
    res.code = 404

    return (
      <div id={this.id} class="container">
        <section>
          <h2>404 Not Found</h2>
        </section>
      </div>
    )
  }
}

export default new NotFoundComponent()
