import Server from "../models/severModel.js";

export const createServer = async (req, res) => {
  const { serverName, serverDescription, serverOwner, serverMembers } =
    req.body;
  try {
    const serverExists = await Server.findOne({ serverName });
    if (serverExists) {
      return res
        .status(400)
        .send({ message: "Server already exists with this name" });
    }
    const server = await Server.create({
      serverName,
      serverDescription,
      serverOwner,
      serverMembers,
    });

    server.serverMembers.push(serverOwner);
    await server.updateOne({
      serverMembers: [...server.serverMembers, serverOwner],
    });

    res.status(201).send({ server });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server creation failed");
  }
};
//* Get all servers
export const getServers = async (req, res) => {
  try {
    const servers = await Server.find();
    res.status(200).send(servers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
//* Remove a server
export const removeServer = async (req, res) => {
  const serverId = req.body._id;
  console.log(serverId);
  try {
    const deletedServer = await Server.findByIdAndDelete(serverId);
    console.log("deletedServer", deletedServer);
    if (!deletedServer) {
      return res.status(400).send("Server not found");
    }
    res.status(200).send("Server removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
//* Update a server
export const updateServer = async (req, res) => {
  console.log(req.body);
  const {
    serverName: serverName,
    serverDescription: serverDescription,
    serverOwner,
    serverMembers,
  } = req.body;
  const serverId = req.body._id;
  try {
    const server = await Server.findById(serverId);
    if (!server) {
      return res.status(400).send("Server not found");
    }
    const updatedServer = await Server.findByIdAndUpdate(serverId, {
      serverName,
      serverDescriotion: serverDescription,
      serverOwner,
      serverMembers,
    });
    res.status(200).send(updatedServer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
//* ServerStatus update
export const updateServerStatus = async (req, res) => {
  const { serverId, serverStatus } = req.body;
  console.log(serverId, serverStatus);
  try {
    const server = await Server.findById(serverId);
    if (!server) {
      return res.status(400).send("Server not found");
    }
    const updatedServer = await Server.findByIdAndUpdate(serverId, {
      serverStatus,
    });
    res.status(200).send(updatedServer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
//* Add a member to the server
