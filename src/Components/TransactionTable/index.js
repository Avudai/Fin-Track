import React, { useState } from 'react'
import { Table, Select, Input } from "antd";
import "./style.css";
import { unparse, parse } from 'papaparse';
import { toast } from 'react-toastify';

function TransactionTable({ transactions, addTransaction, fetchTransactions }) {

  const { Search } = Input;
  const { Option } = Select;

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState("");

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const exportCSV = () => {
    const csv = unparse(transactions, { fields: ["name", "type", "date", "amount", "tag"] });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "transaction.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filterByName = transactions.filter((value) =>
    value.name.toLowerCase().includes(search.toLocaleLowerCase()) && value.type.toLowerCase().includes(typeFilter));

  return (
    <div class="transaction-table">
      <div className='table-header'>
        <div><h2>My Transactions</h2></div>
        <div className='actions'>
          <button className='btn btn-blue' onClick={exportCSV}> Export </button>
        </div>
      </div>

      <div className='search-section'>
        <Search className='search' type="text" value={search} placeholder='Search By Name'
          onChange={e => setSearch(e.target.value)}
        />

        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear>

          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <Table dataSource={filterByName} columns={columns} />
    </div>
  )
}

export default TransactionTable;