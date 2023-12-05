// TransactionHistory.js
import React, { useState, useEffect } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  // Giả sử có một hàm API để lấy dữ liệu lịch sử giao dịch
  const fetchTransactionHistory = async () => {
    try {
      // Gọi API để lấy dữ liệu lịch sử giao dịch
      const response = await fetch('http://localhost:3001/api/transaction-history');
      const data = await response.json();
  
      // Cập nhật state với dữ liệu mới
      setTransactions(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu lịch sử giao dịch', error);
    }
  };

  useEffect(() => {
    // Khi component được render, gọi hàm để lấy dữ liệu
    fetchTransactionHistory();
  }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render

  return (
    <div>
      <h1>Lịch Sử Giao Dịch</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <p>Ngày: {transaction.date}</p>
            <p>Số Tiền: {transaction.amount}</p>
            <p>Mô Tả: {transaction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
