const Settings = require('../models/Settings');

const getHomepageSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({ name: 'homepage' });
        res.status(200).json(settings ? settings.config : null);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateHomepageSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ name: 'homepage' });
        if (!settings) {
            settings = new Settings({ name: 'homepage', config: req.body.config });
        } else {
            settings.config = req.body.config;
        }
        await settings.save();
        res.status(200).json({ success: true });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getHomepageSettings, updateHomepageSettings };