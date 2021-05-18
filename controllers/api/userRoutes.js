// data to create new user or login with auth
const router = require('express').Router();
const { User, Pet } = require('../../models');

// // shows all users
router.get('/', async (req, res) => {
    // find all users and associated pets
    try {
    const userData = await User.findAll({ 
        include: [
            { 
                model: Pet 
            }
        ] 
    });
    res.status(200).json(userData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
// find one user by id and associated pets
try {
    const userData = await User.findByPk(
        req.params.id, {
            include: [
                { 
                    model: Pet 
                }
            ] 
        }
    );

    if (!userData) {
    res.status(404).json({message: 'No user found with that ID!'});
    return;
    }
    res.status(200).json(userData);

}catch (err) {
    res.status(500).json(err);
}
});


// create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'New account created!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login with credentials
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name} });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Oops! Double check your credentials and try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Oops! Double check your credentials and try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Log in successfull!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
