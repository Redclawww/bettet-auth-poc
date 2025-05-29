import { delay } from "@/lib/helperFunctions";
import { DbType, ITodoApi } from "../ctypes";
import { FileJsonTodoApi } from "./fileJsonTodoApi";
import { MongoDbTodoApi } from "./mongoDbTodoApi";

export class FactoryApi {
  static getClass(dbType?: DbType): ITodoApi {
    let api: ITodoApi;

    if (!dbType || dbType === "FILE") {
      api = new FileJsonTodoApi();
    } else if (dbType === "MONGODB") {
      api = new MongoDbTodoApi();
    } else {
      console.warn(
        `Unknown DB_TYPE: ${dbType}, falling back to file-based implementation`
      );
      api = new FileJsonTodoApi();
    }

    return this.withDelay(api, 500);
  }

  private static withDelay<T extends object>(api: T, delayMs: number): T {
    return new Proxy(api, {
      get(target, prop, receiver) {
        const original = Reflect.get(target, prop, receiver);
        if (typeof original === "function") {
          return async (...args: any[]) => {
            await delay(delayMs);
            return original.apply(target, args);
          };
        }
        return original;
      },
    });
  }
}
