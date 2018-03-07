'use strict';

const path = require('path');

module.exports = app => {
  const { config } = app;

  if (config.env === 'local') {
    // apidoc -i app/controller -o app/public/apidoc
    const apiDocPath = path.join(__dirname, 'node_modules/.bin/apidoc');
    const apiSourcePath = path.join(app.baseDir, 'app/controller');
    const apiTargetPath = path.join(app.baseDir, 'app/public/apidoc');

    const inputs = [ apiSourcePath ];
    if (typeof config.input === 'string') {
      inputs.push(path);
    } else if (Array.isArray(config.input)) {
      config.input.forEach(path => {
        if (typeof path === 'string') {
          inputs.push(path);
        }
      });
    }

    const inputsStr = inputs.map(inputPath => {
      return ` -i "${inputPath}" `;
    });

    require('shelljs').exec(`${apiDocPath} ${inputsStr} -o ${apiTargetPath}`,
      { async: true, silent: true },
      (code, stdout, stderr) => {
        app.coreLogger.info(`local 环境 生成doc api ${stdout} stderr:${stderr}`);
      });
  }
};
