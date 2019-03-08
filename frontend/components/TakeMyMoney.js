import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

const totalItems = cart =>
  cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

const onToken = async (res, createOrderMutation) => {
  const order = await createOrderMutation({
    variables: {
      token: res.id,
    },
  }).catch(err => alert(err.message));
};

const TakeMyMoney = props => (
  <User>
    {({ data: { me } }) => (
      <Mutation
        mutation={CREATE_ORDER_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {createOrderMutation => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(me.cart)} items`}
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_m2IYOcqCjXJr8mOVrEsTDZ96"
            currency="USD"
            email={me.email}
            token={res => onToken(res, createOrderMutation)}
          >
            {props.children}
          </StripeCheckout>
        )}
      </Mutation>
    )}
  </User>
);

export default TakeMyMoney;
