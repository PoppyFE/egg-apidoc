'use strict';

const path = require('path');

module.exports = app => {
  const { logger, config } = app;

  if (config.env === 'local') {
    logger.info('local 环境 开始生成doc api');

    // 只有开发环境使用
    // apidoc -i app/controller -o app/public/apidoc

    const apiDocPath = path.join(__dirname, 'node_modules/.bin/apidoc');
    const apiSourcePath = path.join(app.baseDir, 'app/controller');
    const apiTargetPath = path.join(app.baseDir, 'app/public/apidoc');

    require('shelljs').exec(`${apiDocPath} -i ${apiSourcePath} -o ${apiTargetPath}`,
      { async: true, silent: true },
      (code, stdout, stderr) => {
        logger.info(`local 环境 生成doc api ${stdout} stderr:${stderr}`);
      });
  }
};
