// src/Page/menu/UserMenu.js
import React, { useEffect, useState } from 'react';
import fetchUtil from '../../Services/fetchutil';
import { showToast } from '../../components/Toast/ShowToast';
import './userMenu.css';

const UserMenu = ({ addToCart }) => {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUtil(`/menu/user?searchKey=${searchKey}`);
        setData(response.data);
      } catch (error) {
        showToast('Error fetching data', 'error');
      }
    };

    fetchData();
  }, [searchKey]);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };

  return (
    <div className="container-userMenu">
      <input
        type="text"
        placeholder="Search..."
        value={searchKey}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Day Time</th>
            <th>Acceptance Time</th>
            <th>Description</th>
            <th>Price</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.DayTime}</td>
              <td>{item.Acceptance_Time}</td>
              <td>{item.Description}</td>
              <td>{item.Price}</td>
              <td>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserMenu;
