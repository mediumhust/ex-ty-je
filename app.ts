import express, { Express, Request, Response } from "express";
import multer from "multer";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const upload = multer({ dest: "uploads/" });
const cpUpload = upload.fields([{ name: "csv" }, { name: "pdfDoc" }]);
app.post("/feed", cpUpload, (req, res) => {
  console.log(req.files);
  console.log("req.body: ", req.body);
  res.status(200).send({
    status: "success",
  });
});

export { app };
