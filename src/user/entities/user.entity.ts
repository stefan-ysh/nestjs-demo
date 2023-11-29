import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主键，值自动生成

  @Column({ length: 20 })
  username: string;
  @Column({ length: 20 })
  password: string;
  // 年龄
  @Column()
  age: number;
  // 性别
  @Column({ length: 20 })
  sex: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_time: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_time: Date;
}
