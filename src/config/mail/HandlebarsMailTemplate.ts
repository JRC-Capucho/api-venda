import handlebars from "handlebars";
import fs from "fs";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string; // template e um arquivo
  varibles: ITemplateVariable;
}

export class HandlebarsMailTemplate {
  async parse({ template, varibles }: IParseMailTemplate): Promise<string> {
    const templateFile = await fs.promises.readFile(template, {
      encoding: "utf8",
    });
    const parseTemplate = handlebars.compile(templateFile);

    return parseTemplate(varibles);
  }
}
