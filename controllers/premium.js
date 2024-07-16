const User = require('../modles/user');
const Expense = require('../modles/expense');
const sequelize = require('../util/database');

exports.getUserLeaderboard = async (req, res, next) => {
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpense = {};
        // console.log(expenses);
        expenses.forEach((expense => {
            if(userAggregatedExpense[expense.userId]){
                userAggregatedExpense[expense.userId] = userAggregatedExpense[expense.userId] + expense.amount;
            }else{
                userAggregatedExpense[expense.userId] = expense.amount;
            }
        }))
        let userLeaderboardDetails = [];
        users.forEach((user) =>{
            userLeaderboardDetails.push({name: user.name, total_expense: userAggregatedExpense[user.id] });      
        })
        console.log(userLeaderboardDetails);
        userLeaderboardDetails.sort((a, b) => b.total_expense - a.total_expense);
        res.status(200).json(userLeaderboardDetails);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}