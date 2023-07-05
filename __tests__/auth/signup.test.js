const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const User = require("../../src/models/user.model");

describe("Protected API Endpoint", () => {
  beforeAll(async () => {
    // Connect to the MongoDB test database
    const mongoURI =
      "mongodb+srv://Kamal9462:QWERTY123@cluster0.llk00.mongodb.net/crm-new?retryWrites=true&w=majority";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user
    const userPayload = {
      Email: "testadmin0145630@gmail.com",
      Name: "Kamlesh1",
      UserName: "Kamlesh1",
      Phone: "5252525252",
      City: "Delhi-NCR",
      companyName: "K4 Technology",
      UserType: 2,
      menuPermissions: ["Status List", "Branch List"],
      Address: "Delhi",
      teamSize: 10,
      numberOfUsers: 15,
      validupTo: "2023-06-28T12:22:00.000+00:00",
      webURL: "https://www.matrix.com",
    };
    const user = await User.create(userPayload);
    
  });

  // afterAll(async () => {
  //   // Delete the test user from the database
  //   await User.deleteMany({});
  //   await mongoose.disconnect();
  // });

  describe("POST /v1/admin/auth/signup", () => {
    it("should return a success message for successful signup admin", async () => {
      const response = await request(app)
        .post("/v1/admin/auth/signup")
        .expect(201);

      //expect(response.body.message).toBe("admin created successfully!!");
    });

    // it("should return an error for unauthenticated user", async () => {
    //   const response = await request(app).get("/api/protected").expect(401);

    //   expect(response.body.error).toBe("Unauthorized");
    // });
  });
});
