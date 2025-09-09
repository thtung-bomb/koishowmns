export class Blog {
  id: string = "";
  title: string = "";
  managerId: string = "";
  categoryId: string = "";
  description: string = "";
  imgUrl: string = "";
  content: string = "";
  isDeleted: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  managerName: string = "";
  categoryName: string = "";
  readingTime: number = 0;
  constructor(
    id: string,
    title: string,
    managerId: string,
    categoryId: string,
    description: string,
    content: string,
    imgUrl: string,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    managerName: string,
    readingTime: number,
    categoryName: string
  ) {
    this.id = id;
    this.title = title;
    this.managerId = managerId;
    this.categoryId = categoryId;
    this.description = description;
    this.content = content
    this.imgUrl = imgUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categoryName = categoryName;
    this.isDeleted = isDeleted;
    this.managerName = managerName;
    this.readingTime = readingTime;
  }


}
