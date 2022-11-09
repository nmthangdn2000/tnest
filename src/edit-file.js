export const mongooseModule = (name, contentFile) => {
  const regexImportOption = /imports(.*?)\],/g;
  const regexMongooseModuleOption = /MongooseModule.forFeature(.*?)\]\)/g;
  const regexSchema = new RegExp(`${name}Schema`, 'g');

  if (!regexMongooseModuleOption.test(contentFile)) {
    let txtImportOption = contentFile.match(regexImportOption)[0];
    if (txtImportOption) {
      const txtMongo = `MongooseModule.forFeature([{name:${name}.name,schema:${name}Schema}])`;
      const splitTxt = txtImportOption.split('],');
      const lastChar = splitTxt[0][splitTxt[0].length - 1] === ',' ? '' : ',';

      txtImportOption = splitTxt[0] + lastChar + txtMongo + '],';
      contentFile = contentFile.replace(regexImportOption, txtImportOption);
    }
  } else {
    let txtMongoModuleOption = contentFile.match(regexMongooseModuleOption)[0];
    if (txtMongoModuleOption && !regexSchema.test(txtMongoModuleOption)) {
      const txtSchema = `{name:${name}.name,schema:${name}Schema}`;
      const splitTxt = txtMongoModuleOption.split('])');
      const lastChar = splitTxt[0][splitTxt[0].length - 1] === ',' || splitTxt[0][splitTxt[0].length - 1] === '[' ? '' : ',';

      txtMongoModuleOption = splitTxt[0] + lastChar + txtSchema + '])';

      contentFile = contentFile.replace(regexMongooseModuleOption, txtMongoModuleOption);
    }
  }

  return contentFile;
};
export const controllerModule = (name, contentFile) => {
  const regexControllerOption = /controllers(.*?)\]/g;
  const regexController = new RegExp(`${name}Controller`, 'g');

  if (regexControllerOption.test(contentFile)) {
    let txtControllerOption = contentFile.match(regexControllerOption)[0];
    if (txtControllerOption && !regexController.test(txtControllerOption)) {
      const txtController = `${name}Controller`;
      const splitTxt = txtControllerOption.split(']');
      const lastChar = splitTxt[0][splitTxt[0].length - 1] === ',' || splitTxt[0][splitTxt[0].length - 1] === '[' ? '' : ',';

      txtControllerOption = splitTxt[0] + lastChar + txtController + ']';

      contentFile = contentFile.replace(regexControllerOption, txtControllerOption);
    }
  }

  return contentFile;
};
export const providerModule = (name, contentFile) => {
  const regexService = new RegExp(`${name}Service`, 'g');
  const regexProviderOption = /providers(.*?)\]/g;

  if (regexProviderOption.test(contentFile)) {
    let txtProviderOption = contentFile.match(regexProviderOption)[0];

    if (txtProviderOption && !regexService.test(txtProviderOption)) {
      const txtController = `${name}Service`;
      const splitTxt = txtProviderOption.split(']');
      const lastChar = splitTxt[0][splitTxt[0].length - 1] === ',' || splitTxt[0][splitTxt[0].length - 1] === '[' ? '' : ',';

      txtProviderOption = splitTxt[0] + lastChar + txtController + ']';

      contentFile = contentFile.replace(regexProviderOption, txtProviderOption);
    }
  }

  return contentFile;
};

export const importLib = (name, contentFile, pathImport) => {
  const regexModuleTag = /\@Module\(\{/g;
  const regexControllerImport = new RegExp(`import{${name}Controller`, 'g');
  const regexServiceImport = new RegExp(`import{${name}Service`, 'g');
  const regexSchemaImport = new RegExp(`import{${name},${name}Schema`, 'g');
  if (regexModuleTag.test(contentFile)) {
    let txtImport = '';
    if (!regexControllerImport.test(contentFile)) {
      txtImport = txtImport + `import{${name}Controller}from'${pathImport.controller.replace(/.ts/g, '')}';`;
    }
    if (!regexServiceImport.test(contentFile)) {
      txtImport = txtImport + `import{${name}Service}from'${pathImport.service.replace(/.ts/g, '')}';`;
    }
    if (!regexSchemaImport.test(contentFile)) {
      txtImport = txtImport + `import{${name},${name}Schema}from'${pathImport.schema.replace(/.ts/g, '')}';`;
    }
    contentFile = contentFile.replace(regexModuleTag, txtImport + '\r\n@Module({');
  }

  return contentFile;
};

export const exportClass = (contentFile) => {
  const regexExportClass = /exportclass/g;
  if (regexExportClass.test(contentFile)) {
    const txtExportClass = contentFile.match(regexExportClass)[0];
    if (txtExportClass) {
      contentFile = contentFile.replace(regexExportClass, 'export class ');
    }
  }

  return contentFile;
};

export const importModule = (name, contentFile, path) => {
  const regexModuleTag = /\@Module\(\{/g;
  const regexImportOption = /imports(.*?)controllers/g;
  const regexModuleImport = new RegExp(`import{${name}Module`, 'g');
  const regexModule = new RegExp(`${name}Module`, 'g');

  const txtModuleOption = contentFile.match(regexImportOption)[0];
  if (txtModuleOption && !regexModule.test(contentFile)) {
    const txtModule = `${name}Module`;
    const splitTxt = txtModuleOption.split('],controllers');
    const lastChar = splitTxt[0][splitTxt[0].length - 1] === ',' || splitTxt[0][splitTxt[0].length - 1] === '[' ? '' : ',';

    contentFile = contentFile.replace(regexImportOption, splitTxt[0] + lastChar + txtModule + '],controllers');
  }

  if (regexModuleTag.test(contentFile)) {
    let txtImport = '';
    if (!regexModuleImport.test(contentFile)) {
      txtImport = txtImport + `import{${name}Module}from'${path}';`;
    }
    contentFile = contentFile.replace(regexModuleTag, txtImport + '\r\n@Module({');
  }

  return contentFile;
};
