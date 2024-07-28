import express, { response } from "express";
const Router = express.Router();
import { Book } from "../models/bookModel.js";

//POST route to add Books
Router.post("/",async(req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send all requires fields: title,author,publishYear",
            });
        }
        const data = req.body; //Assuming the request body contains the person data

        //Create a new Person document using the Mongoose model
        const newBook = new Book(data);

        //Save the new person to the database
        const response = await newBook.save();
        console.log("Data Saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//GET All Books
Router.get("/",async(req,res)=>{
    try{
        const data = await Book.find();
        console.log("Data Fetched");
        //Returning Response as object including data as well as length of data.
        res.status(200).json({
            count:data.length,
            datas:data
        });
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

//GET A BOOK BY ID
Router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await Book.findById(id);
        console.log("Data Fetched of Single Book");
        //Returning Response as object including data as well as length of data.
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})
//UPDATE BOOK BY ID
Router.put("/:id",async(req,res)=>{
    try{
        const bookId = req.params.id;
        const updatedBookData = req.body;

        const response = await Book.findByIdAndUpdate(bookId,updatedBookData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'Book Not Found'});
        }
        console.log("Data Updated Sucesfully")
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid Server Error'});
    }
})

//DELETE A BOOK BY ID
Router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({error:'Book Not Found'});
        }
        console.log('Data Deleted Successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
export default Router;