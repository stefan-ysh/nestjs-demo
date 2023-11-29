import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

const userList = [
  {
    id: '1',
    name: "张三",
    age: 18,
    sex: "男",
  },
  {
    id: '2',
    name: "李四",
    age: 19,
    sex: "女",
  },
  {
    id: '3',
    name: "王五",
    age: 20,
    sex: "女",
  },
  {
    id: '4',
    name: "赵六",
    age: 21,
    sex: "保密",
  },
];
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: new Date().getTime() + '',
    }
    userList.push(newUser);
    return userList;
  }

  findAll() {
    return userList;
  }

  findOne(id: string) {
    const user = userList.find((item) => item.id == id);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = userList.find((item) => item.id == id);
    if (user) {
      Object.assign(user, updateUserDto);
      return user;
    } else {
      return null;
    }
  }

  remove(id: string) {
    const index = userList.findIndex((item) => item.id == id);
    if (index > -1) {
      userList.splice(index, 1);
      return id;
    } else {
      return null;
    }
  }
}
