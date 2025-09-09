export const getRoleColor = (role: string) => {
	switch (role) {
		case "member":
			return "green";
		case "manager":
			return "orange";
		case "staff":
			return "blue";
		case "referee":
			return "cyan";
		default:
			return "default";
	}
};


export const getRoleLabel = (role: string) => {
	switch (role) {
		case "member":
			return "Member";
		case "manager":
			return "Manager";
		case "staff":
			return "Staff";
		case "referee":
			return "Referee";
		case "":
			return "All";
		default:
			return "";
	}
};