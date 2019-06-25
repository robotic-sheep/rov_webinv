const fs = require('fs');

module.exports = {
    addItemPage: (req, res) => {
        res.render('add-item.ejs', {
            title: 'VCS MATE ROV'
            ,message: ''
        });
    },
    addItem: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let item_name = req.body.item_name;
        let category = req.body.category;
        let manufacture = req.body.manufacture;
        let model_number = req.body.model_number;
        let price = req.body.price;
	let count = req.body.count;
	let location = req.body.location;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = item_name + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `inventory` WHERE item_name = '" + item_name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Item already exists';
                res.render('add-item.ejs', {
                    message,
                    title: 'VCS MATE ROV'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the item's details to the database
                        let query = "INSERT INTO `inventory` (item_name, category, manufacture, model_number, price, count, location, image) VALUES ('" +
                            item_name + "', '" + category + "', '" + manufacture + "', '" + model_number + "', '" + price + "', '" + count + "',  '" + location + "', '" + image_name + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-item.ejs', {
                        message,
                        title: 'VCS MATE ROV'
                    });
                }
            }
        });
    },
    editItemPage: (req, res) => {
        let itemId = req.params.id;
        let query = "SELECT * FROM `inventory` WHERE id = '" + itemId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-item.ejs', {
                title: 'Edit  Item'
                ,item: result[0]
                ,message: ''
            });
        });
    },
    editItem: (req, res) => {
        let itemId = req.params.id;
        let item_name = req.body.item_name;
        let category = req.body.category;
        let manufacture = req.body.manufacture;
        let model_number = req.body.model_number;
        let price = req.body.price;
 	let count = req.body.count;
	let location = req.body.location;

        let query = "UPDATE `inventory` SET `item_name` = '" + item_name + "', `category` = '" + category + "', `manufacture` = '" + manufacture + "', `model_number` = '" + model_number + "' , `price` = '" + price + "' , `count` = '" + count + "' , `location` = '" + location + "'  WHERE `inventory`.`id` = '" + itemId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteItem: (req, res) => {
        let itemId = req.params.id;
        let getImageQuery = 'SELECT image from `inventory` WHERE id = "' + itemId + '"';
        let deleteUserQuery = 'DELETE FROM inventory WHERE id = "' + itemId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    },
    showItemPage: (req, res) => {
        let itemId = req.params.id;
        let query = "SELECT * FROM `inventory` WHERE id = '" + itemId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('show-item-detail.ejs', {
                title: 'Show  Item Detail'
                ,item: result[0]
                ,message: ''
            });
        });
    },
};
