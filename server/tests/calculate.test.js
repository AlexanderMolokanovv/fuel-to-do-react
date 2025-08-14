const request = require("supertest");
const app = require("../server");

describe("POST /api/calculate", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, () => done());
  });

  afterAll((done) => {
    server.close(() => done());
  });

  it("should return calculation results", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({
        vehicleType: 1,
        engineType: "jet",
        aircraftMass: 1000,
        fuelTankVolume: 500,
        payload: 200,
        wsmCoefficients: { coeff1: 50 },
        limitingParameters: { param1: { min: 10, max: 20 } }
      })
      .expect(200);
    expect(response.body).toHaveProperty("fuelEfficiency");
  });
});
