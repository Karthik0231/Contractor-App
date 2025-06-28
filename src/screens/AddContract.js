import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
      Alert.alert('Validation Error', 'Please enter contract name');
      return false;
    }
    if (!clientName.trim()) {
      Alert.alert('Validation Error', 'Please enter client name');
      return false;
    }
    if (!location.trim()) {
      Alert.alert('Validation Error', 'Please enter location');
      return false;
    }
    if (!budget.trim()) {
      Alert.alert('Validation Error', 'Please enter budget');
      return false;
    }
    if (endDate <= startDate) {
      Alert.alert('Validation Error', 'End date must be after start date');
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
      Alert.alert('Success', 'Contract added successfully!');
      
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: '#6200ea', 
          marginBottom: 12, 
          textAlign: 'center' 
        }}>
          Add New Contract
        </Text>
        <Text style={{ 
          color: '#666', 
          textAlign: 'center', 
          marginBottom: 24 
        }}>
          Fill in the details below to create a new contract record.
        </Text>

        {/* Contract Info */}
        <TextInput
          label="Contract Name"
          mode="outlined"
          value={contractName}
          onChangeText={setContractName}
          style={{ marginBottom: 16 }}
          theme={{ roundness: 20 }}
        />
        
        <TextInput
          label="Client Name"
          mode="outlined"
          value={clientName}
          onChangeText={setClientName}
          style={{ marginBottom: 16 }}
          theme={{ roundness: 20 }}
        />
        
        <TextInput
          label="Location"
          mode="outlined"
          value={location}
          onChangeText={setLocation}
          style={{ marginBottom: 16 }}
          theme={{ roundness: 20 }}
        />

        {/* Dates */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: 16 
        }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TouchableOpacity onPress={showStartDatePickerHandler}>
              <TextInput
                label="Start Date"
                mode="outlined"
                value={formatDate(startDate)}
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
                theme={{ roundness: 20 }}
              />
            </TouchableOpacity>
          </View>
          
          <View style={{ flex: 1, marginLeft: 8 }}>
            <TouchableOpacity onPress={showEndDatePickerHandler}>
              <TextInput
                label="End Date"
                mode="outlined"
                value={formatDate(endDate)}
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
                theme={{ roundness: 20 }}
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
          style={{ marginBottom: 16 }}
          theme={{ roundness: 20 }}
        />
        
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          style={{ marginBottom: 16 }}
          theme={{ roundness: 20 }}
        />

        {/* Image Section */}
        {photo && (
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
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
              style={{ marginTop: 8 }}
            >
              <Text style={{ color: '#ff4444', textAlign: 'center' }}>
                Remove Image
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Button
          icon="camera"
          mode="outlined"
          onPress={handleChoosePhoto}
          style={{ marginBottom: 24, borderRadius: 20 }}
        >
          {photo ? 'Change Image' : 'Upload Image'}
        </Button>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Button
            mode="contained"
            onPress={handleAddContract}
            style={{ 
              flex: 1, 
              backgroundColor: '#2e7d32',
              borderRadius: 20 
            }}
            contentStyle={{ paddingVertical: 12 }}
            labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
          >
            Add Contract
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}