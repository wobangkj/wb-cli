const program = require('commander');
const path = require('path');
const os = require('os');
const node_ssh = require('node-ssh');
program.option('-p, --pwd').parse(process.argv);
const ssh = new node_ssh();

const host = '121.41.92.23'; //主机名
const password = '***'; //密码
const username = 'root'; //主机账户
const dir = program.d ? '' : '/assets'; //项目资源

/**
 *
 * 使用流程，首先设置主机地址，以及密码，主机账户默认为root，
 * 首次使用=>然后运行npm run assets:pwd 默认会将本机的公钥上传到服务器
 * ❗️❗️❗️为了服务器安全，建议只运行一次本命令，然后将密码password设置为空
 *
 * 二次使用=>请直接运行npm run assets 使用秘钥登录
 *
 */

let connect;
if (program.pwd) {
  //密码登录
  connect = ssh.connect({
    host,
    username,
    port: 22,
    password,
  });
} else {
  //秘钥登录
  connect = ssh.connect({
    host,
    username,
    privateKey: os.userInfo().homedir + '/.ssh/id_rsa',
  });
}
connect.then(
  function() {
    if (program.pwd) {
      // 通过密码登录默认上传本地公钥到新服务器
      ssh
        .putFile(
          os.userInfo().homedir + '/.ssh/id_rsa.pub',
          '/root/.ssh/id_rsa.pub',
        )
        .then(
          function() {
            console.log('\n\x1B[32m', '上传秘钥/root/.ssh/成功');
          },
          function(error) {
            console.log(
              '\n\x1B[31m%s\x1B[0m',
              '上传秘钥/root/.ssh/',
              error,
              os.userInfo().homedir + '/.ssh/id_rsa',
            );
          },
        )
        .then(() => {
          //追加id_rsa.pub公钥到authorized_keys
          ssh
            .exec('cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys')
            .then(
              function() {
                console.log('\x1B[32m', 'authorized_keys配置完成');
                console.log('\n');
              },
              error => {
                console.log(
                  '\x1B[31m%s\x1B[0m',
                  'authorized_keys配置失败',
                  error,
                );
                console.log('\n');
              },
            )
            .then(() => {
              //删除id_rsa.pub
              ssh.exec('rm /root/.ssh/id_rsa.pub');
            });
        });
    } else {
      // 上传资源文件
      const failed = [];
      const successful = [];
      ssh
        .putDirectory('./src/assets/', '/usr/share/nginx/reception/' + dir, {
          recursive: true,
          concurrency: 10,
          validate: function(itemPath) {
            const baseName = path.basename(itemPath);
            return (
              baseName.substr(0, 1) !== '.' && baseName !== 'node_modules' // do not allow dot files
            ); // do not allow node_modules
          },
          tick: function(localPath, remotePath, error) {
            if (error) {
              failed.push(localPath);
            } else {
              successful.push(localPath);
            }
          },
        })
        .then(function(status) {
          console.log(
            status ? '\x1B[32m' : '\x1B[31m%s\x1B[0m',
            '文件上传',
            status ? '成功!' : '失败!',
          );
          if (status) {
            successful.forEach(item => {
              console.log('\x1B[32m', item);
            });
          } else {
            failed.forEach(item => {
              console.log('\n\x1B[31m%s\x1B[0m', item);
            });
          }
          ssh.dispose();
        });
    }
  },
  function(error) {
    if (program.pwd) {
      console.error(
        '\x1B[31m%s\x1B[0m',
        '密码或账户错误,账户名：' + username + '，密码:' + password,
      );
    } else {
      console.error('\x1B[31m%s\x1B[0m', error);
    }
  },
);
