import express from 'express';
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
  res.send('User list');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User details for user ID: ${userId}`);
});

router.post('/', (req, res) => {
   // Logic to create a new user
  res.send('New user created');
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  // Logic to update user with userId
  res.send(`User with ID: ${userId} updated`);
});

export default router;