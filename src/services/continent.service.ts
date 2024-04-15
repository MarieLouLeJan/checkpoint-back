import { Repository } from "typeorm";
import { Country, CreateCountryInput } from "../entities/country.entity";
import datasource from "../db";
import { Continent } from "../entities/continent.entity";

export default class ContinentService {
  db: Repository<Continent>;

  constructor() {
    this.db = datasource.getRepository(Continent);
  }

  async findOneByCode(code: string) {
    return await this.db.findOneBy({
      code,
    });
  }

  async create(code: string) {
    const newContinent = this.db.create({ code });
    return await this.db.save(newContinent);
  }
}
