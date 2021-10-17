const express = require('express');
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10000,
    host: 'localhost',
    user: 'root',
    password: 'Ramo0404',
    database: 'datas'
})

const ideas = (req, res) => {

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas", (err, data) => {
            if (err) throw err;
            res.render('home', { data })
        })
    })
}
const search = (req, res) => {
    
    const ideaData = req.body;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas WHERE idea LIKE ?",['%' + ideaData.search + '%'], (err, data) => {
            if (err) throw err;
            res.render('home', { data })
            console.log(ideaData.search);
        })
    })
}

const sortbycreate = (req, res) => {

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas ORDER BY dateCreated DESC", (err, data) => {
            if (err) throw err;
            res.render('home', { data })
        })
    })
}
const sortbyupdate = (req, res) => {
   
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas ORDER BY dateUpdated DESC", (err, data) => {
            if (err) throw err;
            res.render('home', { data })
        })
    })
}




const editidea = (req, res) => {

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas WHERE id=?", [req.params.id], (err, data) => {
            if (err) throw err;
            res.render('edit', { data })
        })

    })
}


const updateidea = (req, res) => {
    const ideaData = req.body;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        
        let sql = "UPDATE  ideas SET idea=?, details=?, dateUpdated=? WHERE id=?";
        connection.query(sql, [ideaData.idea, ideaData.details, new Date(), req.params.id], (err, data) => {
            if (!err) {
                pool.getConnection((error, connection) => {
                    if (error) throw error;
                    connection.query("SELECT * FROM ideas WHERE id=?", [req.params.id], (err, data) => {
                        if (err) throw err;
                        res.render('edit', { data, 
                        success: "succesfully updated" })
                    })

                })
            }
            else {
                console.log(err);
            }
        })
    })
}








const newidea = (req, res) => {
    res.render('new')
}

const savenewidea = (req, res) => {

    const ideaData = req.body;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        else {
            console.log('connect to database')
        }

        if (ideaData.idea === '' && ideaData.details === '') {
            res.render('new', {
                message: "idea and details cannot be empty"
            })
        } else {

            connection.query("INSERT INTO ideas SET idea=?, details=?, dateCreated=?, dateUpdated=?", [ideaData.idea, ideaData.details, new Date(), new Date()], (err, data) => {
                if (err) throw err;
                res.render('new', { success: "successfuly been saved" })
            })
        }


    })
}



// delete

const deleteideabyid = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("DELETE  FROM ideas WHERE id=?", [req.params.id], (err, data) => {
            connection.release()
            if (!err) {
                res.redirect('/')
            } else {
                console.log(err);
            }
        })

    })

}

module.exports = {
    ideas: ideas,
    editidea: editidea,
    newidea: newidea,
    savenewidea: savenewidea,
    deleteideabyid: deleteideabyid,
    updateidea: updateidea,
    sortbycreate: sortbycreate,
    sortbyupdate: sortbyupdate,
    search: search
}