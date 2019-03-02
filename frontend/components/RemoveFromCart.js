import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { string } from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

// This gets called as soon as we get a response back from the server
// after a mutation has been performed
const update = (cache, payload) => {
  // first read the cache
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  // remove that item from the cart
  const cartItemId = payload.data.removeFromCart.id;
  data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
  // write it back to the cache
  cache.writeQuery({ query: CURRENT_USER_QUERY, data });
};

const RemoveFromCart = ({ id }) => (
  <Mutation
    mutation={REMOVE_FROM_CART_MUTATION}
    variables={{ id }}
    update={update}
    optimisticResponse={{
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,
      },
    }}
  >
    {(removeMutation, { loading, error }) => (
      <BigButton
        disabled={loading}
        title="Delete Item"
        onClick={() => {
          removeMutation().catch(err => alert(err.message));
        }}
      >
        &times;
      </BigButton>
    )}
  </Mutation>
);

RemoveFromCart.propTypes = {
  id: string.isRequired,
};

export default RemoveFromCart;
