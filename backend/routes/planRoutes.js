import express from "express";

import Plan from "../models/Plan.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/planner', authMiddleWare, async (req, res) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const places = req.body.planner;
        const newPlan = new Plan({name, places: places, user: req.user.id});
        await newPlan.save();
        res.status(200).json({ message: 'Planner data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving planner data', error });
    }
});
router.get('/planner', authMiddleWare, async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching planner data', error });
    }
});

export default router;
