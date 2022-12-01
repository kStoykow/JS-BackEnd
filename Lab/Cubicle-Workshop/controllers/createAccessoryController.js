const createAccessoryController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { createAccessory } = require('../services/accessoryService');
const { errorParser } = require('../utils/parser');

createAccessoryController.get('/', async (req, res) => res.render('accessory', { title: 'Create Accessory', user: req.user }));

createAccessoryController.post('/',
    body(['name', 'description', 'imageUrl']).trim(),
    body('name').notEmpty().withMessage('Name is required.'),
    body('description').isLength(5).withMessage('Description must be atleast 5 chars long.'),
    body('imageUrl').notEmpty().withMessage('ImageUrl is required.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const newAccesory = { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl };
            await createAccessory(newAccesory);

            res.redirect('/');

        } catch (error) {

            res.render('accessory', { title: 'Create Accessory', body: req.body, user: req.user, error: errorParser(error) });
        }
    });


module.exports = createAccessoryController;