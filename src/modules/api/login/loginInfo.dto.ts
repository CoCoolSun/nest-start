import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,Matches, MATCHES } from "class-validator";
export class LoginInfoDto {
  @Matches(/^[a-zA-z]\w{4,29}$/, {
    message: 'username账号长度为5,30',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty()
  password: string;
}
