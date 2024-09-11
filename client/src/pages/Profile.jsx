import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
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
        setAuth(true); // Set auth to true upon successful authentication
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
    <div className="mb-4">
      <label
        className="block text-[#1E1E1E] font-be-vietnam-pro font-[600] mb-2 text-left"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded-2xl w-full p-4 text-[#4D4D4D] font-be-vietnam-pro bg-[#D8DDFF] font-[500] leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
      />
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
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#4D4D4D",
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
      <div className="mb-4">
        <label
          className="block text-[#1E1E1E] font-[600] font-be-vietnam-pro mb-2 text-left"
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
    <div className="flex items-center justify-center mb-4">
      <button
        className="bg-[#8F33BA] text-[#D1CCB6] font-[700] font-montserrat py-4 px-20 rounded-xl focus:outline-none focus:shadow-outline mb-8 mt-6"
        type="submit"
      >
        Sign Up
      </button>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
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
              <div className="text-2xl py-6 px-6 text-white text-center font-[700] uppercase">
                {!submitted ? "MILAN" : "Your Profile has been created!"}
              </div>
              <div
                ref={formContainerRef}
                className="form-container bg-[#D1CCB6] rounded-3xl w-full sm:w-3/4 md:w-1/2 lg:w-1/2 mx-auto overflow-y-auto h-[calc(100%-20px)]"
              >
                {!submitted ? (
                  <form
                    className="py-4 px-6 space-y-6 rounded-2xl mx-auto"
                    onSubmit={handleSubmit}
                  >
                    <InputField
                      label="Name"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <InputField
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  <div className="py-10 px-10 space-y-6 md:w-4/5 lg:w-3/5 mx-auto">
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
                    <div className="mb-4">
                      <h3 className="text-lg font-[600] text-[#1E1E1E] mb-2 text-left font-be-vietnam-pro">Selected Block:</h3>
                      <div className="bg-gray-100 p-2 rounded">
                        {user.Block ? user.Block.label : 'None'}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-[600] text-[#1E1E1E] mb-2 text-left font-be-vietnam-pro">
                        Interested In:
                        <button
                          onClick={toggleEditMode}
                          className="ml-2 px-2 py-1 text-sm bg-[#8F33BA] text-[#D1CCB6] rounded"
                        >
                          {isEditing ? 'Save' : 'Edit'}
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
                        <div className="bg-gray-100 p-2 mb-10 rounded">
                          {selectedEvents.length > 0 ? (
                            <ul className="list-disc list-inside bg">
                              {selectedEvents.map(event => (
                                <li key={event.value}>{event.label}</li>
                              ))}
                            </ul>
                          ) : (
                            'None'
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
