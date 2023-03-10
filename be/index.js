import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);

app.listen(1613, ()=> console.log('Server up and running...'));