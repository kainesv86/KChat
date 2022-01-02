import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `config/.env`,
});

import { config } from './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { monoLogger } from 'mono-utils-core';
export const NS_APP = 'KChat';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(config.PORT, () => {
    monoLogger.log(NS_APP, `Current Mode: ${config.NODE_ENV}`);
    monoLogger.log(NS_APP, `Listening on port ${config.PORT}`);
    monoLogger.log(NS_APP, `Ready to service`);
  });
}

monoLogger.log(NS_APP, `---------------Configuration--------------------`);
monoLogger.log(NS_APP, config);
monoLogger.log(NS_APP, `-----------------------------------`);

bootstrap();
