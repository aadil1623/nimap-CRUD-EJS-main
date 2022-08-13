const express = require("express");
const router = express.Router();
const category = require("../models/Category");
const product = require("../models/Product")
const paginatedResults = require("../middleware/pagination")


//Get all Category 


router.get("/", paginatedResults(category,category),async (req, res) => {
    
   await res.render('categories', {
        foundData: res.paginatedResults,
         page:req.query.page||1,
    })
    


        // View All products in a single category.
        router.get("/:id",  (req, res) => {
            category.findById(req.params.id, async(err, foundData) => {
                if (!err) {
                    console.log(foundData);
                await    res.render("category", { foundData: foundData })
                }
                else {
                    console.log(err);
                }
            }).populate('products');
        })

        //adding prod to category
        router.get("/:id/product/add", async(req, res) => {

            const data = req.params.id;
            category.findById(req.params.id, async(err, foundData) => {
                if (err) {
                    console.log(err);
                }
                else {
                 await res.render("addProduct", { foundData: foundData, data })
                }
            })
        })

    })

    //Creating Category
    router.get("/add", (req, res) => {
        res.render("addCategory");

    })

    //Creating Product for specific category
    router.post("/:id/product", (req, res) => {
        let id = req.params.id
        category.findById(id, (err, foundcategory) => {
            if (!err) {
                let catid = foundcategory._id;
                const data = { name: req.body.productName ,category:catid}
                product.create(data, async(err, foundproduct) => {
                    if (!err) {
                        foundcategory.products.push(foundproduct);
                        foundproduct.foundcategory = foundcategory;
                        foundcategory.save();
                     await   res.redirect("/category/" + id)
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else {
                console.log(err);
            }
        })

    })

    //Creating category
    router.post("/", (req, res) => {
        const data = { name: req.body.categoryName };

        category.create(data,async (err, data) => {
            if (!err) {
             await   res.redirect("/category");
            }
            else {
                console.log(err);
            }
        })
    })

    //Update Category
    router.get("/:id/edit", (req, res) => {
        category.findById(req.params.id,async (err, foundData) => {
            if (!err) {
             await res.render("editCategory", { foundData: foundData })
            }
            else {
                console.log(err);
            }
        })
    })



    //Updating Category
    router.put("/:id", (req, res) => {
        const data = { name: req.body.categoryName };

        category.findByIdAndUpdate(req.params.id, data,async (err, foundData) => {
            if (!err) {
             await res.redirect("/category");
            }
            else {
                console.log(err);
            }
        })
    })



    //Deleting Category
    router.delete("/:id",  (req, res) => {
        category.findByIdAndDelete(req.params.id, async(err, foundData) => {
            if (!err) {
             await res.redirect("/category")
            }
            else {
                console.log(err);
            }
        })
    })

    

    module.exports = router;