import React, { useState } from 'react'
import { View, Text,TouchableOpacity, StatusBar, ToastAndroid, } from 'react-native'
import { TextInput, Card,Button,Avatar,FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigationWrapper from '../BottomNav'
import { FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Contractors() {
    const [searchQuery, setSearchQuery] = useState('');
const subcontractors = [
  {
    id: 1,
    name: 'Ravi Kumar',
    trade: 'Painting Contractor',
    company: 'Ravi Paint Works',
    profileImage: 'https://picsum.photos/200/200?random=1',
    location: 'Udupi, Karnataka',
    contact: '9876543210',
    lastProject: 'Green Heights Apartments, Manipal',
  },
  {
    id: 2,
    name: 'Sandeep Shetty',
    trade: 'Flooring Specialist',
    company: 'SS Flooring Experts',
    profileImage: 'https://picsum.photos/200/200?random=2',
    location: 'Mangalore, Karnataka',
    contact: '9123456789',
    lastProject: 'Blue Stone Villas, Mangalore',
  },
  {
    id: 3,
    name: 'Ganesh Hegde',
    trade: 'Transport Contractor',
    company: 'Hegde Transport Services',
    profileImage: 'https://picsum.photos/200/200?random=3',
    location: 'Shimoga, Karnataka',
    contact: '9988776655',
    lastProject: 'City Mall Construction, Udupi',
  },
  {
    id: 4,
    name: 'Pooja Nair',
    trade: 'Electrical Works',
    company: 'PN Electric Co.',
    profileImage: 'https://picsum.photos/200/200?random=4',
    location: 'Kundapura, Karnataka',
    contact: '9345671234',
    lastProject: 'Shree Residency, Kundapura',
  },
  {
    id: 5,
    name: 'Abdul Razak',
    trade: 'Plumbing Expert',
    company: 'AR Plumbing Works',
    profileImage: 'https://picsum.photos/200/200?random=5',
    location: 'Udupi, Karnataka',
    contact: '9001234567',
    lastProject: 'Nandan Tower, Udupi',
  },
  {
    id:6,
    name:'Smrithi M',
    trade:'Painting Contractor',
    company:'Smrithi Paint Works',
    profileImage:'https://picsum.photos/200/200?random=6',
    location:'Udupi, Karnataka',
    contact:'9876543210',
    lastProject:'Green Heights Apartments, Manipal' 
  }
];

const navigation = useNavigation();

    const filteredContractors = subcontractors.filter(contractor =>
        contractor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteContractor = (id) => {
      const index = subcontractors.findIndex(contractor => contractor.id === id);
      if (index !== -1) {
        subcontractors.splice(index, 1);
        ToastAndroid.show('Contractor deleted successfully!', ToastAndroid.SHORT);
      }
      };

  return (
        <BottomNavigationWrapper currentRoute="subcontractors">
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="grey" />
      
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-3xl font-bold text-white">
            Manage Contractors
          </Text>
          {/* <TouchableOpacity className="relative">
            <Icon name="notifications" size={24} color="white" />
            <View className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <Text className="text-blue-100 text-base font-medium">
            View and manage all contractors in one place
        </Text>
      </View>
            <View className="px-6 -mt-6 mb-5">
              <View className="flex-row items-center bg-white rounded-2xl px-4 shadow-lg border border-gray-100">
                <Icon name="search" size={24} color="#9CA3AF" />
                <TextInput
                  mode="flat"
                  placeholder="Search contractors..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 bg-transparent text-gray-700"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  placeholderTextColor="#9CA3AF"
                  contentStyle={{ 
                    paddingHorizontal: 12,
                    paddingVertical: 14,
                    fontSize: 16
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="clear" size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

        {/* Contractor List */}
        <FlatList
          data={filteredContractors}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
<View className="mx-4 my-3">
  <Card className="rounded-3xl border border-gray-200 bg-white shadow-md">
    <Card.Content>
      {/* Profile Header */}
      <View className="flex-row items-center mb-4">
        <Avatar.Image
          size={60}
          source={{ uri: item.profileImage }}
          style={{ marginRight: 16 }}
        />
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
          <Text className="text-sm text-blue-600 font-medium">{item.trade}</Text>
          <Text className="text-sm text-gray-500">{item.company}</Text>
        </View>

        {/* Icon-only Delete Button */}
        <TouchableOpacity
          onPress={() => handleDeleteContractor(item.id)}
          className="bg-red-100 p-2 rounded-full"
          style={{
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <Icon name="delete" size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View className="bg-gray-50 rounded-xl p-3 border border-gray-200">
        <Text className="text-sm text-gray-700 mb-1">
          📍 <Text className="font-medium">{item.location}</Text>
        </Text>
        <Text className="text-sm text-gray-700">
          📞 <Text className="font-medium">{item.contact}</Text>
        </Text>
      </View>
    </Card.Content>
  </Card>
</View>
          )}
        />
        {/* No Results Message */}
        {filteredContractors.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-lg">No contractors found</Text>
          </View>
        )}
      {/* Floating Action Button */}
      {/* <FAB
        icon="plus"
        onPress={() => navigation.navigate('AddContractor')}
        className="absolute bottom-6 right-6 bg-primary shadow-lg"
        color="white"
        style={{
          borderRadius: 28,
          elevation: 12,
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 12
        }}
      /> */}
      </View>
        </BottomNavigationWrapper>
    
  )
}

