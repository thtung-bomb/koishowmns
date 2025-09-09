export class KoiEntry {
	id: string;
	name: string;
	variety: string;
	size: string;
	koiImage: string;
	description: string;
	ownerId: string | undefined;
	createdAt: string;
	updatedAt: string;

	constructor(
		id: string = "",
		name: string = "",
		variety: string = "",
		size: string = "",
		koiImage: string = "",
		description: string = "",
		ownerId: string | undefined = undefined,
		createdAt: string = "",
		updatedAt: string = ""
	) {
		this.id = id;
		this.name = name;
		this.variety = variety;
		this.size = size;
		this.koiImage = koiImage;
		this.description = description;
		this.ownerId = ownerId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
