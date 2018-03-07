'use strict';

module.exports = app => {
  const { config } = app;

  if (config.env === 'local') {
    // apidoc -i app/controller -o app/public/apidoc

    require('shelljs').exec('npm run apidoc',
      { async: true, silent: true },
      (code, stdout, stderr) => {
        console.log(`local 环境 生成doc api ${stdout} stderr:${stderr}`);
      });
  }
};
