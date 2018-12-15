import React from 'react';
import { Button } from 'antd';

export default [
  {
    title: 'School',
    dataIndex: 'school',
    key: 'school'
  },
  {
    title: 'Field of study',
    dataIndex: 'fieldofstudy',
    key: 'fieldofstudy'
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
