import protect from "../middlewares/authMiddleware.js"
import express from "express"
import {addIncome , deleteIncome , getIncomes} from "../controllers/incomeControllers.js"

const router = express.Router();

router.route("/")
    .get(protect  , getIncomes)
    .post(protect , addIncome);

router.delete("/:id" , protect , deleteIncome);



export default router;