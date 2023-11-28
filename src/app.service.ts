import { HttpException, Injectable } from '@nestjs/common';

const userList = [
  {
    id: 1,
    name: '张三',
    age: 18,
    sex: '男',
  },
  {
    id: 2,
    name: '李四',
    age: 19,
    sex: '女',
  },
  {
    id: 3,
    name: '王五',
    age: 20,
    sex: '女',
  },
  {
    id: 4,
    name: '赵六',
    age: 21,
    sex: '保密',
  },
];
@Injectable()
export class AppService {
  // findOne(id: number | string) {
  //   console.log('[ id ] >', id);
  //   return `这是通过:id 方式传递的参数${id}`;
  // }
  findOneByQuery(id: number | string) {
    console.log('[ id ] >', id);
    if (!id) return userList;
    const user = userList.find((item) => item.id === Number(id));
    if (user) {
      return user;
    } else {
      return '没有该用户';
    }
  }
}
