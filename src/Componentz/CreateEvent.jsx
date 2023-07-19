import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ token, username }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  return (
    <>
      <p>hi</p>
    </>
  );
};

export default CreateEvent;
