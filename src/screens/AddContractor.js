import React, { useState } from 'react'
import { View, Text, ScrollView,Image, Alert, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { ToastAndroid } from 'react-native';

export default function AddContractor() {
    const [contractName, setContractName] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [contractPhone, setContractPhone] = useState('');
    const[Company, setCompany] = useState('');
    const [Speciality, setSpeciality] = useState('');
    const [photo, setPhoto] = useState(null);

      const handleChoosePhoto = () => {
        const options = {
          mediaType: 'photo',
          maxWidth: 800,
          maxHeight: 800,
          quality: 0.8,
          includeBase64: false,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
            ToastAndroid.show('Failed to select image', ToastAndroid.SHORT);
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
            ToastAndroid.show(response.errorMessage, ToastAndroid.SHORT);
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            console.log('Selected image:', asset);
            setPhoto(asset.uri);
          }
        });
      };

      const handleSubmit = () => {
        // Handle form submission
        ToastAndroid.show('Contractor added successfully!', ToastAndroid.SHORT);
        console.log('Contractor Name:', contractName);
        console.log('Contractor Address:', contractAddress);
        console.log('Contractor Phone:', contractPhone);
        console.log('Contractor Company:', Company);
        console.log('Contractor Speciality:', Speciality);
        console.log('Contractor Photo:', photo);
      }
  return (
      <View className="flex-1 bg-white">
<ScrollView contentContainerStyle={{ padding: 16 }}>
  <Text className="text-3xl font-extrabold text-primary mb-2 text-center">
    Add New Contractor
  </Text>
  <Text className="text-gray-500 text-base text-center mb-6">
    Fill in the details below to create a new contractor record.
  </Text>

  {/* Contractor Name */}
  <TextInput
    label="Contractor Name"
    mode="outlined"
    value={contractName}
    onChangeText={setContractName}
    className="mb-4"
    outlineStyle={{ borderRadius: 16 }}
    style={{ backgroundColor: '#fff' }}
  />

  {/* Company / Trade */}
  <TextInput
    label="Company / Trade"
    mode="outlined"
    value={Company}
    onChangeText={setCompany}
    className="mb-4"
    outlineStyle={{ borderRadius: 16 }}
    style={{ backgroundColor: '#fff' }}
  />

  {/* Speciality */}
  <TextInput
    label="Speciality"
    mode="outlined"
    value={Speciality}
    onChangeText={setSpeciality}
    className="mb-4"
    outlineStyle={{ borderRadius: 16 }}
    style={{ backgroundColor: '#fff' }}
  />

  {/* Phone */}
  <TextInput
    label="Phone Number"
    mode="outlined"
    value={contractPhone}
    onChangeText={setContractPhone}
    className="mb-4"
    outlineStyle={{ borderRadius: 16 }}
    keyboardType="numeric"
    style={{ backgroundColor: '#fff' }}
  />

  {/* Address */}
  <TextInput
    label="Address"
    mode="outlined"
    value={contractAddress}
    onChangeText={setContractAddress}
    className="mb-4"
    outlineStyle={{ borderRadius: 16 }}
    style={{ backgroundColor: '#fff' }}
    multiline
    numberOfLines={3}
  />

  {/* Image Display */}
  {photo && (
    <View className="items-center mb-4">
      <Image
        source={{ uri: photo }}
        style={{
          width: 180,
          height: 180,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      />
      <TouchableOpacity onPress={() => setPhoto(null)} className="mt-2">
        <Text className="text-red-600 font-medium">Remove Image</Text>
      </TouchableOpacity>
    </View>
  )}

  {/* Upload Image Button */}
  <Button
    icon="camera"
    mode="outlined"
    onPress={handleChoosePhoto}
    className="mb-6"
    style={{
      borderRadius: 20,
      borderColor: '#3B82F6',
    }}
    labelStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
  >
    {photo ? 'Change Image' : 'Upload Image'}
  </Button>

  {/* Submit Button */}
  <View className="flex-row justify-center space-x-4">
    <Button
      icon="check"
      mode="contained"
      onPress={handleSubmit}
      className="flex-1 bg-green-700"
      style={{ borderRadius: 20 }}
      labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
      contentStyle={{ paddingVertical: 10 }}
    >
      Add Contractor
    </Button>
  </View>
</ScrollView>

        </View>
  )
}
