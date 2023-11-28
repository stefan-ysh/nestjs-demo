import { Controller, Get, Headers, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 通过 url 传参， 如：/user/1
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.appService.findOne(id);
  // }
  // 通过 query 传参，如：/user?id=1
  @Get()
  // @Query() 获取所有 query 参数
  // @Query('id') 获取 id 参数
  findOneByQuery(@Query('id') id: string, @Headers() headers) {
    return this.appService.findOneByQuery(id);
  }
}
