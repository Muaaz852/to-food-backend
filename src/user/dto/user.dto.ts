import { UserRoleEnum } from "../../core/user-role.enum";

export interface UserDto {
  fullName: string;
  email: string;
  role: UserRoleEnum
}
