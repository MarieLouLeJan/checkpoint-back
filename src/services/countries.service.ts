import { Repository } from "typeorm";
import { Country, CreateCountryInput } from "../entities/country.entity";
import datasource from "../db";
import ContinentService from "./continent.service";

export default class CountriesService {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async list(continentCode?: string) {
    return await this.db.find({
      where: { continent: { code: continentCode ?? undefined } },
      relations: { continent: true },
    });
  }

  async findOneByCode(code: string) {
    const country = await this.db.findOne({
      where: { code },
      relations: { continent: true },
    });
    if (!country) {
      throw new Error("No data found");
    }
    return country;
  }

  async findOneByCodeWithoutAsserting(code: string) {
    return await this.db.findOne({
      where: { code },
      relations: { continent: true },
    });
  }

  // async findByContinent(code: string) {
  //   return await this.db.findBy({
  //     continent: { code },
  //   });
  // }

  async create({ continentCode, code, emoji, name }: CreateCountryInput) {
    const country = await this.findOneByCodeWithoutAsserting(code);
    if (!!country) {
      throw new Error("This country code already exists");
    }
    const continent = await new ContinentService().findOneByCode(continentCode);
    if (!continent) {
      throw new Error("This continent does not exists");
    }
    const newCountry = this.db.create({
      code,
      emoji,
      name,
      continent,
    });
    return await this.db.save(newCountry);
  }
}
