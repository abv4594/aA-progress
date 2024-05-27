// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const puppyId = req.params.puppyId;
    const puppy = await Puppy.findOne({where:{id: puppyId}});
    console.log(puppy);
    puppy.set(req.body);
    await puppy.save({fields: ['ageYrs', 'weightLbs', 'microchipped'] });
    await puppy.reload();
    res.json({
        message: `Successfully updated puppy with id ${puppyId}`,
        puppy: puppy
    });
})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const puppyToDelete = await Puppy.findOne({where: {id: req.params.puppyId}});
    puppyToDelete.destroy();
    res.json({
        message: `Puppy id ${req.params.puppyId} successfully deleted `,
        puppy: puppyToDelete
    })


})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}