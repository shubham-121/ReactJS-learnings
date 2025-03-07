const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

app.use(express.json());

const usersDB = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    role: "admin",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    password: "securepass",
    role: "user",
  },
  {
    id: 3,
    username: "emily_watson",
    email: "emily@example.com",
    password: "watson321",
    role: "user",
  },
  {
    id: 4,
    username: "shubham bhatt",
    email: "shubham@gmail.com",
    password: "mike2024",
    role: "editor",
  },
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "index route",
  });
});

//user enter details in the form below

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  const user = { email, password }; //create user obj for signing jwt

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN); //sign the user

  res.status(200).json({
    user_access_token: accessToken,
    user_email: email,
  });

  //now the user will set the token locally in his app in a state
  //and then sends the further request along with the token to the protected routes

  console.log(email, password);
});

app.get("/user/profile", authenticateToken, (req, res) => {
  const user_token = req.user;
  console.log(user_token);

  const { email: user_email } = user_token;

  const reqdUser = usersDB.filter((user) => user.email === user_email);

  res.json({
    message: "user profile route",
    msg: "User is authenticated successfully",
    token: user_token,
    reqdUser: reqdUser,
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (!token)
    return res.status(401).json({
      message: "Access denied:No token provided",
    });

  //verify the user using jwt
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
  });

  next();
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// now for frontend:

// 1- store this token in a state : const [token, setToken] = useState(null); // Store token

// 2- for accessing the protected routes, send this token along with the prefix 'Bearer Your_Token', in the headers Option

// e.g :
//  const response = await fetch("http://localhost:3000/protected", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`, // Attach token here
//             "Content-Type": "application/json",
//         },
//     });

//3- if the token is undefined, redirect the user to the login route

//require("crypto").randomBytes(64).toString("hex") -> generates a random token string
