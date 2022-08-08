import path from "path";
import request from "supertest";
import { app } from "./app";

describe("69663276", () => {
  it("Create feed (POST)", () => {
    const csv = path.resolve(__dirname, `./data.csv`);
    const pdfDoc = path.resolve(__dirname, `./design.pdf`);

    const accessToken = "123";
    return request(app)
      .post("/feed")
      .set("content-type", "application/octet-stream")
      .set("Authorization", "Bearer " + accessToken)
      .field("text", "Aenean imperdiet. Nam ipsum risus,. Curabitur suscipit suscipit tellus.")
      .field("payment_amount", 0)
      .attach("csv", csv)
      .attach("pdfDoc", pdfDoc)
      .expect(200)
      .then((data) => {
        console.log(data.body);
      });
  });
});
