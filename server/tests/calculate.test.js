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
        vehicleType: "airplane",
        engineType: "gasturbine",
        aircraftMass: 1000,
        fuelTankVolume: 1000,
        payload: 1000,
        wsmCoefficients: {
          range: 50,
          payload: 50,
          ecology: 50,
          cost: 50,
          reliability: 50
        },
        limitingParameters: {
          freezingTemp: { min: -100, max: -20 },
          density: { min: 600, max: 1000 },
          viscosity: { min: 0.1, max: 10 },
          combustionHeat: { min: 15000, max: 50000 },
          coolingResource: { min: 1000, max: 3000 },
          thermalConductivity: { min: 0.05, max: 0.3 },
          heatCapacity: { min: 1000, max: 5000 },
          inductionPeriod: { min: 200, max: 800 },
          burningRate: { min: 0.05, max: 2 },
          vaporPressure: { min: 0.1, max: 100 }
        }
      })
      .expect(200);
    expect(response.body).toHaveProperty("fuelEfficiency");
  });
});