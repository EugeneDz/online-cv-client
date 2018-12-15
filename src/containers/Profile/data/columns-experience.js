import React from 'react';
import { Button } from 'antd';

export default [
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Years',
    dataIndex: 'years',
    key: 'years'
  },
  {
    title: '',
    key: 'action',
    align: 'right',
    render: record => (
      <Button type="default" icon="delete">
        Delete {record.key}
      </Button>
    )
  }
];
