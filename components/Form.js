import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ onSubmission, apiUrl, refreshFlag }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [charges, setCharges] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        from,
        to,
        charges: parseFloat(charges),
        phoneNumber,
      };

      await axios.post(`${apiUrl}/api/submissions`, formData);

      // Reset input fields
      setFrom('');
      setTo('');
      setCharges('');
      setPhoneNumber('');

      // Trigger the callback to fetch the updated list
      onSubmission();

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-box">
        <h2>I am going out</h2>
        <div className="input-row">
          <label className="label" htmlFor="from">
            From
          </label>
          <input
            className="input-field"
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="input-row">
          <label className="label" htmlFor="to">
            To
          </label>
          <input
            className="input-field"
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="input-row">
          <label className="label" htmlFor="charges">
            Charges
          </label>
          <input
            className="input-field"
            type="text"
            id="charges"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            required
          />
        </div>
        <div className="input-row">
          <label className="label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="input-field"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
