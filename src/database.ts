// Core
import { createConnection, getConnectionOptions } from "typeorm";

export const connectDatabase = async () => {
  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );

  await createConnection({ ...dbOptions, name: "default" });
}

