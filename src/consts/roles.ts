export enum ROLES {
  // CUSTOMER = "customer",
  MEMBER = "member",
  STAFF = "staff",
  MANAGER = "manager",
  REFEREE = "referee"
};

export const rolesArr = [ROLES.REFEREE, {/*ROLES.CUSTOMER*/ }, ROLES.MEMBER, ROLES.MANAGER, ROLES.STAFF];

export const privateRole = [ROLES.REFEREE, ROLES.MANAGER, ROLES.STAFF];
