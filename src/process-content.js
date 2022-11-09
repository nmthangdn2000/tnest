import { capitalizeFirstLetter } from './method.js';
import * as fs from 'fs';
import path from 'path';

const replaceCapitalizeName = /CAPITALIZE/g;
const replaceName = /NAME/g;
const replacePathController = /PATH_CONTROLLER/g;
const replacePathSchema = /PATH_SCHEMA/g;
const replacePathService = /PATH_SERVICE/g;
const replacePathDto = /PATH_DTO/g;
const replacePathFilterDto = /PATH_FILTER_DTO/g;

export const contentSchema = async (name) => {
  try {
    const filePath = 'src/contents/schema.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, capitalizeFirstLetter(name));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentController = async (name, pathService, pathDto, pathFilterDto) => {
  try {
    const filePath = 'src/contents/controller.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
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
    const filePath = 'src/contents/schema.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
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

export const contentModule = async (name, path) => {
  try {
    const filePath = 'src/contents/schema.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return content
      .replace(replaceCapitalizeName, capitalizeFirstLetter(name))
      .replace(replacePathController, path.controller.replace(/.ts/g, ''))
      .replace(replacePathService, path.service.replace(/.ts/g, ''))
      .replace(replacePathSchema, path.schema.replace(/.ts/g, ''));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentDto = async (name) => {
  try {
    const filePath = 'src/contents/dto.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, capitalizeFirstLetter(name));
  } catch (error) {
    throw new Error(error);
  }
};

export const contentFilterDto = async (name) => {
  try {
    const filePath = 'src/contents/dto.ts';

    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return content.replace(replaceCapitalizeName, `${capitalizeFirstLetter(name)}Filter`);
  } catch (error) {
    throw new Error(error);
  }
};
