const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, tier } = req.body; // Accept tier

        if (!["Platinum", "Gold", "Silver"].includes(tier)) {
            return res.status(400).json({ msg: "Invalid tier selection" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, tier }); // Store tier
        await user.save();

        res.json({ msg: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, tier: user.tier }, "secret", { expiresIn: "1h" });

        // Determine redirect URL based on tier
        let dashboardUrl = `/dashboard/${user.tier.toLowerCase()}`;

        res.json({ token, dashboardUrl, user: { id: user._id, name: user.name, email: user.email, tier: user.tier } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
