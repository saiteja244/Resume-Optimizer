const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/resumeController");

router.post("/upload",       ctrl.uploadResume);
router.post("/:id/optimize", ctrl.optimizeResume);
router.get("/",              ctrl.getAllResumes);
router.get("/:id",           ctrl.getResume);

module.exports = router;