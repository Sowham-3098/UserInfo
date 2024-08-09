import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Loading = () => {
  return (
    <SafeAreaView className="flex flex-col min-h-screen items-center justify-center">
      <LinearGradient
        colors={["#030712", "#111827", "#1f2937", "#374151"]}
        start={{ x: 0.2, y: 0.3 }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <View className="flex flex-col items-center justify-center px-5 gap-4">
        <Text className="text-white text-2xl font-bold">
         User Information Loading
        </Text>
        <Text className="text-white text-2xl font-bold">
         Please wait...
        </Text>
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;
