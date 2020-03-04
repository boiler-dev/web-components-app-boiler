import loaded from "../loaded"
import render from "../render"
import { RenderRequest } from "../renderServer"

export class HomeComponent {
  browser: boolean = null
  evalLoad: typeof loaded.evalLoad = null
  render: typeof render = null

  id = "home"

  async element(req: RenderRequest): Promise<Element> {
    return <div id={this.id} class="container"></div>
  }
}

export default new HomeComponent()
