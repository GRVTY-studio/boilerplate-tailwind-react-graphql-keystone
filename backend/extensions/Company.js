const getIndustries = require('../controllers/getIndustries');

module.exports = () => ({
    types: [
        {
            type: 'type IndustriesOutput { industries: [String] }',
        },
    ],
    queries: [
        {
            schema: 'allIndustries: IndustriesOutput',
            resolver: getIndustries,
        },
    ],
});
