const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const env = require('dotenv');
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
env.config();

//query
const SELECT_ALL_USER = "SELECT * FROM s_user";
const SELECT_ALL_ADMIN = "SELECT * FROM s_admin";
const SELECT_ALL_PREMIUM_USER = "SELECT s_premium_user.*, s_user.user_name FROM s_premium_user LEFT JOIN s_user ON s_premium_user.user_id = s_user.user_id";
const SELECT_ALL_P_USER = "SELECT user_id FROM s_premium_user";
const SELECT_USERID_USER = 'SELECT user_id FROM s_user';
const DELETE_PREMIUM_USER = "DELETE FROM s_premium_user WHERE user_id = ?"
const INSERT_PREMIUM_USER = "INSERT INTO s_premium_user VALUES (null,?,'1',?,?,'N',null,'N','N','',null)"
const SELECT_ALL_U_CARD = 'SELECT * FROM u_card';
const SELECT_CARD_KEY = 'SELECT a_card_food.* FROM a_card_food INNER JOIN u_card ON a_card_food.user_id = u_card.user_id AND a_card_food.card_key = u_card.card_key'


//mariadb connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: 'date'
});

//check connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connect sprint db...");
});

app.listen("4000", () => {
  console.log("Server started on port 4000");
});

app.get("/", (req, res) => {
  db.query(SELECT_ALL_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/usercard", (req, res) => {
  db.query(SELECT_ALL_U_CARD, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/premiumuser", (req, res) => {
  db.query(SELECT_ALL_P_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/allpremiumuser", (req, res) => {
  db.query(SELECT_ALL_PREMIUM_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get('/userid', (req, res) => {
  db.query(SELECT_USERID_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      })
    }
  })
})

app.get("/admin", (req, res) => {
  db.query(SELECT_ALL_ADMIN, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        admin: results,
      });
    }
  });
});

app.get('/a_card_food', (req, res) => {
  db.query(SELECT_CARD_KEY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      })
    }
  })
})

app.post('/user/update/:user_id' , (req, res) => {
  const userId = req.params.user_id;
  let today = new Date();
  let nextDay = new Date();
  let nextMonth = new Date(nextDay.setMonth(nextDay.getMonth() + 1));


  db.query(INSERT_PREMIUM_USER, [userId, today, nextMonth], (err, result) => {
    if (err) {console.log(err)}
    else {
      console.log(result)
    }
  })
})

app.post('/evalu/update', (req,res) => {
  const userId = req.body.userId;
  const date = req.body.date;
  const evalGrade = req.body.evalGrade;
  const evalLength = req.body.evalLength;
  const writer = req.body.writer;
  const today = new Date();

  db.query('INSERT INTO a_manager_evaluation VALUES (NULL,?,?,NULL,?,?,?,"N",?)',[userId, date, today,evalGrade,evalLength, writer], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("values inserts")
    }
  })
})



app.delete('/user/delete/:user_id', (req, res) => {
  const user = req.params.user_id;
  
  db.query(DELETE_PREMIUM_USER, user, (err, result) => {
    if(err) console.log(err)
  })
})

app.get('/usercard/:user_id' , (req, res) => {
  const userId = req.params.user_id;

  db.query(`SELECT * FROM u_card WHERE user_id like '${userId}'`, (err, result) => {
    if (err) {console.log(err)} else {
      return res.json({
        data: result
      })
    }
  })
})

app.get('/a_card_food/:user_id' , (req, res) => {
  const userId = req.params.user_id;

  db.query(`SELECT a_card_food.*, a_food.* FROM a_card_food LEFT JOIN a_food ON a_card_food.food_key = a_food.food_key WHERE user_id like '${userId}'`, (err, result) => {
    if (err) {console.log(err)} else {
      return res.json({
        data: result
      })
    }
  })
})

app.get('/userinfo/:user_id', (req, res) => {
  const userId = req.params.user_id;

  db.query(`SELECT * FROM s_user WHERE user_id like '${userId}'`, (err, result) => {
    if (err) {console.log(err)} else {
      return res.json({
        data: result
      })
    }
  })
})

app.get('/manager_evaluation/:user_id', (req, res) => {
  const userId = req.params.user_id;

  db.query(`SELECT * FROM a_manager_evaluation WHERE user_id like '${userId}'`, (err, result) => {
    if (err) {console.log(err)} else {
      return res.json({
        data: result
      })
    }
  })


})

