import { capitalizeFirstLetter } from './method.js';
import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const replaceCapitalizeName = /CAPITALIZE/g;
const replaceName = /NAME/g;
const replacePathController = /PATH_CONTROLLER/g;
const replacePathSchema = /PATH_SCHEMA/g;
const replacePathService = /PATH_SERVICE/g;
const replacePathDto = /PATH_DTO/g;
const replacePathFilterDto = /PATH_FILTER_DTO/g;

export const contentSchema = async (name) => {
  try {
    const filePath = 'contents/schema.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, capitalizeFirstLetter(name));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentController = async (name, pathService, pathDto, pathFilterDto) => {
  try {
    const filePath = 'contents/controller.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content
      .replace(replaceCapitalizeName, capitalizeFirstLetter(name))
      .replace(replaceName, name)
      .replace(replacePathService, pathService.replace(/.ts/g, ''))
      .replace(replacePathDto, pathDto.replace(/.ts/g, ''))
      .replace(replacePathFilterDto, pathFilterDto.replace(/.ts/g, ''));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentService = async (name, pathSchema, pathDto, pathFilterDto) => {
  try {
    const filePath = 'contents/service.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content
      .replace(replaceCapitalizeName, capitalizeFirstLetter(name))
      .replace(replaceName, name)
      .replace(replacePathSchema, pathSchema.replace(/.ts/g, ''))
      .replace(replacePathDto, pathDto.replace(/.ts/g, ''))
      .replace(replacePathFilterDto, pathFilterDto.replace(/.ts/g, ''));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentModule = async (name, pathImport) => {
  try {
    const filePath = 'contents/module.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content
      .replace(replaceCapitalizeName, capitalizeFirstLetter(name))
      .replace(replacePathController, pathImport.controller.replace(/.ts/g, ''))
      .replace(replacePathService, pathImport.service.replace(/.ts/g, ''))
      .replace(replacePathSchema, pathImport.schema.replace(/.ts/g, ''));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentDto = async (name) => {
  try {
    const filePath = 'contents/dto.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, capitalizeFirstLetter(name));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentFilterDto = async (name) => {
  try {
    const filePath = 'contents/dto.ts';

    const content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, `${capitalizeFirstLetter(name)}Filter`);
  } catch (error) {
    throw new Error(error);
  }
};
