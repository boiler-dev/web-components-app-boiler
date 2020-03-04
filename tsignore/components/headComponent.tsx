import render from "../../render"
import { RenderRequest } from "../../renderServer"

import stackComponent from "./stackComponent"
import bootstrapComponent from "./bootstrapComponent"

export class HeadComponent {
  browser: boolean = null
  bootstrapComponent: typeof bootstrapComponent = null
  stackComponent: typeof stackComponent = null
  render: typeof render = null

  async element(req: RenderRequest): Promise<Element> {
    return (
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <link rel="icon" href="data:," />
        {await this.bootstrapComponent.element(req)}
        {await this.stackComponent.element(req)}
      </head>
    )
  }
}

export default new HeadComponent()
