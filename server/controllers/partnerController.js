import Partner from "../models/Partner.js";

// GET /api/partners
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: partners.length,
      data: partners,
    });
  } catch (error) {
    console.error("Get partners error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
    });
  }
};

// GET /api/partners/:partnerId
export const getPartnerById = async (req, res) => {
  try {
    const { partnerId } = req.params;

    console.log("Looking for partnerId:", partnerId);

    const partner = await Partner.findOne({ partnerId });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error("Get partner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch partner",
    });
  }
};

// POST /api/partners
export const createPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Partner created successfully",
      data: partner,
    });
  } catch (error) {
    console.error("Create partner error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};