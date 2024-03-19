//* message controller
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { msgObj, receiver } = req.body;

    console.log("cookie", req.cookies);

    const newMessage = new Chat({
      //session_id: `${req.user_id}_${chatNumber}`,
      senderUser: msgObj.senderUser,
      sender: msgObj.sender,
      message: msgObj.message,
    });

    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Chat.findByIdAndDelete(id);
    res.status(200).send(message);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updatedMessage = await Chat.findByIdAndUpdate(
      id,
      { message: message },
      { new: true }
    );
    res.status(200).send(updatedMessage);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
export const saveMessage = async (newMessages) => {
  try {
    const jsonNewMessages = JSON.stringify(newMessages);
    console.log("newMsgs", newMessages[0].message);
    console.log("jsonMsg", jsonNewMessages);
    const mappedMassages = newMessages.map((msgObj) => {
      console.log("msgObj", msgObj);
      return {
        sender: msgObj.sender,
        message: msgObj.message.message,
        senderUser: msgObj.message.senderUser,
      };
    });
    if (jsonNewMessages) {
      console.log("test", mappedMassages);
      const savedMessage = await Message.insertMany(mappedMassages);
      console.log("savedMessages", savedMessage);
      if (savedMessage) {
        await console.log("savedMessages", savedMessage);
        return savedMessage;
      } else {
        res.status(500).send("Messages not saved");
      }
    } else {
      res.status(500).send("No Messages");
    }
  } catch (err) {
    return err + "error";
  }
};

/* export const getChatHistory = async (sender, receiver) => {
  try {
    console.log("History s", sender.body);
    console.log("History r", receiver.body);

    const messages = await Message.find({
      sender: { $in: [sender, receiver] },
      receiver: { $in: [sender, receiver] },
    });
    console.log("History message", messages);
    return messages;
  } catch (err) {
    return err;
  }
};
 */
