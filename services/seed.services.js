/* import Role from "../models/roleModel.js";
import User from "../models/userModel.js";
//* Seed roles function
export async function seedRoles() {
  const regularRole = new Role({
    label: "Regular user",
    privilegeLevel: 3,
    canRead: true,
    canWriteSelf: true,
    canWriteOthers: false,
    canDelete: false,
  });
  const moderatorRole = new Role({
    label: "Moderator",
    privilegeLevel: 2,
    canRead: true,
    canWriteSelf: true,
    canWriteOthers: true,
    canDelete: false,
  });
  const adminRole = new Role({
    label: "Admin",
    privilegeLevel: 1,
    canRead: true,
    canWriteSelf: true,
    canWriteOthers: true,
    canDelete: true,
  });
  const blockedRole = new Role({
    label: "Blocked",
    privilegeLevel: 4,
    canRead: false,
    canWriteSelf: false,
    canWriteOthers: false,
    canDelete: false,
  });
  try {
    await Role.deleteMany();

    const roles = [];
    roles.push(await Role.create(regularRole));
    roles.push(await Role.create(moderatorRole));
    roles.push(await Role.create(adminRole));
    roles.push(await Role.create(blockedRole));

    return roles;
  } catch (error) {
    console.log(error);
  }
}
 */
