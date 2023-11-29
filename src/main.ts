import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "./common/interceptor/transform/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置和注册 Swagger
  const config = new DocumentBuilder()
    .setTitle("Nestjs learning example")
    .setDescription("The nestjs API is used for learning nestjs")
    .setVersion("1.0")
    // .addTag("nestjs-demo")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000, () => {
    console.log(
      "server started successfully and running on >",
      "http://localhost:3000"
    );
  });
}
bootstrap();
