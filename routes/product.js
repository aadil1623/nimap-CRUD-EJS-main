const express = require("express");
const router = express.Router();
const product = require("../models/Product")
const paginatedResults = require("../middleware/pagination")




// Get all products
router.get("/",async(req, res) => {

    
         
            const page = parseInt(req.query.page)||parseInt(1);
            const limit = parseInt(10)
            
    
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
    
            const results = {}
    
            if (endIndex < await product.countDocuments().exec()) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
    
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.page = page;
            try {
                results.results = await product.find().populate("category").limit(limit).skip(startIndex).exec()
                res.paginatedResults = results
                // console.log(res.paginatedResults.results[0].category);
                res.render('products', {
                    foundData: res.paginatedResults,
                     page:req.query.page||1,
                     
                })      
            } catch (e) {
                res.status(500).json({ message: e.message })
            }
        
    
    
})



//Edit Product
router.get("/:id/edit", (req, res) => {
    product.findById(req.params.id, (err, foundData) => {
        if (!err) {
            console.log(foundData);
            res.render("editProduct", { foundData: foundData })   
        }
        else {
            console.log(err);
        }
    }).populate("category")
})


//Updating Product
router.put("/:id", (req, res) => {
     const data = { name: req.body.productName }

    product.findByIdAndUpdate(req.params.id, data, (err, foundData) => {
        if (!err) {
            res.redirect("/product");   
        }
        else {
            console.log(err); 
        }
    })
})


// Deleting Product
router.delete("/:id", (req, res) => {
    product.findByIdAndRemove(req.params.id, (err, foundData) => {
        if (!err) {
            res.redirect("/product")
        }
        else {
            console.log(err);
        }
    })
})

module.exports = router;