# NestJs learning note

## controller

![Controller](https://docs.nestjs.com/assets/Controllers_1.png)

> 控制层，这里主要是写路由相关代码以及处理前端传来的一些参数，简单一句话：将哪些参数交给哪个服务来处理，可以执行`nest g controller [name]`生成一个新的 controller，获取参数的几种方法:

1. `@Params()`
   用来获取路由中的参数，如：/user/:id，@Params() params 中的 params 就是 { id: '123' }，如果要直接读取id，则使用@Param('id')，这样就可以直接获取到 id 的值: 123

2. `@Query()`
   用来获取get请求中的参数，如：/user?id=1，@Query() 就是 { id: '123' }，如果要直接读取 id，则使用@Query('id')，这样就可以直接获取到 id 的值: 123

3. `@Body()`
   用来获取post请求中的参数，如：/user，@Body() body 中的 body 就是整个 post 请求体（对象），如果要直接读取id，则使用 @Body('id')，这样就可以直接获取到 id 的值: 123

4. `@Headers()`
   用来获取请求头中的参数，如：/user，@Headers() headers 中的 headers 就是整个请求头（对象），如果要直接读取 token，则使用 @Headers('token')，这样就可以直接获取到请求头中的 token 的值: xxxxxx

```ts
import { Controller, Get, Headers, Query } from "@nestjs/common";

import { AppService } from "./app.service";
// 这句代码的意思是，当用户访问 http://localhost:3000/user 路径时，将请求交给 AppController 来处理
@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 以下代码的意思是：讲请求的参数 id 交给 appService 的 findOneByQuery 方法来处理
  @Get()
  findOneByQuery(@Query("id") id: string, @Headers() headers) {
    // @Query('id') id: string, @Headers() headers 这句代码是意思是：将请求的参数 id 赋值给 findOneByQuery 方法的的第一个参数(id)，将请求头赋值给 fineOneByQuery 方法第二个参数 (headers)
    return this.appService.findOneByQuery(id);
  }
}
```

## service

> 业务层,在这里写一些与业务相关的逻辑。比如对数据库的 CRUD 就可以写到这里

```ts
import { Injectable } from "@nestjs/common";

const userList = [
  {
    id: 1,
    name: "张三",
    age: 18,
    sex: "男",
  },
  {
    id: 2,
    name: "李四",
    age: 19,
    sex: "女",
  },
  {
    id: 3,
    name: "王五",
    age: 20,
    sex: "女",
  },
  {
    id: 4,
    name: "赵六",
    age: 21,
    sex: "保密",
  },
];
@Injectable()
export class AppService {
  // 这里的意思是：如果id存在，则返回对应的用户，如果id不存在，则返回所有用户
  findOneByQuery(id: number | string) {
    if (!id) return userList;
    const user = userList.find((item) => item.id === Number(id));
    if (user) {
      return user;
    } else {
      return "没有该用户";
    }
  }
}
```

![module](https://docs.nestjs.com/assets/Modules_1.png)

## module

> 模块，将多个业务模块进行整合，比如将 user 模块和 goods 模块整合到一起，形成一个模块。
> 这里相当于一个应用程序的根模块,我们可以看到它将AppController和AppService都通过@Module进行了一个注入

## 集成swagger

[Doc](https://docs.nestjs.com/openapi/introduction)

1. 安装依赖

```bash
npm install --save @nestjs/swagger

```

2. 注册

```ts
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  // ... other code
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  // ... other code
}
```

3. 启动

```bash
npm start
```

4. 访问 http://localhost:3000/api

![](https://docs.nestjs.com/assets/swagger1.png)

> 查看和下载 json 则需要访问 http://localhost:3000/api-json
