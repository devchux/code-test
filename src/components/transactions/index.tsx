import React, { useEffect } from 'react';
import { useSelector, actions, useDispatch } from '../../store';
import useQuery from '../../hooks/useQuery';
import useAPI from '../../hooks/useAPI';
import './transactions.scss';

const Transactions = () => {
  const { getTransactions, deleteTransactions } = useAPI();
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    getTransactions(query.page).then((new_transactions) => {
      dispatch(actions.addTransactions({ transactions: { ...new_transactions, ...transactions } }));
    });
  }, [getTransactions, dispatch, query.page]);

  return (
    <div className="transaction-page">
      <div className="add-more-btn-wrapper">
        <button
          type="button"
          onClick={() => {
            setQuery({ page: query.page ? parseInt(query.page) + 1 : 1 });
          }}
        >
          More
        </button>
      </div>
      <div className="table-wrapper">
        {Object.values(transactions).length ? (
          <table>
            <thead>
              <tr>
                <th>Delete</th>
                {Object.keys(Object.values(transactions)[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(transactions).map((transaction) => (
                <tr key={transaction.id}>
                  <td className="delete-td">
                    <button type="button" onClick={() => deleteTransactions(transaction.id)}>
                      Delete
                    </button>
                  </td>
                  {Object.values(transaction).map((key) => (
                    <td key={key}>{key}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          'No transactions yet'
        )}
      </div>
    </div>
  );
};

export default Transactions;
