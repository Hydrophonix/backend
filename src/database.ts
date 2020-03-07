// Core
import { createConnection, getConnectionOptions } from "typeorm";

// Instruments
import { NODE_ENV } from './constants';

export const connectDatabase = async () => {
  const dbOptions = await getConnectionOptions(NODE_ENV);

  await createConnection({ ...dbOptions, name: "default" });
}

