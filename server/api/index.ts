import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
let cachedServer: any;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    // important：prohibit bodyParser, let Vercel take charge
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  cachedServer(req, res);
}
