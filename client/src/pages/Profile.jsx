import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { blockOptions, eventOptions } from "../content/Options";
import "../styles.css";
import ProfileView from "../components/ProfileView";
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
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        setAuth(true);
        setSubmitted(true); // Assuming the profile is already created
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
    if (user.interested_in.length === 0) {
      toast.error("Please select at least one event");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Send data to backend
      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "profile/update",
          {
            name: user.name,
            email: user.email,
            Block: user.Block.value,
            interested_in: user.interested_in,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          toast.success("Profile created successfully!");
          setSubmitted(true);
        })
        .catch((error) => {
          console.error("Error creating profile: ", error);
          toast.error("Failed to create profile. Please try again later.");
        });
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleEventChange = (selectedOptions) => {
    const updatedEvents = selectedOptions.map((option) => option.value);
    setUser((prevUser) => ({ ...prevUser, interested_in: updatedEvents }));

    // Update backend
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
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating events: ", error);
        toast.error("Failed to update events. Please try again later.");
      });
  };

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
              {!submitted ? "MILAN" : "Your Profile"}
            </div>
            <div className="bg-[#D1CCB6] rounded-3xl w-full sm:w-3/4 md:w-1/2 lg:w-1/2 mx-auto overflow-y-auto h-[calc(100%-20px)]">
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
                <ProfileView
                  user={user}
                  onEdit={toggleEditMode}
                  isEditing={isEditing}
                  onEventChange={handleEventChange}
                />
              )}
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;