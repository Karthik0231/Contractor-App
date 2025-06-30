import React, { useState, useEffect } from 'react';
import { View, Platform, Animated, TouchableOpacity } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigationWrapper = ({ children, currentRoute = 'home' }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(getIndexFromRoute(currentRoute));
  const [animations] = useState(Array.from({ length: 4 }, () => new Animated.Value(0)));

  const routes = [
    {
      key: 'home',
      title: 'Dashboard',
      focusedIcon: 'view-dashboard',
      unfocusedIcon: 'view-dashboard-outline',
      color: '#6366f1',
    },
    {
      key: 'contracts',
      title: 'Projects',
      focusedIcon: 'briefcase',
      unfocusedIcon: 'briefcase-outline',
      color: '#059669',
    },
    {
      key: 'subcontractors',
      title: 'Contractors',
      focusedIcon: 'account-supervisor',
      unfocusedIcon: 'account-supervisor-outline',
      color: '#dc2626',
    },
    {
      key: 'reports',
      title: 'Reports',
      focusedIcon: 'chart-line',
      unfocusedIcon: 'chart-line-variant',
      color: '#7c3aed',
    },
  ];

  useEffect(() => {
    const newIndex = getIndexFromRoute(currentRoute);
    if (newIndex !== index) {
      setIndex(newIndex);
      animateTab(newIndex);
    }
  }, [currentRoute]);

  useEffect(() => {
    animateTab(index);
  }, []);

  function getIndexFromRoute(routeName) {
    const routeMap = {
      'home': 0,
      'dashboard': 0,
      'contracts': 1,
      'projects': 1,
      'subcontractors': 2,
      'contractors': 2,
      'reports': 3,
      'analytics': 3,
    };
    return routeMap[routeName.toLowerCase()] || 0;
  }

  const animateTab = (tabIndex) => {
    animations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === tabIndex ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleTabPress = (newIndex) => {
    if (newIndex === index) return;

    setIndex(newIndex);
    animateTab(newIndex);

    const route = routes[newIndex];
    switch (route.key) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'contracts':
        navigation.navigate('Contracts');
        break;
      case 'subcontractors':
        navigation.navigate('Contractors');
        break;
      case 'reports':
        navigation.navigate('Reports');
        break;
    }
  };

  const renderTabItem = (route, tabIndex) => {
    const isActive = index === tabIndex;
    const animation = animations[tabIndex];

    const iconScale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    });

    const labelOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1],
    });

    return (
      <TouchableOpacity
        key={route.key}
        className="flex-1 items-center justify-center py-2 px-1"
        onPress={() => handleTabPress(tabIndex)}
        activeOpacity={0.7}
      >
        <View className="items-center justify-center relative">
          <Animated.View
            className="mb-1"
            style={{
              transform: [{ scale: iconScale }],
            }}
          >
            <Icon
              name={isActive ? route.focusedIcon : route.unfocusedIcon}
              size={24}
              color={isActive ? route.color : '#6b7280'}
            />
          </Animated.View>
          <Animated.Text
            className="text-xs text-center mt-0.5 tracking-wide"
            style={{
              color: isActive ? route.color : '#6b7280',
              opacity: labelOpacity,
              fontWeight: isActive ? '600' : '500',
            }}
          >
            {route.title}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showFab = routes[index].key === 'contracts' || routes[index].key === 'subcontractors';
  const handleFabPress = () => {
    if (routes[index].key === 'contracts') {
      navigation.navigate('AddContract');
    } else if (routes[index].key === 'subcontractors') {
      navigation.navigate('AddContractor');
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Page Content */}
      <View className="flex-1" style={{ paddingBottom: 100 + insets.bottom }}>
        {children}
      </View>

      {/* FAB */}
      {showFab && (
<View className="absolute self-center bottom-16 z-50 items-center justify-center">
  {/* Outer circular background container for margin + shadow */}
  <View className="w-20 h-16 rounded-full shadow-2xl items-center justify-center">
    <FAB
      icon="plus"
      onPress={handleFabPress}
      color="white"
      className="bg-blue-600"
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        elevation: 0, // Let outer shadow show clearly
      }}
    />
  </View>
</View>
      )}

      {/* Bottom Bar */}
      <View
        className="absolute bottom-0 left-4 right-4 h-20 rounded-3xl mb-2 overflow-hidden bg-white shadow-xl"
        style={{
          paddingBottom: insets.bottom,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: {
              elevation: 12,
            },
          }),
        }}
      >
        <View className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
        <View className="flex-row justify-around items-center h-full">
          {routes.map((route, i) => renderTabItem(route, i))}
        </View>
      </View>
    </View>
  );
};

export default BottomNavigationWrapper;