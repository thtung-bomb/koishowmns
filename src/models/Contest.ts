import { Category } from "./Category";

export class Contest {
    id: string;
    name: string;
    description: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    location: string;
    startDate: Date;
    endDate: Date;
    status: string;
    managerId: string;
    rules: Array<{
        id: string,
        createdAt?: Date;
        updatedAt?: Date;
        description: string;
        isDeleted?: boolean;
    }>
    categories: Array<Category>;
    criterias: Array<{
        weight: number;
        criteriaName: string;
        criteriaDescription: string
    }>

    constructor(
        id: string = "",
        name: string = "",
        description: string = "",
        isDeleted: boolean = false,
        createdAt: Date,
        updatedAt: Date,
        location: string = "",
        startDate: Date = new Date(),
        endDate: Date = new Date(),
        status: string = '',
        managerId: string = "",
        rules: Array<{
            id: string,
            createdAt?: Date;
            updatedAt?: Date;
            description: string;
            isDeleted?: boolean;
        }> = [],
        categories: Array<Category> = [],
        criterias: Array<{
            weight: number;
            criteriaName: string;
            criteriaDescription: string
        }> = []

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.managerId = managerId;
        this.rules = rules;
        this.categories = categories;
        this.criterias = criterias;
    }
}
