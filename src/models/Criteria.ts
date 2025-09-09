export class Criteria {
	id: string;
	name: string;
	description: string;
	isDeleted?: boolean;
	createdAt: string;
	updatedAt: string;

	constructor(
		id: string = "",
		name: string = "",
		description: string = "",
		isDeleted: boolean = false,
		createdAt: string = "",
		updatedAt: string = ""
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.isDeleted = isDeleted;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
