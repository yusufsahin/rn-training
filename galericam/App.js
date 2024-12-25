import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/provera/image/upload";
  const UPLOAD_PRESET = "galeri"; // Replace with your unsigned upload preset

  const handleImagePick = async () => {
    Alert.alert(
      "Choose an Option",
      "Would you like to use the Camera or pick from the Gallery?",
      [
        { text: "Camera", onPress: pickFromCamera },
        { text: "Gallery", onPress: pickFromGallery },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera access is required to use this feature."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert(
        "Permission Required",
        "Gallery access is required to use this feature."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async () => {
    if (!image) {
      Alert.alert("Error", "No image selected");
      return;
    }
  
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const data = await response.json(); // Correctly parse response
      if (data.secure_url) {
        Alert.alert("Upload Successful", `Image URL: ${data.secure_url}`);
      } else {
        Alert.alert("Upload Failed", "Something went wrong during the upload.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Open Camera or Gallery</Text>
      </TouchableOpacity>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={{ color: "gray", marginTop: 20 }}>No image selected</Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: image ? "#28a745" : "#ccc" }]}
        onPress={uploadToCloudinary}
        disabled={!image || uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Upload to Cloudinary</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
});
