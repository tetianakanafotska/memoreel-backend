const router = require('express').Router();
const Board = require('../models/Board.model.js');


// get all boards
router.get('/', (req, res, next) => {
	Board.find()
		.then((allBoards) => {
			res.status(200).json(allBoards);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Failed to fetch all the boards' });
		});
});


// post a new board
router.post('/', (req, res, next) => {
	Board.create(req.body)
		.then((createdBoard) => {
			res.status(201).json(createdBoard);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Failed to create a new board' });
		});
});


// get a single board
router.get('/:boardId', (req, res, next) => {
	const {boardId} = req.params

	Board.findById(boardId)
		.then((board) => {
			res.status(200).json(board);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Failed to fetch this board' });
		});
});


// edit a single board
router.patch('/:boardId', (req, res, next) => {
	const {boardId} = req.params

	Board.findByIdAndUpdate(
		boardId,  
		{ $set: { 'boardContent': req.body }},
		{ new: true, useFindAndModify: false }
	)
		.then((updatedBoard) => {
			res.status(204).json(updatedBoard);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Failed to update this board' });
		});
});


// delete a single board
router.delete('/:boardId', (req, res, next) => {
  const {boardId} = req.params

	Board.findByIdAndDelete(boardId)
		.then((result) => {
      res.status(204).send();
		})
		.catch((error) => {
			res.status(500).json({ error: 'Failed to delete this board' });
		});
});

module.exports = router;