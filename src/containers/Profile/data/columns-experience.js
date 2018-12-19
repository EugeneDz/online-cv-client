import React from 'react';
import { Button } from 'antd';

const deleteExperienceRecord = id => {
  const deleteEvent = new CustomEvent('deleteExperienceRecord', { detail: id });

  dispatchEvent(deleteEvent);
};

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
      <Button type="default" icon="delete" onClick={() => deleteExperienceRecord(record.key)}>
        Delete
      </Button>
    )
  }
];
