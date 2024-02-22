import User from "../models/userModel.js";

export const addFriend = async (req, res) => {
  console.log("addFriend");
  const { userId, friendId } = req.body;
  try {
    const CurrentUser = await User.findById(userId);
    const friendUser = await User.findById(friendId);
    if (!(CurrentUser && friendUser)) {
      return res.status(400).send("User or friend not found");
    }
    if (CurrentUser.friends.includes(friendId)) {
      return res.status(400).send("Already friends");
    }
    CurrentUser.friends.push(friendId);
    await CurrentUser.updateOne({
      friends: [...CurrentUser.friends, friendId],
    });
    res.status(200).send("Friend added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const CurrentUser = await User.findById(userId);
    const friendUser = await User.findById(friendId);
    if (!(CurrentUser && friendUser)) {
      return res.status(400).send("User or friend not found");
    }
    if (!CurrentUser.friends.includes(friendId)) {
      return res.status(400).send("Not friends");
    }
    const updatedFriends = CurrentUser.friends.filter(
      (friend) => friend.toString() !== friendId
    );
    await CurrentUser.updateOne({ friends: updatedFriends });
    res.status(200).send("Friend removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
