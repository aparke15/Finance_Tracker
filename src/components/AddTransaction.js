import {
  Button,
  Dialog,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { date } from "yup";
import { GlobalContext } from "../context/GlobalState";

const initialTxnState = {
  decsription: "",
  category: "Groceries/Household Needs",
  amount: 0,
  date: "",
};

const useStyles = makeStyles(() => ({
  txnBtn: {
    cursor: "pointer",
    backgroundColor: "#dedede",
    color: "#232323",
    border: "0",
    display: "flex",
    fontSize: "16px",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
  },
  form: {
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
    width: "500px",
    textAlign: "left",
    color: "white",
  },
}));

export const AddTransaction = (props) => {
  const classes = useStyles();
  const [addTxn, setAddTxn] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Groceries/Household Needs");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const { currentUser, addTransaction } = useContext(GlobalContext);
  const inputRef = useRef();

  const theDate = new Date();
  const today = `${theDate.getFullYear().toString()}-${(theDate.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${theDate.getDate().toString().padStart(2, 0)}`;

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      user: currentUser[0].email,
      description: description,
      category: category,
      amount: +amount,
      date: date,
    };

    await addTransaction(newTransaction);
    refresh();
  };

  const handleClose = () => setAddTxn(false);
  const handleOpen = () => setAddTxn(true);

  const refresh = () => {
    setDescription("");
    setAmount(0);
    inputRef.current.focus();
  };

  return (
    <>
      <Button className="btn" onClick={handleOpen}>
        Add Transaction
      </Button>
      <Dialog open={addTxn} onClose={handleClose}>
        <div
          style={{
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // backgroundColor: "#dedede",
          }}
        >
          <h4>Add new transaction</h4>
          <div className={classes.form}>
            <Formik
              validateOnChange={true}
              initialValues={{ ...initialTxnState }}
              onSubmit={(e) => onSubmit(e)}
              style={{ color: "#fff" }}
            >
              {({ values, errors, isSubmitting }) => (
                <Form style={{ color: "#fff" }}>
                  <div className="form">
                    <InputLabel htmlFor="date">Date</InputLabel>
                    <TextField
                      fullWidth
                      type="date"
                      value={values.date || today}
                      variant="outlined"
                      onChange={(e) => {
                        setDate(e.target.value);
                        values.date = e.target.value;
                      }}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <TextField
                      fullWidth
                      name="category"
                      value={values.category}
                      variant="outlined"
                      onChange={(e) => {
                        setCategory(e.target.value);
                        values.category = e.target.value;
                      }}
                      select
                    >
                      <MenuItem value={`Rent`}>Rent</MenuItem>
                      <MenuItem value={"Groceries/Household Needs"}>
                        Groceries/Household Needs
                      </MenuItem>
                      <MenuItem value={`Gas`}>Gas</MenuItem>
                      <MenuItem value={`Household Bill (Needs)`}>
                        Household Bill (Needs)
                      </MenuItem>
                      <MenuItem value={`Household Bill (Wants)`}>
                        Household Bill (Wants)
                      </MenuItem>
                      <MenuItem value={`Student Loans`}>Student Loans</MenuItem>
                      <MenuItem value={`Investments`}>Investments</MenuItem>
                      <MenuItem value={`Spending/Eating Out`}>
                        Spending/Eating Out
                      </MenuItem>
                      <MenuItem value={`Credit Payment`}>
                        Credit Payment
                      </MenuItem>
                      <MenuItem value={`Transfer`}>Transfer</MenuItem>
                    </TextField>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <TextField
                      fullWidth
                      type="number"
                      value={amount}
                      variant="outlined"
                      placeholder="Enter amount..."
                      onChange={(e) => {
                        setAmount(e.target.value);
                        values.amount = e.target.value;
                      }}
                    />
                    <InputLabel htmlFor="description"></InputLabel>
                    <TextField
                      style={{ color: "#ffffff" }}
                      fullWidth
                      name="description"
                      type="text"
                      placeholder="Enter description..."
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={(e) => {
                        setDescription(e.target.value);
                        values.decsription = e.target.value;
                      }}
                    />
                    <Button
                      fullwidth="true"
                      className={classes.txnBtn}
                      type="submit"
                    >
                      Add transaction
                    </Button>
                    <Button
                      fullwidth="true"
                      className={classes.txnBtn}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Dialog>
    </>
  );
};
