//* Controller for blocked users
import User from "../models/userModel.js";
export const addBlockedUser = async (req, res) => {
  const userId = req.body._id;
  const blockedUserId = req.body.blockedUsers;

  console.log(req.body);

  try {
    const CurrentUser = await User.findById(userId);
    const blockedUser = await User.findById(blockedUserId);
    console.log(CurrentUser, blockedUser);
    if (!(CurrentUser && blockedUser)) {
      return res.status(400).send("User or blockedUser not found");
    }
    if (CurrentUser.blockedUsers.includes(blockedUserId)) {
      return res.status(400).send("Already blocked");
    }
    CurrentUser.blockedUsers.push(blockedUserId);
    await CurrentUser.updateOne({
      blockedUsers: [...CurrentUser.blockedUsers, blockedUserId],
    });
    console.log(CurrentUser.blockedUsers);
    res.status(200).send("Blocked user added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export const removeBlockedUser = async (req, res) => {
  const userId = req.body._id;
  const blockedUserId = req.body.blockedUsers;
  try {
    const CurrentUser = await User.findById(userId);
    const blockedUser = await User.findById(blockedUserId);
    if (!(CurrentUser && blockedUser)) {
      return res.status(400).send("User or blockedUser not found");
    }
    if (!CurrentUser.blockedUsers.includes(blockedUserId)) {
      return res.status(400).send("Not blocked");
    }
    const updatedBlockedUsers = CurrentUser.blockedUsers.filter(
      (blockedUser) => blockedUser.toString() !== blockedUserId
    );
    await CurrentUser.updateOne({ blockedUsers: updatedBlockedUsers });
    res.status(200).send("Blocked user removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
