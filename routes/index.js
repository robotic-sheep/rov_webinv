module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `inventory` ORDER BY id ASC"; // query database to get all the items

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'VCS MATE ROV'
                ,items: result
            });
        });
    },
};
