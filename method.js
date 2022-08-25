import fs from 'fs';
import { contentController, contentSchema, contentService } from './content.js';
import readline from 'readline';

export const main = async (name, path, options) => {
  const nameFile = name.toLowerCase();
  path = path || '';
  const pathFolder = path?.substring(0, 4) === 'src/' ? path.slice(4) : path;
  const rootFolder = options?.genera ? `src${pathFolder && '/' + pathFolder}/${nameFile}` : `src/${pathFolder}`;
  const files = await createFile(nameFile, rootFolder, options?.genera);
  const pathFiles = { controller: files[0].path, service: files[1].path, schema: files[2].path };
  const data = await findFile(rootFolder);
  editFile(data.path, capitalizeFirstLetter(name), pathFiles);
};

export const createFile = (name, rootFolder, genera = false) => {
  const pathSchema = `${rootFolder}${genera ? '' : '/schemas'}/${name}.schema.ts`;
  const pathController = `${rootFolder}${genera ? '' : '/controllers'}/${name}.controller.ts`;
  const pathService = `${rootFolder}${genera ? '' : '/services'}/${name}.service.ts`;

  const files = [
    { path: pathController, content: contentController(name, pathService) },
    { path: pathService, content: contentService(name, pathSchema) },
    { path: pathSchema, content: contentSchema(name) },
  ];

  return new Promise((resolve, reject) => {
    files.forEach((file, index) => {
      const { path, content } = file;
      const folders = path.split('/');
      folders.pop();
      const pathDir = folders.join('/');
      if (!fs.existsSync(pathDir)) fs.mkdirSync(pathDir, { recursive: true });

      fs.writeFile(path, content, (err) => {
        if (err) {
          reject(err);
          return console.log(err);
        }
        console.log(path + 'File is created successfully.');
        setTimeout(() => {
          if (index === files.length - 1) {
            console.log('Done');
            resolve(files);
          }
        }, 0);
      });
    });
  });
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const findFile = (path) => {
  const regex = /module.ts/g;
  let txtPath = '';
  const listDir = [];
  path.split('/').forEach((e) => {
    if (!e) return;
    if (!txtPath) txtPath = txtPath + e;
    else txtPath = txtPath + '/' + e;
    listDir.push(txtPath);
  });

  return new Promise((resolve, reject) => {
    listDir.reverse().some((dir) => {
      try {
        const files = fs.readdirSync(dir);
        const filename = files.find((f) => regex.test(f));
        if (filename) {
          resolve({ filename, path: dir + '/' + filename });
          return true;
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const editFile = async (path, name, pathImport) => {
  const regexController = new RegExp(`${name}Controller`, 'g');
  const regexService = new RegExp(`${name}Service`, 'g');
  const regexSchema = new RegExp(`${name}Schema`, 'g');

  const lineReader = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  const listLine = [];
  for await (const line of lineReader) {
    listLine.push(line);
  }

  let isImportController = false;
  let isImportSerivice = false;
  let isImportSchema = false;
  let isController = false;
  let isSchema = false;
  let isService = false;
  let isTagMongooseModule = false;
  let isTagController = false;
  let isTagService = false;

  const newListLine = listLine.map((l, index) => {
    const regexImport = /import/g;
    const regexMongoModule = /MongooseModule.forFeature/g;
    const regexControllerModule = /controllers/g;
    const regexProvidersModule = /providers:/g;
    const regexEnd = /\]\)/g;
    const regexNameKey = /name:/g;
    const regexSchemaKey = /schema:/g;

    const checkImport = regexImport.test(l);
    const checkController = regexController.test(l);
    const checkControllerModule = regexControllerModule.test(l);

    const checkSerivice = regexService.test(l);
    const checkProvidersModule = regexProvidersModule.test(l);

    const checkMongo = regexMongoModule.test(l);
    const checkNameKey = regexNameKey.test(l);
    const checkSchemaKey = regexSchemaKey.test(l);
    const checkSchema = regexSchema.test(l);
    const checkEndMongo = regexEnd.test(l);

    if (checkImport && checkController) isImportController = true;
    if (checkImport && checkSerivice) isImportSerivice = true;

    if (checkControllerModule) isTagController = true;
    if (isTagController && checkController) isController = true;

    if (checkProvidersModule) isTagService = true;
    if (isTagService && checkSerivice) isService = true;

    if (checkImport && checkSchema) isImportSchema = true;
    if (checkMongo) isTagMongooseModule = true;
    if (checkNameKey && checkSchemaKey && checkSchema) isSchema = true;

    if (checkImport && !listLine[index + 1]) {
      if (!isImportController) {
        l = l + '\n' + `import { ${name}Controller } from '${pathImport.controller.replace(/.ts/g, '')}';`;
      }
      if (!isImportSerivice) {
        l = l + '\n' + `import { ${name}Service } from '${pathImport.service.replace(/.ts/g, '')}';`;
      }
      if (!isImportSchema) {
        l = l + '\n' + `import { ${name}, ${name}Schema } from '${pathImport.schema.replace(/.ts/g, '')}';`;
      }
      return l;
    }

    if (checkMongo && checkNameKey && checkSchemaKey) {
      const splitString = l.split('])');
      const lastString = splitString[0].trim()[splitString[0].trim().length - 1] === ',' ? '' : ',';
      return splitString[0] + lastString + `{ name: ${name}.name, schema: ${name}Schema }])` + splitString[1] || '';
    } else if (!isSchema && isTagMongooseModule && checkEndMongo) {
      return `      { name: ${name}.name, schema: ${name}Schema }, \n  ]),`;
    }

    if (isTagController && !isController) {
      if (!checkControllerModule && /\],/g.test(l)) {
        isTagController = false;
        return `    ${name}Controller, \n  ],`;
      } else if (regexProvidersModule.test(listLine[index + 1])) {
        const splitString = l.split('],');
        isTagController = false;
        return splitString[0] + getLastString(splitString[0]) + ` ${name}Controller],`;
      }
    }

    if (isTagService && !isService) {
      if (!checkProvidersModule && /\],/g.test(l)) {
        isTagService = false;
        return `    ${name}Service, \n  ],`;
      } else if (/\}\)/g.test(listLine[index + 1])) {
        const splitString = l.split('],');
        isTagService = false;
        return splitString[0] + getLastString(splitString[0]) + ` ${name}Service],`;
      }
    }

    return l;
  });

  console.log(path);
  fs.writeFile(path, newListLine.join('\n'), (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Write success');
  });
};

// (async () => {
//   const data = await findFile('src/apis/controllers');
//   console.log(data);
//   editFile(data.path, 'MAAAAAAAAAAAAA', { controller: 'controller', service: 'service', schema: 'schema' });
// })();

function getLastString(splitString) {
  return splitString.trim()[splitString.trim().length - 1] === ',' ? '' : ',';
}
