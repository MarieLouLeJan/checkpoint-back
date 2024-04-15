import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Continent } from "./continent.entity";

@ObjectType()
@Entity()
export class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 3 })
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (continent) => continent.countries)
  continent: Continent;
}

InputType();
export class ContinentInput {
  @Field()
  code: string;
}

@InputType()
export class CreateCountryInput {
  @Field()
  code: string;
  @Field()
  name: string;
  @Field()
  emoji: string;
  @Field()
  continentCode: string;
}
