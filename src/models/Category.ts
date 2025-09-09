export class Category {
  id: string;
  name: string;
  description: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string = "",
    name: string = "",
    description: string = "",
    isDeleted: boolean = false,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
