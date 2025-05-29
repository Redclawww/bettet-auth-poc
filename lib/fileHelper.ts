import { JSON_SOURCE_FILE } from "@/app/_dal/constants";
import fs from "fs";
export class FileHelper {
  private static fileContent: string | null = null;

  private constructor() {}

  static getFile(): string {
    const filePath = process.cwd() + JSON_SOURCE_FILE;

    if (!this.fileContent) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ todos: [] }), "utf8");
      }
      this.fileContent = fs.readFileSync(filePath, "utf8");
    }

    return this.fileContent;
  }

  static writeToFile(content: string): void {
    const filePath = process.cwd() + JSON_SOURCE_FILE;
    fs.writeFileSync(filePath, content, "utf8");
    this.fileContent = content;
  }
}

export class TodoFileHelper implements FileHelper {}
