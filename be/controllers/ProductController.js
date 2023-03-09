import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({ 
            where: { 
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createProduct = async(req, res) => {
    
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
    console.log(req)
    const name = req.body.title;
    const file = req.files.file;
    const filesize = file.data.length;
    const ext = path.extname(file.name);
    const filename = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/img/${filename}`;
    const allowedType = ['.png', '.jpeg', '.jpg'];
    
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Image Only"});

    if(filesize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/img/${filename}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({
                name: name,
                image: filename,
                url: url
            });
            res.status(200).json({msg: "Product Saved"});
        } catch (error) {
            console.log(error.message);
        }
    });
    res.status(201).json({msg: "Product Saved"});
}

export const updateProduct = async(req, res) => {
    try {
        await Product.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({msg: "Product Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "No data found"});

        const filepath = `./public/img/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {id: req.params.id}
        })
         
        res.status(201).json({msg: "Product Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

