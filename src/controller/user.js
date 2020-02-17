import routes from "../routes/routes";
import userModel from "../models/user";

export const getUserPolicy = routes(async (req, res) => {
  try {
    const userName = req.query;

    const policyModel = new userModel();

    const policy = policyModel.getUserPolicy(userName);
    console.log("response", policy);
  } catch {
    if (err) throw err;
    console.log("error", err);
  }
});
