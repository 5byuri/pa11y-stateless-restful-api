
import fs from 'fs';
import path from 'path';

export async function loadReporter(reporter: string): Promise<unknown> {
  try {
    return await import(reporter);
  } catch  {
    const localModule = path.resolve(process.cwd(), reporter);
    if (!fs.existsSync(localModule)) {
      console.error(`Unable to load reporter "${reporter}"`);
      return undefined;
    }
    return await import(localModule);
  }
}
