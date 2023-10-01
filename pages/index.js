import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import Header from '@/components/Header';
import PeopleList from '@/components/PeopleList';
import Head from 'next/head';

const apiUrl = 'https://easymola.vercel.app'; // Update with your API URL

const Home = () => {
  const [people, setPeople] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // Add a refresh flag

  useEffect(() => {
    // Fetch the initial list of people when the component mounts
    fetchData();
  }, [refreshFlag]); // Include refreshFlag in the dependency array

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/submissions?refreshKey=${new Date().getTime()}` // Add a timestamp to ensure a fresh request
      );
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmission = () => {
    // After a successful submission, toggle the refresh flag
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="App">
      <Head>
        <title>EasyMola - Your Title</title>
        <meta name="description" content={`Why not earn money while going out of the hostel\nJust by getting something for your hostelmates`} />
        <meta property="og:title" content="EasyMola" />
        <meta property="og:description" content={`Why not earn money while going out of the hostel\nJust by getting something for your hostelmates`} />
        {/* <meta property="og:image" content="URL to Your OG Image" /> */}
      </Head>
      <Header />
      <Form onSubmission={handleSubmission} apiUrl={apiUrl} refreshFlag={refreshFlag} />

      {/* Pass the refresh flag to the PeopleList component */}
      <PeopleList people={people} apiUrl={apiUrl} refreshFlag={refreshFlag} />
    </div>
  );
};

export default Home;
