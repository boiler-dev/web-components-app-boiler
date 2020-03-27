import { ActionBoiler, PromptBoiler } from "boiler-dev"

export const prompt: PromptBoiler = async () => {
  return [
    {
      type: "input",
      name: "appDirName",
      message: "app directory name?",
      default: "web",
    },
    {
      type: "confirm",
      name: "deployWithServerless",
      message: "deploy with serverless?",
      default: true,
    },
  ]
}

export const install: ActionBoiler = async ({
  answers,
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

  if (answers.deployWithServerless) {
    actions.push({
      action: "generate",
      source: [
        "git@github.com:boiler-dev/deploy-boiler.git",
        "git@github.com:boiler-dev/web-components-serverless-boiler.git",
      ],
    })
  }

  return actions
}

export const generate: ActionBoiler = async ({
  answers,
  files,
}) => {
  const actions = []
  const { appDirName } = answers

  actions.push({
    action: "merge",
    path: "package.json",
    source: {
      scripts: {
        start:
          "npx ts-node-dev --respawn --transpileOnly --notify false ./src/web/devServer",
      },
    },
  })

  for (const file of files) {
    const { name, sourcePath } = file

    if (sourcePath.includes("/components/")) {
      actions.push({
        action: "write",
        path: `src/${appDirName}/components/${name}`,
        sourcePath,
      })
    } else {
      actions.push({
        action: "write",
        path: `src/${appDirName}/${name}`,
        sourcePath,
      })
    }
  }

  return actions
}
