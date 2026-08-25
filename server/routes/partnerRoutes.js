import express from "express";
import {
  getPartners,
  getPartnerById,
  createPartner,
} from "../controllers/partnerController.js";

const router = express.Router();

router.get("/", getPartners);

router.get("/:partnerId", getPartnerById);

router.post("/", createPartner);

export default router;