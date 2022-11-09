import fs from 'fs';
import chalk from 'chalk';
import { contentController, contentDto, contentFilterDto, contentModule, contentSchema, contentService } from './process-content.js';
import readline from 'readline';
import prettier from 'prettier';
import { controllerModule, exportClass, importLib, importModule, mongooseModule, providerModule } from './edit-file.js';

export const main = async (name, path, options) => {
  const nameFile = name.toLowerCase();
  path = path || '';
  const genera = options?.genera || false;
  const overwrite = options?.overwrite || false;

  const pathFolder = path?.substring(0, 4) === 'src/' ? path.slice(4) : path;
  const rootFolder = genera ? `src${pathFolder && '/' + pathFolder}/${nameFile}` : `src/${pathFolder}`;
  const files = await createFile(nameFile, rootFolder, genera, overwrite);
  const pathFiles = { controller: files[0].path, service: files[1].path, schema: files[2].path };
  const data = await findFile(rootFolder);
  if (data.filename) {
    editFile(data.path, capitalizeFirstLetter(name), pathFiles);
  } else {
    const pathFindModule = `src/${pathFolder}`;
    await createFileModule(nameFile, rootFolder, pathFiles);
    const file = await findFile(pathFindModule);
    if (file.filename) {
      editFileModule(file.path, capitalizeFirstLetter(nameFile), `${rootFolder}/${nameFile}.module`);
    }
  }
};

const createFile = async (name, rootFolder, genera = false, overwrite) => {
  const pathSchema = `${rootFolder}${genera ? '' : '/schemas'}/${name}.schema.ts`;
  const pathController = `${rootFolder}${genera ? '' : '/controllers'}/${name}.controller.ts`;
  const pathService = `${rootFolder}${genera ? '' : '/services'}/${name}.service.ts`;
  const pathDto = `${rootFolder}/dtos/${name}.dto.ts`;
  const pathFilterDto = `${rootFolder}/dtos/${name}-filter.dto.ts`;

  const files = [
    { path: pathController, content: await contentController(name, pathService, pathDto, pathFilterDto) },
    { path: pathService, content: await contentService(name, pathSchema, pathDto, pathFilterDto) },
    { path: pathSchema, content: await contentSchema(name) },
    { path: pathDto, content: await contentDto(name) },
    { path: pathFilterDto, content: await contentFilterDto(name) },
  ];

  return new Promise((resolve, reject) => {
    files.forEach((file, index) => {
      const { path, content } = file;
      const folders = path.split('/');
      folders.pop();
      const pathDir = folders.join('/');
      if (!overwrite && fs.existsSync(path)) return resolve(files);
      if (!fs.existsSync(pathDir)) fs.mkdirSync(pathDir, { recursive: true });

      fs.writeFile(path, content, (err) => {
        if (err) {
          reject(err);
          return console.log(err);
        }
        console.log(chalk.green('CREATE') + ' ' + path);

        setTimeout(() => {
          if (index === files.length - 1) {
            resolve(files);
          }
        }, 0);
      });
    });
  });
};

const createFileModule = async (name, rootFolder, pathFiles) => {
  const pathModule = `${rootFolder}/${name}.module.ts`;
  const content = await contentModule(name, pathFiles);
  fs.writeFile(pathModule, content, (err) => {
    if (err) {
      reject(err);
      return console.log(err);
    }
    console.log(chalk.green('CREATE') + ' ' + pathModule);
  });
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const findFile = (path, genera) => {
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
        resolve({ filename, path: dir + '/' + filename });
        return true;
      } catch (error) {
        reject(error);
      }
    });
  });
};

const editFile = async (path, name, pathImport) => {
  let contentFile = await getContentFile(path);

  contentFile = importLib(name, contentFile, pathImport);

  contentFile = mongooseModule(name, contentFile);

  contentFile = controllerModule(name, contentFile);

  contentFile = providerModule(name, contentFile);

  contentFile = exportClass(contentFile);

  writeFileFormat(path, contentFile);
};

const editFileModule = async (path, name, pathImport) => {
  let contentFile = await getContentFile(path);

  contentFile = importModule(name, contentFile, pathImport);
  contentFile = exportClass(contentFile);

  writeFileFormat(path, contentFile.replace('implement', ' implement '));
};

const getContentFile = async (path) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  const listLine = [];
  for await (const line of lineReader) {
    listLine.push(line);
  }

  return listLine.join('').replaceAll(/\s/g, '');
};

const writeFileFormat = (path, content) => {
  const dataFromat = prettier.format(content, { semi: true, parser: 'typescript', singleQuote: true, trailingComma: 'all' });
  fs.writeFile(path, dataFromat, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue('UPDATE') + ' ' + path);
  });
};
