const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET route to fetch all winners from database
router.get('/', (req, res) => {

    const query = `SELECT * FROM winners ORDER BY date DESC;`;

    pool
        .query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET all winners:', error);
            res.sendStatus(500);
        })
        
});

// POST route to insert new winner into database
router.post('/', (req, res) => {

    const handle = req.body.handle;
    const date = req.body.date;
    const query = `INSERT INTO winners (instagram, date) VALUES ($1, $2);`;

    pool
        .query(query, [handle, date])
        .then(() => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR in POST new winner:', error);
            res.sendStatus(500);
        });
});

// DELETE route to remove a winner from the database
router.delete('/:id', (req, res) => {

    const winnerId = req.params.id;
    const query = `DELETE FROM winners WHERE id = $1;`;

    pool
        .query(query, [winnerId])
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            console.log('ERROR in DELETE winner:', error);
            res.sendStatus(500);
        });
});

module.exports = router;