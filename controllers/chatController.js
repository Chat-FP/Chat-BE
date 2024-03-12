import Chat from "../models/chatModel.js";

export const getChatHistory = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const chatHistory = await Chat.find({
      members: { $all: [sender, receiver] },
    });
    res.status(200).send(chatHistory);
  } catch (err) {
    res.status = 500;
  }
};
