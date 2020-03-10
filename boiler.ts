import { join } from "path"
import { ActionBoiler, PromptBoiler } from "boiler-dev"

export const install: ActionBoiler = async ({
  cwdPath,
}) => {
  const actions = []

  actions.push({
    action: "npmInstall",
    source: ["serverless-form-parser", "undom"],
  })

  actions.push({
    action: "npmInstall",
    dev: true,
    source: ["aws-lambda", "ts-node-dev"],
  })

  actions.push({
    action: "merge",
    path: join(cwdPath, "package.json"),
    source: {
      scripts: {
        start:
          "npx ts-node-dev --respawn --transpileOnly --notify false ./src/web/devServer",
      },
    },
  })

  return actions
}

export const prompt: PromptBoiler = async () => {
  return [
    {
      type: "input",
      name: "appDirName",
      message: "app directory name?",
      default: "web",
    },
  ]
}

export const generate: ActionBoiler = async ({
  answers,
  cwdPath,
  files,
}) => {
  const actions = []

  const { appDirName } = answers

  for (const file of files) {
    const { name, path, source } = file

    if (path.includes("/components/")) {
      actions.push({
        action: "write",
        path: join(
          cwdPath,
          `src/${appDirName}/components`,
          name
        ),
        source,
      })
    } else {
      actions.push({
        action: "write",
        path: join(cwdPath, `src/${appDirName}`, name),
        source,
      })
    }
  }

  return actions
}
