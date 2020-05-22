const addCustomer = (req, res, db) => {
  const { email, password } = req.body;
  db.query(`select addCustomer('${email}','${password}')`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `${error}` });
      return;
    }
    res.status(200).json(results.rows[0]["addcustomer"]);
  });
};
const addDeliveryRider = (req, res, db) => {
  const { email, password } = req.body;
  db.query(`select addDeliveryRider('${email}','${password}')`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `${error}` });
      return;
    }
    res.status(200).json(results.rows[0]["adddeliveryrider"]);
  });
};
const addRestaurantStaff = (req, res, db) => {
  const { email, password, restaurantName } = req.body;
  db.query(
    `select addRestaurantStaff('${email}','${password}', '${restaurantName}')`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      res.status(200).json(results.rows[0]["addrestaurantstaff"]);
    },
  );
};
const addFdsManager = (req, res, db) => {
  const { email, password } = req.body;
  db.query(`select addFdsManager('${email}','${password}')`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `${error}` });
      return;
    }
    res.status(200).json(results.rows[0]["addfdsmanager"]);
  });
};

const validateEmail = (req, res, db) => {
  const { email, userType } = req.body;
  db.query(
    `with temp as (
            select uid, email, isActive
            from Users U join ${userType} M using (uid)
        )
        select * from temp T where T.email = '${email}' and isActive = True`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      if (results.rowCount > 0) res.status(200).json(results.rows[0]);
      else res.status(400).json({ error: "User Not Found" });
    },
  );
};

const validatePassword = (req, res, db) => {
  const { email, userType, password } = req.body;
  db.query(
    `with temp as (
            select *
            from Users U join ${userType} M using (uid)
        )
        select * from temp T where T.email = '${email}' AND isActive = True AND T.password = '${password}'`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      if (results.rowCount > 0) res.status(200).json(results.rows[0]);
      else res.status(400).json({ error: `Validation failed` });
    },
  );
};

const changePassword = (req, res, db) => {
  const { uid, newPassword } = req.body;
  db.query(
    `update users U
        set password = '${newPassword}'
        where U.uid = '${uid}'
        and isActive = True`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      res.status(200).json();
    },
  );
};

const changeCreditCard = (req, res, db) => {
  const { uid, newCreditCard } = req.body;
  db.query(
    `update customers U
        set creditcard = '${newCreditCard}'
        where U.uid = '${uid}'
        and (select isActive from Users where uid = '${uid}') = True`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      res.status(200).json();
    },
  );
};

const deleteUser = (req, res, db) => {
  const { uid } = req.body;
  db.query(
    `update users U set isActive=False
        where U.uid = '${uid}' and isActive = True`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
        return;
      }
      res.status(200).json();
    },
  );
};

module.exports = {
  addCustomer,
  addDeliveryRider,
  addRestaurantStaff,
  addFdsManager,
  validateEmail,
  validatePassword,
  changePassword,
  changeCreditCard,
  deleteUser,
};
