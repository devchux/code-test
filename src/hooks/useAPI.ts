import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { HandleLoginInputChangeFuncType, LoginInputState, Task } from '../types';
import { useSelector, actions, useDispatch } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const [loginInputs, setLoginInputs] = useState<LoginInputState>({
    email: '',
    password: ''
  });

  const handleLoginInputChange: HandleLoginInputChangeFuncType = (type, value) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [type]: value
    }));
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(loginInputs)
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }
      const data = await response.json();
      toast(`Login Successful as ${data.user}`, { type: 'success' });
    } catch (error) {
      console.log(error);

      toast(`API request failed: ${error.message}`, { type: 'error' });
    }
  };

  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const getTransactions = useCallback(async (pageNumber): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions?page=${pageNumber || 0}`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include'
        }
      );

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const deleteTransactions = async (id: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/delete/${id} `, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }
      const data = await response.json();
      const newTransactions = Object.keys(transactions)
        .filter((key) => key !== data.id)
        .reduce((obj: any, key) => {
          obj[key] = transactions[key];
          return obj;
        }, {});
      dispatch(actions.addTransactions({ transactions: newTransactions }));
      toast(`Delete Successful`, { type: 'success' });
    } catch (error) {
      console.log(error);

      toast(`API request failed: ${error.message}`, { type: 'error' });
    }
  };

  return {
    getTasks,
    loginInputs,
    handleLoginInputChange,
    handleLoginSubmit,
    getTransactions,
    deleteTransactions
  };
};

export default useAPI;
