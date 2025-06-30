import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToastAndroid } from 'react-native';

export default function AddContract() {
  const [photo, setPhoto] = useState(null);
  const [contractName, setContractName] = useState('');
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  
  // Date picker states
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
        Alert.alert('Error', response.errorMessage || 'Failed to select image');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log('Selected image:', asset);
        setPhoto(asset.uri);
      }
    });
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const showStartDatePickerHandler = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerHandler = () => {
    setShowEndDatePicker(true);
  };

  const validateForm = () => {
    if (!contractName.trim()) {
    ToastAndroid.show('Please enter contract name', ToastAndroid.SHORT);
      return false;
    }
    if (!clientName.trim()) {
        ToastAndroid.show('Please enter client name', ToastAndroid.SHORT);
      return false;
    }
    if (!location.trim()) {
        ToastAndroid.show('Please enter location', ToastAndroid.SHORT);
      return false;
    }
    if (!budget.trim()) {
        ToastAndroid.show('Please enter budget', ToastAndroid.SHORT);
      return false;
    }
    if (endDate <= startDate) {
        ToastAndroid.show('End date must be after start date', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleAddContract = () => {
    if (validateForm()) {
      const contractData = {
        contractName,
        clientName,
        location,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        budget,
        description,
        photo,
        createdAt: new Date().toISOString(),
      };
      
      console.log('Contract Data:', contractData);
      ToastAndroid.show('Contract added successfully!', ToastAndroid.SHORT);
      
      // Reset form
      setContractName('');
      setClientName('');
      setLocation('');
      setStartDate(new Date());
      setEndDate(new Date());
      setBudget('');
      setDescription('');
      setPhoto(null);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold text-primary mb-3 text-center">
          Add New Contract
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Fill in the details below to create a new contract record.
        </Text>

        {/* Contract Info */}
        <TextInput
          label="Contract Name"
          mode="outlined"
          value={contractName}
          onChangeText={setContractName}
          className="mb-4"
          outlineStyle={{ borderRadius: 20 }}
        />
        
        <TextInput
          label="Client Name"
          mode="outlined"
          value={clientName}
          onChangeText={setClientName}
          className="mb-4"
          outlineStyle={{ borderRadius: 20 }}
        />
        
        <TextInput
          label="Location"
          mode="outlined"
          value={location}
          onChangeText={setLocation}
          className="mb-4"
          outlineStyle={{ borderRadius: 20 }}
        />

        {/* Dates */}
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <TouchableOpacity onPress={showStartDatePickerHandler}>
              <TextInput
                label="Start Date"
                mode="outlined"
                value={formatDate(startDate)}
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
                outlineStyle={{ borderRadius: 20 }}
              />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 ml-2">
            <TouchableOpacity onPress={showEndDatePickerHandler}>
              <TextInput
                label="End Date"
                mode="outlined"
                value={formatDate(endDate)}
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
                outlineStyle={{ borderRadius: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Pickers */}
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onStartDateChange}
            minimumDate={new Date()}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            testID="endDateTimePicker"
            value={endDate}
            mode="date"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onEndDateChange}
            minimumDate={startDate}
          />
        )}

        {/* Budget and Description */}
        <TextInput
          label="Budget (in ₹)"
          mode="outlined"
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
          className="mb-4"
          outlineStyle={{ borderRadius: 20 }}
        />
        
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          className="mb-4"
          outlineStyle={{ borderRadius: 20 }}
        />

        {/* Image Section */}
        {photo && (
          <View className="items-center mb-4">
            <Image
              source={{ uri: photo }}
              style={{ 
                width: 200, 
                height: 200, 
                borderRadius: 10,
                resizeMode: 'cover'
              }}
            />
            <TouchableOpacity 
              onPress={() => setPhoto(null)}
              className="mt-2"
            >
              <Text className="text-red-500 text-center">
                Remove Image
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Button
          icon="camera"
          mode="outlined"
          onPress={handleChoosePhoto}
          className="mb-6"
          style={{ borderRadius: 20 }}
        >
          {photo ? 'Change Image' : 'Upload Image'}
        </Button>

        {/* Action Buttons */}
        <View className="flex-row space-x-4 mt-4">
          <Button
            mode="contained"
            onPress={handleAddContract}
            className="flex-1 bg-green-700"
            contentStyle={{ paddingVertical: 12 }}
            labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
            style={{ borderRadius: 20 }}
          >
            Add Contract
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}