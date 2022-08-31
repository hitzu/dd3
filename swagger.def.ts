import { swLoginRouter } from './src/routes/login.route';
import { swPlayRouter } from './src/routes/play.route';
import { swReportRouter } from './src/routes/report.route';

export const swDocument = {
  openapi: '3.0.0',
  info: {
    title: 'POC DD3',
    version: '1.0.0',
    description: 'The REST API to DD3'
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server'
    }
  ],
  paths: {
    ...swLoginRouter,
    ...swPlayRouter,
    ...swReportRouter
  }
};
