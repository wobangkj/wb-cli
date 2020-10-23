"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const generator = path.join(__dirname, "../generators/app");

const commonOutput = [
  `./config`,
  `./scripts`,
  `./src`,
  `./.cz-config.js`,
  `./.editorconfig`,
  `./.eslintignore`,
  `./.eslintrc.js`,
  `./.gitignore`,
  `./.npmrc`,
  `./.prettierignore`,
  `./.prettierrc.js`,
  `./.stylelintrc.js`,
  `./commitlint.config.js`,
  `./package.json`,
  `./README.md`
];

const commonPrompts = {
  title: "demo",
  git: "demo",
  origin: "https://www.demo.com"
};

describe("Generate an h5 template", () => {
  const h5Output = [`./mock/app.js`, `./tsconfig.json`, `./typings.d.ts`];

  beforeAll(() => {
    return helpers
      .run(generator)
      .withOptions({ "skip-install": true })
      .withPrompts(Object.assign(commonPrompts, { type: "h5" }));
  });

  it("Generate h5 basic file structure", () => {
    assert.file(commonOutput.concat(h5Output));
  });

  it("Generate h5 git file structure", () => {
    assert.file(`./.git`);
  });
});

describe("Generate an admin template", () => {
  const adminOutput = [
    `./mock`,
    `./public`,
    `./tests`,
    "./jest.config.js",
    "./jsconfig.json"
  ];

  beforeAll(() => {
    return helpers
      .run(generator)
      .withOptions({ "skip-install": true })
      .withPrompts(Object.assign(commonPrompts, { type: "admin" }));
  });

  it("Generate admin basic file structure", () => {
    assert.file(commonOutput.concat(adminOutput));
  });

  it("Generate admin git file structure", () => {
    assert.file(`./.git`);
  });
});

describe("Generate an pc template", () => {
  const pcOutput = [`./mock`, `./.umirc.js`, `./jsconfig.json`];

  beforeAll(() => {
    return helpers
      .run(generator)
      .withOptions({ "skip-install": true })
      .withPrompts(Object.assign(commonPrompts, { type: "pc" }));
  });

  it("Generate pc basic file structure", () => {
    assert.file(commonOutput.concat(pcOutput));
  });

  it("Generate pc git file structure", () => {
    assert.file(`./.git`);
  });
});

describe("Generate an xcx template", () => {
  const xcxOutput = [`./jsconfig.json`, `./project.config.json`];

  beforeAll(() => {
    return helpers
      .run(generator)
      .withOptions({ "skip-install": true })
      .withPrompts(Object.assign(commonPrompts, { type: "xcx" }));
  });

  it("Generate xcx basic file structure", () => {
    assert.file(commonOutput.concat(xcxOutput));
  });

  it("Generate xcx git file structure", () => {
    assert.file(`./.git`);
  });
});
