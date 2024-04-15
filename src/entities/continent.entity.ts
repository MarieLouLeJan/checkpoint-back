import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";

@ObjectType()
@Entity()
export class Continent {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 3 })
  code: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}
