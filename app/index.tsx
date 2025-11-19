import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Tests from "./components/Tests";
import Toast from "react-native-toast-message";
import { toastConfig } from "./Data/toastConfig";

export default function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar Value={searchText} onChangeText={setSearchText}/>

        {/* Carousel */}
        <Carousel />

        {/* Test Categories */}
        <Tests searchText={searchText}/>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollView: {
    flex: 1,
  },
  spacer: {
    height: 20,
  },
});
