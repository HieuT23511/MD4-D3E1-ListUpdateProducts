import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

// Tên, mức giá, nhà sản xuất, hình ảnh.
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public readonly id: number;
    @Column()
    public price : number;
    @Column({type:"varchar", length:100})
    public name : string;
    @Column ({type:"varchar", length:100})
    public author : string;
    @Column ({type:"varchar", length:100})
    public image : string;
}
