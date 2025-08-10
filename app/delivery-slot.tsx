import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DeliverySlotScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');

  const dateTabs = [
    { id: 'Today', label: 'Today' },
    { id: 'Tomorrow', label: 'Tomorrow' },
    { id: 'Calendar', label: 'Calendar' },
  ];

  const timeTabs = [
    { id: 'All', label: 'All Slots' },
    { id: 'Morning', label: 'Morning' },
    { id: 'Afternoon', label: 'Afternoon' },
    { id: 'Evening', label: 'Evening' },
  ];

  const allTimeSlots = [
    { id: '1', time: '06:00 AM - 07:00 AM', category: 'Morning' },
    { id: '2', time: '09:00 AM - 10:00 AM', category: 'Morning' },
    { id: '3', time: '12:00 PM - 02:00 PM', category: 'Afternoon' },
    { id: '4', time: '04:00 PM - 07:00 PM', category: 'Evening' },
    { id: '5', time: '08:00 PM - 10:00 PM', category: 'Evening' },
  ];

  // Filter time slots based on selected tab
  const getFilteredTimeSlots = () => {
    if (selectedTab === 'All') {
      return allTimeSlots;
    }
    return allTimeSlots.filter(slot => slot.category === selectedTab);
  };

  const handleDone = () => {
    if (selectedTimeSlot) {
      // Navigate back to checkout with selected slot
      router.replace({
        pathname: '/checkout',
        params: { selectedSlot: selectedTimeSlot }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0a0b0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Slot</Text>
      </View>

      {/* ========================================
          DATE TABS SECTION
          ======================================== */}
      <View style={styles.dateTabsContainer}>
        {dateTabs.map((date) => (
          <TouchableOpacity
            key={date.id}
            style={[
              styles.dateTab,
              selectedDate === date.id && styles.dateTabActive
            ]}
            onPress={() => setSelectedDate(date.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dateTabText,
              selectedDate === date.id && styles.dateTabTextActive
            ]}>
              {date.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ========================================
          TIME SLOTS SECTION
          ======================================== */}
      <View style={styles.timeSlotsContainer}>
        <View style={styles.timeSlotsHeader}>
          {timeTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.timeSlotTab,
                selectedTab === tab.id && styles.timeSlotTabActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.timeSlotsList} showsVerticalScrollIndicator={false}>
          {getFilteredTimeSlots().map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={styles.timeSlotItem}
              onPress={() => setSelectedTimeSlot(slot.id)}
              activeOpacity={0.7}
            >
              <View style={styles.timeSlotContent}>
                <View style={[
                  styles.radioButton,
                  selectedTimeSlot === slot.id && styles.radioButtonActive
                ]}>
                  {selectedTimeSlot === slot.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.timeSlotText}>{slot.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ========================================
          DONE BUTTON
          ======================================== */}
      {selectedTimeSlot && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.7}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 10,
  },
  dateTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 20,
  },
  dateTab: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  dateTabActive: {
    backgroundColor: 'rgba(12, 162, 1, 0.1)',
  },
  dateTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(28,28,28,0.4)',
  },
  dateTabTextActive: {
    color: '#0ca201',
  },
  timeSlotsContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  timeSlotsHeader: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  timeSlotTab: {
    fontSize: 14,
    color: 'rgba(10,11,10,0.6)',
    paddingVertical: 5,
  },
  timeSlotTabActive: {
    color: '#0ca201',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#0ca201',
  },
  timeSlotsList: {
    flex: 1,
  },
  timeSlotItem: {
    marginBottom: 15,
  },
  timeSlotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#0ca201',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ca201',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#0a0b0a',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  doneButton: {
    backgroundColor: '#0ca201',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 