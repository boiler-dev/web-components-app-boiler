import undom from "undom"

import { Loaded } from "../loaded"
import { Logger } from "../logger"
import { Patch } from "../patch"
import { Render } from "../render"
import { RenderServer } from "../renderServer"
import { Router } from "../router"
import { Ssr } from "../ssr"
import { TinyId } from "../tinyId"

import { App } from "./app"
import { HeadComponent } from "./components/headComponent"
import { HomeComponent } from "./components/homeComponent"

export default ():
  | Record<string, any>
  | Promise<Record<string, any>> => {
  return new Loaded().load({
    // libs
    dom: undom(),
    logger: new Logger(),
    patch: new Patch(),
    render: new Render(),
    renderServer: new RenderServer(),
    router: new Router(),
    ssr: new Ssr(),
    tinyId: new TinyId(),
    // app
    app: new App(),
    // components
    headComponent: new HeadComponent(),
    homeComponent: new HomeComponent(),
  })
}
