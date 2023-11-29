import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "用户 ID，唯一标识", example: 1 })
  id: number;
  @ApiProperty({ description: "用户名", example: "admin" })
  username: string;
  @ApiProperty({ description: "用户密码", example: "password" })
  password: string;
  @ApiProperty({ description: "用户年龄", example: 18 })
  age: number;
  @ApiProperty({ description: "用户性别", example: "男" })
  sex: string;
}
