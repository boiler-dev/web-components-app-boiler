import router from "../router"

export class App {
  router: typeof router = null

  loaded(): void {
    this.router.add({
      "": () => "homeComponent",
      "404": () => "notFoundComponent",
    })
  }
}

export default new App()
