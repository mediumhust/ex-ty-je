import express, { Express, Request, Response } from "express";
import multer from "multer";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    const extention = file.mimetype.split("/")[1];
    var imageUrl = file.fieldname + "-" + Date.now() + "." + extention;
    callback(null, imageUrl);
  },
});

const upload = multer({ storage });
//const upload = multer({ dest: "uploads/" });
const cpUpload = upload.fields([{ name: "csv" }, { name: "pdfDoc" }]);
app.post("/feed", cpUpload, (req, res) => {
  console.log(req.files);
  console.log("req.body: ", req.body);
  res.status(200).send({
    status: "success",
  });
});

export { app };
