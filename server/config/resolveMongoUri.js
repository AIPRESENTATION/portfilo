import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer = null;

const isPlaceholderUri = (uri) =>
  !uri ||
  uri.includes('xxxxx') ||
  uri.includes('<username>') ||
  uri.includes('<password>');

/** Use in-memory MongoDB when Atlas URI is not configured (local dev). */
export const resolveMongoUri = async () => {
  const uri = process.env.MONGODB_URI;

  if (process.env.USE_MEMORY_DB === 'true' || isPlaceholderUri(uri)) {
    if (!memoryServer) {
      memoryServer = await MongoMemoryServer.create();
      console.log('Using in-memory MongoDB for local development');
    }
    return memoryServer.getUri('rakesh-portfolio');
  }

  return uri;
};
