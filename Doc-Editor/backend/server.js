const mongoose = require("mongoose");
const Document = require("./document");
const socketIO = require("socket.io");

mongoose
  .connect("mongodb://127.0.0.1:27017/Doc-Editor")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const io = socketIO(3001, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

const defaultValue = {};

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    try {
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("received-changes", delta);
      });

      socket.on("save-document", async (data) => {
        try {
          await Document.findByIdAndUpdate(documentId, { data }, { new: true });
        } catch (err) {
          console.error("Error saving document:", err);
        }
      });
    } catch (err) {
      console.error("Error fetching/creating document:", err);
    }
  });
});

async function findOrCreateDocument(id) {
  if (id == null) {
    return;
  }

  try {
    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
  } catch (err) {
    throw new Error(`Document operation failed: ${err.message}`);
  }
}
