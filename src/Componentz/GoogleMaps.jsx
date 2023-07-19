import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ token, username }) => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}api/cards`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
      });
  }, [token]);

  return <></>;
};

export default CreateEvent;
