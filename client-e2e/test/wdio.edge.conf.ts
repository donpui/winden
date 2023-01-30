// config for Github workflow to run

import type { Options } from "@wdio/types";
import { execSync } from "child_process";
import * as fsExtra from "fs-extra";

global.downloadDirBrowser = "/home/seluser/downloads";
global.downloadDir = "/home/node/downloads";

export const config: Options.Testrunner = {
  hostname: "selenium-hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "test/tsconfig.json",
    },
  },
  specs: ["./test/specs/**/*.ts"],
  
  exclude: ["./test/specs/send-large-files.ts",
            ],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "MicrosoftEdge",
      "ms:edgeOptions": {
        prefs: {
          "download.default_directory": global.downloadDirBrowser,
          "download.directory_upgrade": true,
          "download.prompt_for_download": false,
          "savefile.default_directory": global.downloadDirBrowser,
        },
      },
    },
  ],
  logLevel: "error",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 60000,
  connectionRetryCount: 2,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
  onPrepare: function (_config, _capabilities) {
    execSync("./scripts/generate-CI-test-files.sh");
  },
  beforeTest: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
};
