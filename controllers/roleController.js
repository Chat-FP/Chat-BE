import Role from "../models/roleModel.js";

//* Create a new role
export const createRole = async (req, res) => {
  try {
    const newRole = req.body;
    console.log(newRole);

    const createdRole = await Role.create(newRole);
    console.log(createdRole);
    res.status(201).send("Role created");
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
//* Get all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//* Get a role
export const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//* Update a role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//* Delete a role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.findByIdAndDelete(id);
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
