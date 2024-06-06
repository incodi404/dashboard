import { Router } from "express";
import { filter, intensity, likelihood, relevance, filter_parameters } from "../controllers/dashboard.controllers.js";

const router = Router()

router.route("/intensity/:param/:part").get(intensity)
router.route("/likelihood/:param/:part").get(likelihood)
router.route("/relevance/:param/:part").get(relevance)

//filter

router.route("/all-filter-parameters").get(filter_parameters)

router.route("/filter/:param/:id/:filterParam/:part").get(filter)

export {router}