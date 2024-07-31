import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import Cards from '../Components/Cards';
import Header from "./../Components/Header";
import AddIncomeModal from "./../Components/Modals/addIncome";
import AddExpenseModal from "./../Components/Modals/addExpense";
import moment from "moment";
import { toast } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import TransactionTable from '../Components/TransactionTable';
import ChartComponent from '../Components/Charts';

function Dashboard() {
    const [user] = useAuthState(auth);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

    const [transactions, setTransactions] = useState([]);

    const [currentBalance, setCurrentBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);


    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        calculateBalance();
    }, [transactions]);

    const calculateBalance = () => {
        let incomeTotal = 0;
        let expensesTotal = 0;
    
        transactions.forEach((transaction) => {
          if (transaction.type === "income") {
            incomeTotal += transaction.amount;
          } else {
            expensesTotal += transaction.amount;
          }
        });
    
        setTotalIncome(incomeTotal);
        setTotalExpense(expensesTotal);
        setCurrentBalance(incomeTotal - expensesTotal);
    }

    const fetchTransactions = async () => {
        if (user) {
            console.log(user)
          const q = query(collection(db, `users/${user.uid}/transaction`));
          const querySnapshot = await getDocs(q);
          let transactionsArray = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc)
            transactionsArray.push(doc.data());
          });
          setTransactions(transactionsArray);
          toast.success("Transactions Fetched!");
          console.log(transactionsArray);
          calculateBalance();
        }
    }

    const showExpenseModal = () => {
        setIsExpenseModalVisible(true);
    }

    const showIncomeModal = () => {
        setIsIncomeModalVisible(true)
    }

    const handleExpenseCancel = () => {
        setIsExpenseModalVisible(false);
    }

    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false);
    }
    
    const onFinish = (values, type) => {
        console.log(values, type);
        let new_transaction = {
            type: type,
            name: values.name,
            date: values.date.format("YYYY/MM/DD"),
            tag: values.tag,
            amount: parseFloat(values.amount)
        }

        addTransaction(new_transaction);
    }

    const addTransaction = async (data) => {
        console.log(data)
        try {
             const createDoc = await addDoc(
                 collection(db, `users/${user.uid}/transaction`), data
             )
             toast.success("Added successfully");
             console.log(createDoc.id)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const sortedTransaction = transactions.sort((a, b) => {return new Date(a.date) - new Date(b.date)})

    return (
        <div>
            <Header />
            <Cards
                currentBalance={currentBalance}
                totalExpense={totalExpense}
                totalIncome={totalIncome}
                showIncomeModal={showIncomeModal}
                showExpenseModal={showExpenseModal} 
            />
           <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

         {transactions.length > 0 ? <ChartComponent sortedTransaction={sortedTransaction}/> : <></>}

          <TransactionTable transactions={transactions} 
          addTransaction={addTransaction} fetchTransactions={fetchTransactions}
          />
            
        </div>
    )
}

export default Dashboard;