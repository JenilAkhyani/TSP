const {
  insertProvider,
  insertContact,
  checkProvider,
  insertUser,
  insertUserContact,
  checkUser,
} = require("./auth.db");
const { sendResponse } = require("../services/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;

const providerSignup = async (req, resp) => {
  const { name, email, pass, number, address } = req.body;

  const returnResponse = [];

  const hashedpass = await bcrypt.hash(pass, saltRounds);

  //console.log('Hashed Password:', hashedpass);
  const obj = { name: name, pass: hashedpass, kyc_status: "Y" };

  try {
    // Insert into provider_table
    const result = await insertProvider(obj);
    returnResponse.push(result);

    const pid = result.insertId;

    // Insert into p_contact table
    if (email) {
      const contact = { Provider_ID: pid, type: "email", information: email };
      const emailResult = await insertContact(contact);
      returnResponse.push(emailResult);
    }

    if (number) {
      const contact = { Provider_ID: pid, type: "number", information: number };
      const numberResult = await insertContact(contact);
      returnResponse.push(numberResult);
    }

    if (address) {
      const contact = {
        Provider_ID: pid,
        type: "address",
        information: address,
      };
      const addressResult = await insertContact(contact);
      returnResponse.push(addressResult);
    }

    sendResponse(resp, 1, 200, "Successfully registered", returnResponse);
  } catch (err) {
    sendResponse(resp, 0, 500, "Error", err);
  }
};

const providerLogin = async (req, resp) => {
  const { email, pass } = req.body;
  try {
    const result = await checkProvider(email);
    if (result == 0) {
      sendResponse(resp, 0, 404, "Provider not found", null);
    } else {
      const fetchedpass = await bcrypt.compare(pass, result[0].Pass);
      if (!fetchedpass) {
        console.log("Your password is incorrect");
        resp.status(401).send("Invalid Credentials");
      } else {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
        sendResponse(resp, 1, 200, "Provider Login Succesfully", {token,email});
      }
    }
  } catch (err) {
    sendResponse(resp, 0, 500, "Error", err);
  }
};

const userSignup = async (req, resp) => {
  const { name, email, pass, number, address } = req.body;

  const returnResponse = [];

  const hashedpass = await bcrypt.hash(pass, saltRounds);

  console.log("Hashed Password:", hashedpass);

  const obj = { name: name, pass: hashedpass };

  try {
    // Insert into provider_table
    const result = await insertUser(obj);
    returnResponse.push(result);

    const pid = result.insertId;

    // Insert into p_contact table
    if (email) {
      const contact = { User_ID: pid, type: "email", information: email };
      const emailResult = await insertUserContact(contact);
      returnResponse.push(emailResult);
    }

    if (number) {
      const contact = { User_ID: pid, type: "number", information: number };
      const numberResult = await insertUserContact(contact);
      returnResponse.push(numberResult);
    }

    if (address) {
      const contact = { User_ID: pid, type: "address", information: address };
      const addressResult = await insertUserContact(contact);
      returnResponse.push(addressResult);
    }

    // Send the response after all queries are
    console.log(returnResponse);
    sendResponse(resp, 1, 200, "User Signup Succesfully", returnResponse);
  } catch (err) {
    sendResponse(resp, 0, 500, "Error", err);
  }
};

const userLogin = async (req, resp) => {
  const { email, pass } = req.body;

  try {
    const result = await checkUser(email);
    console.log(result);
    if (result === 0) {
      console.log("jij");
      sendResponse(resp, 0, 404, "User not found", null);
    } else {
      const fetchedpass = await bcrypt.compare(pass, result[0].Pass);
      if (!fetchedpass) {
        console.log("Your password is incorrect");
        resp.status(401).send("Invalid Credentials");
      } else {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
        sendResponse(resp, 1, 200, "User Login Succesfulyy", {token,email});
      }
    }
  } catch (err) {
    sendResponse(resp, 0, 500, "Error", err);
  }
};

module.exports = { providerSignup, providerLogin, userSignup, userLogin };
