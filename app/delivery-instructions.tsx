import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DeliveryInstructionsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedInstruction, setSelectedInstruction] = useState<string>('');
  const [otherInstructions, setOtherInstructions] = useState('');
  const MAX_CHAR_LIMIT = 200;

  const instructionOptions = [
    {
      id: 'beware-pets',
      title: 'Beware of Pets',
      description: 'Delivery partner will be informed about the presences of pet\'s',
      icon: 'paw',
    },
    {
      id: 'security-guard',
      title: 'Leave with security guard',
      description: 'The order will be left with security guard',
      icon: 'shield',
    },
    {
      id: 'door',
      title: 'Leave at door',
      description: 'The order will be left at the doorstep',
      icon: 'home',
    },
  ];

  const handleInstructionSelect = (instructionId: string) => {
    // If user has written something in other instructions, clear it first
    if (otherInstructions.trim()) {
      Alert.alert(
        'Clear Text First',
        'Please clear the text in "Other Instructions" before selecting an option.',
        [{ text: 'OK' }]
      );
      return;
    }
    setSelectedInstruction(instructionId);
  };

  const handleMicPress = () => {
    Alert.alert(
      'Voice Input',
      'Voice input functionality would be implemented here. For now, you can type your instructions.',
      [{ text: 'OK' }]
    );
  };

  const handleTextChange = (text: string) => {
    if (text.length <= MAX_CHAR_LIMIT) {
      setOtherInstructions(text);
      // Clear radio button selection when user starts typing
      if (text.trim() && selectedInstruction) {
        setSelectedInstruction('');
      }
    }
  };

  const handleSave = () => {
    // Navigate back to checkout with selected instructions (can be empty)
    router.replace({
      pathname: '/checkout',
      params: { 
        deliveryInstructions: JSON.stringify({
          selected: selectedInstruction ? [selectedInstruction] : [],
          other: otherInstructions.trim()
        })
      }
    });
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
        <Text style={styles.headerTitle}>Delivery Instruction</Text>
      </View>

      {/* ========================================
          SUBTITLE SECTION
          ======================================== */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>
          Your delivery partner will be notified of this
        </Text>
      </View>

      {/* ========================================
          INSTRUCTION OPTIONS
          ======================================== */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {instructionOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.instructionItem,
              otherInstructions.trim() && styles.instructionItemDisabled
            ]}
            onPress={() => handleInstructionSelect(option.id)}
            activeOpacity={0.7}
            disabled={otherInstructions.trim().length > 0}
          >
            <View style={styles.instructionLeft}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={option.icon as any} 
                  size={24} 
                  color={
                    otherInstructions.trim() 
                      ? "#cccccc" 
                      : selectedInstruction === option.id 
                        ? "#0ca201" 
                        : "#000000"
                  } 
                />
              </View>
              <View style={styles.instructionContent}>
                <Text style={[
                  styles.instructionTitle,
                  otherInstructions.trim() && styles.instructionTitleDisabled
                ]}>
                  {option.title}
                </Text>
                <Text style={[
                  styles.instructionDescription,
                  otherInstructions.trim() && styles.instructionDescriptionDisabled
                ]}>
                  {option.description}
                </Text>
              </View>
            </View>
            <View style={[
              styles.radioButton,
              selectedInstruction === option.id && styles.radioButtonActive,
              otherInstructions.trim() && styles.radioButtonDisabled
            ]}>
              {selectedInstruction === option.id && !otherInstructions.trim() && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* ========================================
            OTHER INSTRUCTIONS SECTION
            ======================================== */}
        <View style={styles.otherInstructionsContainer}>
          <Text style={styles.otherInstructionsTitle}>Notes Other Instruction</Text>
          <View style={styles.textAreaContainer}>
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder="Other Instructions"
                placeholderTextColor="#cccbcb"
                value={otherInstructions}
                onChangeText={handleTextChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={MAX_CHAR_LIMIT}
              />
              <TouchableOpacity
                style={styles.micButton}
                onPress={handleMicPress}
                activeOpacity={0.7}
              >
                <Ionicons name="mic" size={20} color="#0ca201" />
              </TouchableOpacity>
            </View>
            <View style={styles.charCounter}>
              <Text style={[
                styles.charCounterText,
                otherInstructions.length >= MAX_CHAR_LIMIT && styles.charCounterTextLimit
              ]}>
                {otherInstructions.length}/{MAX_CHAR_LIMIT} characters
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ========================================
          SAVE BUTTON
          ======================================== */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    gap: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120, // Add padding to account for the bottom button
  },
  instructionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instructionItemDisabled: {
    opacity: 0.6,
    backgroundColor: '#f8f8f8',
  },
  instructionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  instructionTitleDisabled: {
    color: '#999999',
  },
  instructionDescription: {
    fontSize: 11,
    color: '#000000',
    lineHeight: 14,
  },
  instructionDescriptionDisabled: {
    color: '#999999',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#0ca201',
  },
  radioButtonDisabled: {
    borderColor: '#cccccc',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ca201',
  },
  otherInstructionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  otherInstructionsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  textAreaContainer: {
    position: 'relative',
  },
  textAreaWrapper: {
    position: 'relative',
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#898483',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 60, // Make space for the mic button
    minHeight: 56,
    fontSize: 14,
    color: '#000000',
    textAlignVertical: 'top',
  },
  micButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
  },
  charCounter: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  charCounterText: {
    fontSize: 12,
    color: '#898483',
  },
  charCounterTextLimit: {
    color: '#ff0000',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  saveButton: {
    backgroundColor: 'rgba(12, 162, 1, 0.8)',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 