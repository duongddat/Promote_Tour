const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const globalErrorHandler = require("./controllers/errorController");
const socketReview = require("./services/socketReview");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/tourRouter");
const countryRouter = require("./routes/countryRouter");
const reviewRouter = require("./routes/reviewRouter");
const bookingRouter = require("./routes/bookingRouter");
const postRouter = require("./routes/postRouter");
const discountRouter = require("./routes/discountRouter");
const statisticalRouter = require("./routes/statisticalRouter");

dotenv.config({ path: "./.env" });
const app = express();

//DATABASE CONNECTIONS
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successfully!");
  } catch (error) {
    console.log(error);
  }
};

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10mb" }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//------- Implement CORS
app.use(cors());
//-----------Cookie
app.use(cookieParser());

//ROUTES
app.use("/tours", tourRouter);
app.use("/countries", countryRouter);
app.use("/reviews", reviewRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use("/posts", postRouter);
app.use("/discounts", discountRouter);
app.use("/statis", statisticalRouter);

app.use(globalErrorHandler);

//Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.emit("test", "Test socket đầu tiên!!!");

  socketReview(io, socket);

  // socket.on("disconnect", () => {
  //   console.log("Người dùng đã ngắt kết nối: ", socket.id);
  // });
});

//SEVER
const post = process.env.PORT || 8000;
httpServer.listen(post, () => {
  connect();
  console.log(`Server running on port ${post}`);
});
