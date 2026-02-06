const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["admin"],
    default: "admin"
  }
});

let theAdminModel = mongoose.model("MVPAdmin", userSchema);
export default theAdminModel;
