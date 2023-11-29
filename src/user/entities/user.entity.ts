import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主键，值自动生成

  @Column({ length: 20, unique: true })
  username: string;
  @Column({ length: 200 })
  password: string;
  // 年龄
  @Column({ default: 18})
  age: number;
  // 性别
  @Column({ length: 20, default: "男" })
  sex: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_time: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_time: Date;
}
