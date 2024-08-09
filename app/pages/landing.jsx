import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import fetchUser from "../api/api.js"; // Import function to fetch user data
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../components/loading.jsx"; // Import custom loading component

const App = () => {
  // State to store user data
  const [users, setUsers] = useState([]);
  // State to keep track of the current user index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to manage image loading status
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      const data = await fetchUser(80); // Fetch 80 users
      setUsers(data); // Store fetched data in state
    };

    fetchData();
  }, []);

  // Function to handle the "Previous" button press
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous user
    }
  };

  // Function to handle the "Next" button press
  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next user
    }
  };

  // Show loading component if no users are available
  if (users.length === 0) {
    return <Loading />;
  }

  // Get the current user data based on the index
  const currentUser = users[currentIndex];

  return (
    <SafeAreaView className="flex flex-col min-h-screen items-center">
      {/* Background gradient for the entire screen */}
      <LinearGradient
        colors={["#030712", "#111827", "#1f2937", "#374151"]}
        start={{ x: 0.2, y: 0.3 }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <View className="flex flex-col items-center space-y-4 h-screen">
        {/* Header showing the current user number */}
        <Text className="text-white text-3xl font-bold">
          User {currentIndex + 1}
        </Text>

        {/* Container for the user's avatar */}
        <View className="rounded-full overflow-hidden m-2 shadow-lg shadow-slate-900 border-yellow-500 border-4">
          {/* Show a placeholder image while the actual image is loading */}
          {isImageLoading && (
            <Image
              source={require("../../assets/images/image.png")} // Placeholder image
              className="h-[100px] w-[100px] absolute"
            />
          )}
          {/* User's avatar */}
          <Image
            source={{ uri: currentUser.avatar }}
            className="h-[100px] w-[100px]"
            onLoadStart={() => setIsImageLoading(true)} // Set loading state when image starts loading
            onLoadEnd={() => setIsImageLoading(false)} // Reset loading state when image finishes loading
          />
        </View>

        {/* Display user details */}
        <Text className="text-zinc-950 text-xl rounded-full bg-yellow-500 px-2">
          Id: {currentUser.id}
        </Text>
        <Text className="text-zinc-950 text-xl rounded-full bg-yellow-500 px-2">
          @{currentUser.username}
        </Text>
        <View className="flex flex-col justify-center items-center space-y-4 text-xl rounded-2xl border-yellow-500 border-2 p-4 py-5">
          <Text className="text-white text-3xl">
            {currentUser.first_name} {currentUser.last_name}
          </Text>
          <Text className="text-black bg-yellow-500 px-3 py-2 rounded-full">
            UID: {currentUser.uid}
          </Text>
          <Text className="text-black bg-yellow-500 px-3 py-2 rounded-full">
            Email: {currentUser.email}
          </Text>
          <Text className="text-black bg-yellow-500 px-3 py-2 rounded-full">
            Password: {currentUser.password}
          </Text>
        </View>

        {/* Navigation buttons to switch between users */}
        <View className="absolute flex flex-row bottom-20 justify-around w-full items-center">
          <Button
            title="Previous"
            onPress={handlePrevious} // Handle button press
            disabled={currentIndex === 0} // Disable if on the first user
            color="#f59e0b"
          />
          <Button
            title="Next"
            onPress={handleNext} // Handle button press
            disabled={currentIndex === users.length - 1} // Disable if on the last user
            color="#f59e0b"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
