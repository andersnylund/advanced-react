import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  // manually upadte the chache on the lient, so it matches the server
  // 1. read the cache for the items we want
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  // 2. filter the delete item out of the page
  data.items = data.items.filter(
    item => item.id !== payload.data.deleteItem.id,
  );
  // 3. put the items back
  cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
};

const DeleteItem = ({ children, id }) => (
  <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={update}>
    {(deleteItemMutation, { error }) => (
      <button
        type="button"
        onClick={() => {
          if (confirm('Are you sure you want to delete this?')) {
            deleteItemMutation().catch(err => {
              alert(err.message);
            });
          }
        }}
      >
        {children}
      </button>
    )}
  </Mutation>
);

export default DeleteItem;
