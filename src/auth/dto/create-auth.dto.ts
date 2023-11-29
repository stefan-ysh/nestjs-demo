import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiProperty({ description: "用户名", example: "admin" })
  username: string;
  @ApiProperty({ description: "密码", example: "123456" })
  password: string;
  @ApiProperty({ description: "年龄", example: 18 })
  age: number;
  @ApiProperty({ description: "性别", example: "男" })
  sex: string;
}
