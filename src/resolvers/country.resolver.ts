import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CreateCountryInput } from "../entities/country.entity";
import CountriesService from "../services/countries.service";
import ContinentService from "../services/continent.service";

@Resolver(() => Country)
export default class CountryResolver {
  @Query(() => [Country])
  async list(@Arg("continentCode", { nullable: true }) continentCode: string) {
    return await new CountriesService().list(continentCode);
  }

  @Query(() => Country)
  async findOneByCode(@Arg("code") code: string) {
    return await new CountriesService().findOneByCode(code);
  }

  // @Query(() => [Country])
  // async findByContinent(@Arg("code") code: string) {
  //   return await new CountriesService().findByContinent(code);
  // }

  @Mutation(() => Country)
  async create(@Arg("data") data: CreateCountryInput) {
    const continentService = new ContinentService();
    const continent = await continentService.findOneByCode(data.continentCode);
    if (!continent) {
      await continentService.create(data.continentCode);
    }
    return await new CountriesService().create(data);
  }
}
