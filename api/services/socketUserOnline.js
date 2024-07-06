const Notification = require("../models/notificationModel");

let userOnline = new Map();

const getUser = (userId) => {
  for (let [key, value] of userOnline.entries()) {
    if (key === userId.toString()) {
      return { userId: key, socketId: value };
    }
  }
  return null;
};

const addOnlineUser = (userId, socketId) => {
  if (!userOnline.get(userId.toString())) {
    userOnline.set(userId.toString(), socketId);
  }
};

const removeOnlineUser = (userId, socketId) => {
  if (userId != null) {
    userOnline.delete(userId.toString());
  } else {
    userOnline.forEach((value, key) => {
      if (value === socketId) {
        userOnline.delete(key);
      }
    });
  }
};

const socketUserOnline = (io, socket) => {
  socket.on("onlineUser", (userId) => {
    addOnlineUser(userId, socket.id);
  });

  socket.on("listNot", (userId) => {
    const receiver = getUser(userId);
    io.to(receiver.socketId).emit("getListNot", [...userOnline.keys()]);
  });

  socket.on("count_notification", async (userId) => {
    const receiver = getUser(userId);
    if (receiver !== null) {
      const numNoti = await Notification.countDocuments({ recipient: userId });

      io.to(receiver.socketId).emit("get_num_notification", numNoti);
    }
  });

  socket.on("signOut", (userId, socketId = null) => {
    removeOnlineUser(userId, null);
    io.emit("getOnlineUsers", [...userOnline.keys()]);
  });

  socket.on("disconnect", () => {
    removeOnlineUser(null, socket.id);
    io.emit("getOnlineUsers", [...userOnline.keys()]);
  });
};

module.exports = socketUserOnline;
