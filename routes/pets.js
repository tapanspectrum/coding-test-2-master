const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('pet name required'),
    age: Joi.number().integer().required().description('pet age required'),
    colour: Joi.string().required().description('pet colour required'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',  
  async (req, res, next) => {
    try { 
      console.log('-----')     
     let data = await Pet.find({});
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:name',  
  async (req, res, next) => {
    try {      
     let data = await Pet.remove({name:req.params.name});
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;