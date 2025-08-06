import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  
  // Animation values
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Sample location data
  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      address: 'Shiv, 13-2-774, kalimandir',
      icon: 'home',
      color: '#0ca201',
    },
  ];

  const recentLocations = [
    {
      id: 1,
      address: '61 Hopper street..',
      country: 'United Kingdom',
      icon: 'location',
    },
  ];

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;

      if (translationY > 100) {
        // Close if dragged down more than 100px
        handleClose();
      } else {
        // Snap back to open position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const handleLocationEnable = () => {
    setIsLocationEnabled(true);
    // Here you would typically request location permissions
  };

  const handleSelectLocation = (location: any) => {
    // Handle location selection
    console.log('Selected location:', location);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity }
        ]}
        onTouchEnd={handleClose}
      />

      {/* Bottom Sheet */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <SafeAreaView style={styles.content}>
            {/* Handle Bar */}
            <View style={styles.handleBar}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Select Delivery location</Text>
            </View>

            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}
            >

              {/* Location Permission Alert */}
              {!isLocationEnabled && (
                <View style={styles.locationAlert}>
                  <View style={styles.alertContent}>
                    <Ionicons name="location-outline" size={24} color="#000000" />
                    <View style={styles.alertText}>
                      <Text style={styles.alertTitle}>Device Location Not Enabled</Text>
                      <Text style={styles.alertSubtitle}>Enable for a better delivery experience</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.enableButton}
                    onPress={handleLocationEnable}
                  >
                    <Text style={styles.enableButtonText}>Enable</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                  <Ionicons name="search" size={20} color="#a2a2a2" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for area, street name...."
                    placeholderTextColor="#a2a2a2"
                    value={searchText}
                    onChangeText={setSearchText}
                  />
                </View>
              </View>

              {/* Current Location */}
              <TouchableOpacity
                style={styles.currentLocation}
                onPress={() => handleSelectLocation({ type: 'current', address: 'Current Location' })}
              >
                <Ionicons name="locate" size={20} color="#0ca201" />
                <Text style={styles.currentLocationText}>Use current location</Text>
                <Ionicons name="chevron-down" size={20} color="#000000" />
              </TouchableOpacity>

              {/* Saved Addresses */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your saved addresses</Text>
                {savedAddresses.map((address) => (
                  <TouchableOpacity
                    key={address.id}
                    style={styles.addressItem}
                    onPress={() => handleSelectLocation(address)}
                  >
                    <View style={styles.addressIcon}>
                      <Ionicons name={address.icon as any} size={20} color={address.color} />
                    </View>
                    <View style={styles.addressText}>
                      <Text style={styles.addressTitle}>{address.type}</Text>
                      <Text style={styles.addressSubtitle}>{address.address}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Recent Locations */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recently search location</Text>
                {recentLocations.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={styles.addressItem}
                    onPress={() => handleSelectLocation(location)}
                  >
                    <View style={styles.addressIcon}>
                      <Ionicons name={location.icon as any} size={20} color="#000000" />
                    </View>
                    <View style={styles.addressText}>
                      <Text style={styles.addressTitle}>{location.address}</Text>
                      <Text style={styles.addressSubtitle}>{location.country}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.85,
    minHeight: height * 0.7,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
  },
  handleBar: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#d9d9d9',
    borderRadius: 9,
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  locationAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffe8e8',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertText: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  alertSubtitle: {
    fontSize: 10,
    color: '#726c6c',
    textAlign: 'center',
  },
  enableButton: {
    backgroundColor: 'rgba(12,162,1,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffe8e8',
  },
  enableButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#cccbcb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccbcb',
  },
  currentLocationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#0ca201',
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#898483',
    marginBottom: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 10,
  },
  addressIcon: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(12,162,1,0.05)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    flex: 1,
    marginLeft: 10,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  addressSubtitle: {
    fontSize: 10,
    color: '#726c6c',
  },
}); 