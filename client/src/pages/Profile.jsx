import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { FaTimesCircle } from 'react-icons/fa';
import { blockOptions, eventOptions } from "../content/Options";
import "../styles.css";
import GoogleButton from "./Login";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    Block: null,
    interested_in: [],
  });
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formContainerRef = useRef(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "profile", {
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data.user;
        setUser({
          name: userData.displayName,
          email: userData.email,
          Block: userData.Block
            ? { value: userData.Block, label: userData.Block }
            : null,
          interested_in: userData.interested_in,
        });
        setSelectedEvents(
          userData.interested_in.map((event) => ({
            value: event,
            label: event,
          }))
        );
        setAuth(true);
      })
      .catch((error) => {
        console.error("Error fetching user details: ", error);
        toast.error("Failed to load profile data. Please try again later.");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1300);
      });
  }, []);

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      interested_in: selectedEvents.map((event) => event.value),
    }));
  }, [selectedEvents]);

  const validateForm = () => {
    if (!user.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!user.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!user.Block || !user.Block.value) {
      toast.error("Please select a block");
      return false;
    }
    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Profile updated successfully!");
      setSubmitted(true);
      setIsEditing(false);
    }
  };

  const handleSelectOpen = () => {
    if (formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current.scrollTop =
          formContainerRef.current.scrollHeight;
      }, 0);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      const updatedEvents = selectedEvents.map((event) => event.value);
      setUser((prevUser) => ({ ...prevUser, interested_in: updatedEvents }));

      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "profile/update",
          {
            interested_in: updatedEvents,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          toast.success("Events updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating events: ", error);
          toast.error("Failed to update events. Please try again later.");
        });
    }
    setIsEditing(!isEditing);
  };

  const handleEventChange = (selectedOptions) => {
    const uniqueOptions = selectedOptions.filter(
      (option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
    setSelectedEvents(uniqueOptions);
  };

  const InputField = ({
    label,
    id,
    type,
    placeholder,
    value,
    onChange,
    readOnly,
  }) => (
    <div className="mb-6 relative">
      <label
        className="block text-[#1E1E1E] font-be-vietnam-pro font-[600] mb-2 text-left w-full"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`shadow appearance-none border rounded-2xl w-full p-4 text-[#4D4D4D] font-be-vietnam-pro bg-[#D8DDFF] font-[500] leading-tight focus:outline-none focus:shadow-outline ${readOnly ? 'cursor-not-allowed' : ''
            }`}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={readOnly}
        />
        {readOnly && (
          <FaTimesCircle
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
            size={20}
          />
        )}
      </div>
    </div>
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#D8DDFF",
      borderColor: "#e2e8f0",
      padding: "8px",
      borderRadius: "1rem",
      boxShadow: "none",
      ":hover": {
        borderColor: "#cbd5e0",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#4D4D4D",
      textAlign: "left",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#4D4D4D",
      textAlign: "left",
    }),
    input: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      padding: "10px",
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
  };

  const SelectField = ({
    label,
    id,
    options,
    value,
    onChange,
    onMenuOpen,
    placeholder,
    isMulti,
  }) => {
    const selectedValues = Array.isArray(value) ? value : [];
    const updatedOptions = options.map((option) => ({
      ...option,
      isDisabled: selectedValues.some((v) => v.value === option.value),
    }));

    return (
      <div className="mb-6">
        <label
          className="block text-[#1E1E1E] font-[600] font-be-vietnam-pro mb-2 text-left w-full"
          htmlFor={id}
        >
          {label}
        </label>
        <Select
          styles={customStyles}
          id={id}
          options={updatedOptions}
          value={value}
          onChange={onChange}
          onMenuOpen={onMenuOpen}
          placeholder={placeholder}
          isMulti={isMulti}
        />
      </div>
    );
  };

  const SubmitButton = () => (
    <div className="flex items-center justify-center mb-6">
      <button
        className="bg-[#8F33BA] text-[#D1CCB6] font-[700] font-montserrat py-4 px-20 rounded-xl focus:outline-none focus:shadow-outline hover:bg-[#7a2a9e] transition duration-300 ease-in-out w-full"
        type="submit"
      >
        Sign Up
      </button>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      {!auth && (
        <div className="container mx-auto flex justify-center items-center min-h-[50vh]">
          <GoogleButton />
        </div>
      )}

      {auth && (
        <div className="container mx-auto px-4 mt-10 mb-20">
          <div className="bg-none shadow-lg rounded-lg overflow-hidden min-h-[600px] max-w-4xl mx-auto">
            <div className="text-2xl py-8 px-6 text-white text-center font-[700] uppercase">
              {!submitted ? "MILAN" : "Your Profile has been created!"}
            </div>
            <div
              ref={formContainerRef}
              className="form-container bg-[#D1CCB6] rounded-3xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto overflow-y-auto h-[calc(100%-20px)] px-6 py-8"
            >
              {!submitted ? (
                <form
                  className="space-y-6 rounded-2xl mx-auto"
                  onSubmit={handleSubmit}
                >
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={user.name}
                    onChange={() => { }}
                    readOnly={true}
                  />
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={() => { }}
                    readOnly={true}
                  />
                  <SelectField
                    label="Select Block:"
                    id="block"
                    options={blockOptions}
                    value={user.Block}
                    onChange={(selected) => setUser({ ...user, Block: selected })}
                    onMenuOpen={handleSelectOpen}
                    placeholder="Select a Block"
                  />
                  <SelectField
                    label="Select Events:"
                    id="event"
                    options={eventOptions}
                    value={selectedEvents}
                    onChange={handleEventChange}
                    onMenuOpen={handleSelectOpen}
                    placeholder="Select Events"
                    isMulti={true}
                  />
                  <SubmitButton />
                </form>
              ) : (
                <div className="space-y-6">
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    value={user.name}
                    readOnly={true}
                  />
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly={true}
                  />
                  <div className="mb-6">
                    <h3 className="text-lg font-[600] text-[#1E1E1E] mb-2 text-left font-be-vietnam-pro w-full">
                      Selected Block:
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      {user.Block ? user.Block.label : "None"}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-[600] text-[#1E1E1E] mb-2 text-left font-be-vietnam-pro w-full">
                      Interested In:
                      <button
                        onClick={toggleEditMode}
                        className="ml-2 px-4 py-2 text-sm bg-[#8F33BA] text-[#D1CCB6] rounded-lg hover:bg-[#7a2a9e] transition duration-300 ease-in-out"
                      >
                        {isEditing ? "Save" : "Edit"}
                      </button>
                    </h3>
                    {isEditing ? (
                      <SelectField
                        id="event"
                        options={eventOptions}
                        value={selectedEvents}
                        onChange={handleEventChange}
                        onMenuOpen={handleSelectOpen}
                        placeholder="Select Events"
                        isMulti={true}
                      />
                    ) : (
                      <div className="bg-gray-100 p-4 rounded-xl">
                        {selectedEvents.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {selectedEvents.map((event) => (
                              <li key={event.value} className="mb-1">{event.label}</li>
                            ))}
                          </ul>
                        ) : (
                          "None"
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      )}
    </>
  );
};

export default Profile;