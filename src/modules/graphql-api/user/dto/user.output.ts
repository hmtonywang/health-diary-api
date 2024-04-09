import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: false })
  isVerified!: boolean;

  @Field(() => String, { nullable: true })
  facebookId?: string;

  @Field(() => String, { nullable: true })
  googleId?: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string;
}