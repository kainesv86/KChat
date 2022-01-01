export const config = {
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST || '',
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  PORT: Number(process.env.PORT) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || '',
};
