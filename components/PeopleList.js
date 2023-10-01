import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeopleList = ({ apiUrl, refreshFlag }) => {
  const [people, setPeople] = useState([]);
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    // Fetch the list of people from the server API when refreshFlag changes
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/submissions?refreshKey=${new Date().getTime()}`
        );
        setPeople(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when refreshFlag changes
  }, [refreshFlag]);

  const handleCopyPhoneNumber = (phoneNumber) => {
    // Create a temporary input element to copy the phone number
    const tempInput = document.createElement('input');
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show a confirmation message or any other desired behavior
    setTooltipText('Phone number copied!');
    setTimeout(() => setTooltipText(''), 2000); // Clear the tooltip after 2 seconds
  };

  return (
    <div className="people-list">
      <h2>People Out of Hostel <span className='tagline2'>Order While Sitting in hostel</span></h2>
      {people.length === 0 ? (
        <div className="no-people-message">
          <p>No one is live right now.</p>
          <p>Feel free to check back later!</p>
        </div>
      ) : (
        people.map((person, index) => (
          <div key={index} className="person-item">
            <div className="person-text">
              {`${index + 1}. From ${person.from} to ${person.to} Charges Rs${person.charges}`}
            </div>
            <div
              className="phone-number"
              onClick={() => handleCopyPhoneNumber(person.phoneNumber)}
            >
              <div className='phoneFlex'>
                <div>
                  Phone: <span className='personPhone'> {person.phoneNumber}</span>
                  {tooltipText && <div className="tooltip">{tooltipText}</div>}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PeopleList;
