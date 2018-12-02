import React from 'react';
import UpdateItem from '../components/UpdateItem';

const Update = ({ query }) => {
  const { id } = query;
  return (
    <div>
      <UpdateItem id={id} />
    </div>
  );
};

export default Update;
