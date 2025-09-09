export type UserRole = "manager" | "staff" | "member" | "referee";

export class User {
  id: string;
  googleId?: string;
  name: string;
  email: string; // unique
  password?: string; // required if google_id is null or empty
  role: UserRole;
  status: boolean; // default is true, set false if want disabled user status
  phoneNumber?: string;
  description?: string; // required if user role is instructor
  avatar: { file?: { originFileObj?: File } } | string;
  dob?: Date | string; // date of birth
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean; // flag remove logic when user is deleted

  constructor(
    id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "member",
    status: boolean = true,
    googleId?: string,
    password?: string,
    phoneNumber?: string,
    description?: string,
    avatar?: { file?: { originFileObj?: File } } | string,
    dob?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    isDeleted?: boolean,
  ) {
    this.id = id;
    this.googleId = googleId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
    this.phoneNumber = phoneNumber;
    this.description = description;
    this.avatar = avatar || "";
    this.dob = dob;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}