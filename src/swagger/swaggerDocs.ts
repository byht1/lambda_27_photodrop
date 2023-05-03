import { schemas } from './swagger-schemas/index';
import { paths } from './swagger-paths/index';

export const swaggerDocs = {
  openapi: '3.0.3',
  info: {
    title: 'Swagger - OpenAPI 3.0',
    version: '1.0.01',
  },
  servers: [
    {
      url: 'https://lambda-24-northwind.onrender.com ',
    },
  ],
  tags: [
    {
      name: 'Photographers',
    },
  ],
  paths,
  components: {
    schemas,
  },
};
