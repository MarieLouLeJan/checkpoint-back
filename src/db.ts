import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "checkpoint_back.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  // pour le logger les requetes sql dans le terminal
  // logging: true,
});
