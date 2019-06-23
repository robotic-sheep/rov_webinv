module.exports = {
    getHomePage: (req, res) => {
	    res.render('index.ejs', {
		    title: 'VCS MATE ROV'
	    });
    },
    getInventoryPage: (req, res) => {
        let query = "SELECT * FROM `inventory` ORDER BY id ASC";
	// query database to get all the items

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('show-item.ejs', {
                title: 'VCS MATE ROV'
                ,items: result
            });
        });
    },
    getPurchasePage: (req, res) => {
	    res.render('purchase.ejs', {
		    title: 'VCS MATE ROV'
	    });
    },
    getCadPage: (req, res) => {
	    res.render('cad.ejs', {
		    title: 'VCS MATE ROV'
	    });
    },
    getAnalyticsPage: (req, res) => {
	    res.render('analytics.ejs', {
		    title: 'VCS MATE ROV'
	    });
    }
};
