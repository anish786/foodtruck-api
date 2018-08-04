import mongoose from 'mongoose';
import { Router } from 'express';
import Foodtruck from '../model/foodtruck';

export default({ config, db }) => {
  let api = Router();


  // '/v1/foodtruck/add'
  api.post('/add', (req, res) => {
    let newFoodT = new Foodtruck();
    newFoodT.name = req.body.name;
    newFoodT.foodtype = req.body.foodtype;
    newFoodT.avgcost = req.body.avgcost;
    newFoodT.geometry.coordinates = req.body.geometry.coordinates;

    newFoodT.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Foodtruck saved successfully'});
    });
  });

  // '/v1/foodtruck/'
  api.get('/', (req,res) => {
    //find all foodtruck in db
    Foodtruck.find({}, (err, foodtrucks) => {
      if(err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // 'v1/foodtruck/:id'
  api.get('/:id', (req,res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if(err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // 'v1/foodtruck/:id'
  api.put('/:id', (req,res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if(err) {
        res.send(err);
      }
      foodtruck.name = req.body.name;
      foodtruck.save(err => {
        if(err) {
          res.send(err);
        }
        res.json({message: "Foodtruck info updated"});
      });
    });
  });

  // 'v1/foodtruck/:id'
  api.delete('/:id', (req, res) => {
    Foodtruck.remove({
      _id: req.params.id
    }, (err, foodtruck) => {
      if(err) {
        res.send(err);
      }
      res.json({message: "Foodtruck successfully deleted!"});
    });
  });

  // add review for a specific foodtruck id
  // 'v1/foodtruck/reviews/add/:id'
  api.post('reviews/add/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if(err) {
        res.send(err);
      }
      let newReview = new Review();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReivew.foodtruck = foodtruck._id
      newReview.save((err, review) => {
        if(err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReivew);
        foodtruck.save(err => {
          if(err) {
            res.send(err);
          }
          res.json({message: "Food truck review saved!"});
        });
      });
    });
  });
  return api;
}
