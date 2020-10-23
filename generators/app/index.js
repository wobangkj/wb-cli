"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(this.options.appname);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`欢迎使用 ${chalk.red("generator-wb-cli")} generator!，本项目已自动
      根据项目类型添加相应项目
      名后缀，可不比添加诸如
    name-xcx，name-h5之
    类项目名`)
    );

    const prompts = [
      {
        type: "list",
        name: "type",
        message: "请选择您的项目类型?",
        choices: [
          {
            name: "移动端",
            value: "h5"
          },
          {
            name: "pc端",
            value: "pc"
          },
          {
            name: "后台或者中台",
            value: "admin"
          },
          {
            name: "小程序",
            value: "xcx"
          }
        ]
      },
      {
        name: "title",
        message: "请输入项目名称",
        default: path.basename(process.cwd())
      },
      {
        type: "confirm",
        name: "git",
        message: "是否初始化git仓库?",
        default: true
      }
    ];

    return this.prompt(prompts).then(async props => {
      // To access props later use this.props.someAnswer;
      let answers = {};
      if (props.git) {
        answers = await this.prompt([
          {
            message: "请输入git仓库地址?",
            name: "origin",
            validate: (value = "") =>
              // eslint-disable-next-line no-useless-escape
              /((git@|http(s)?:\/\/)([\w\.@]+)(\/|:))([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})/.test(
                value
              ) || "请输入正确的仓库地址"
          }
        ]);
      }

      this.answers = {
        ...props,
        ...answers
      };
      this.log(this.answers);
    });
  }

  writing() {
    const fileList = {
      h5: "m-template/",
      pc: "pc-template/",
      admin: "antd-template/",
      xcx: "taro-template/"
    };

    this.fs.copy(
      this.templatePath(`${fileList[this.answers.type]}**`),
      this.destinationPath(),
      { globOptions: { dot: true }, title: this.answers.title }
    );

    if (this.answers.type === "admin") {
      this.fs.copyTpl(
        this.templatePath(
          `${fileList[this.answers.type]}src/pages/document.ejs`
        ),
        this.destinationPath("./src/pages/document.ejs"),
        { title: this.answers.title }
      );
      this.fs.copyTpl(
        this.templatePath(`${fileList[this.answers.type]}src/manifest.json`),
        this.destinationPath("./src/manifest.json"),
        { title: this.answers.title }
      );
      this.fs.copyTpl(
        this.templatePath(
          `${fileList[this.answers.type]}config/defaultSettings.js`
        ),
        this.destinationPath("./config/defaultSettings.js"),
        { title: this.answers.title }
      );
    } else if (this.answers.type === "pc") {
      this.fs.copyTpl(
        this.templatePath(`${fileList[this.answers.type]}.umirc.js`),
        this.destinationPath("./.umirc.js"),
        { title: this.answers.title }
      );
    } else if (this.answers.type === "xcx") {
      this.fs.copyTpl(
        this.templatePath(`${fileList[this.answers.type]}project.config.json`),
        this.destinationPath("./project.config.json"),
        { title: this.answers.title }
      );
      this.fs.copyTpl(
        this.templatePath(`${fileList[this.answers.type]}config/index.js`),
        this.destinationPath("./config/index.js"),
        { title: this.answers.title }
      );
    }

    this.fs.copyTpl(
      this.templatePath(`${fileList[this.answers.type]}package.json`),
      this.destinationPath("./package.json"),
      { title: this.answers.title }
    );
  }

  install() {
    if (this.answers.git) {
      this.spawnCommandSync("git", ["init"]);
      this.spawnCommandSync("git", ["add", "./"]);
      this.spawnCommandSync("git", ["commit", "-m", "'feat: init project'"]);
      this.spawnCommandSync("git", [
        "remote",
        "add",
        "origin",
        this.answers.origin
      ]);
    }

    // This.spawnCommandSync("cnpm", ["i"]);
  }
};
