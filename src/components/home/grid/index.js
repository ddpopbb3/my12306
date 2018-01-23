import React from 'react';
import { Table } from 'antd';
import data from './data.json';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    {
      text: 'Male',
      value: 'male'
    },
    {
      text: 'Female',
      value: 'female'
    },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch(params = {}) {
    console.log('params:', params);
    this.setState({
      loading: true
    });
    const pCurrent = this.state.pagination.current || 0;
    const tableData = data.results.map((record) => {
      return Object.assign({}, record, {
        email: record.email + pCurrent
      });
    })
    setTimeout(() => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: tableData,
        pagination,
      });
    }, 1000)
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table columns={ columns } rowKey={ record => record.registered } dataSource={ this.state.data } pagination={ this.state.pagination } loading={ this.state.loading } onChange={ this.handleTableChange }
      />
    );
  }
}

export default App