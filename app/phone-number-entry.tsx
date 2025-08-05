import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PhoneNumberEntryScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [cursorVisible, setCursorVisible] = useState(true);

  // ========================================
  // CURSOR BLINKING ANIMATION
  // ========================================
  // Blink cursor effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // ========================================
  // PHONE NUMBER VALIDATION
  // ========================================
  // Calculate digits entered (excluding +91)
  const digitsEntered = phoneNumber.length - 3; // +91 = 3 characters
  const isComplete = digitsEntered === 10;

  // ========================================
  // KEYPAD HANDLERS
  // ========================================
  const handleKeyPress = (key: string) => {
    if (digitsEntered < 10) { // Limit to 10 digits
      setPhoneNumber(prev => prev + key);
    }
  };

  const handleDelete = () => {
    if (phoneNumber.length > 3) { // Keep +91
      setPhoneNumber(prev => prev.slice(0, -1));
    }
  };

  // ========================================
  // NAVIGATION HANDLER
  // ========================================
  const handleContinue = () => {
    if (phoneNumber.length === 13) { // +91 + 10 digits = 13 characters
      console.log('Phone number:', phoneNumber);
      // Navigate to OTP verification screen with phone number
      router.push({
        pathname: '/otp-verification',
        params: { phoneNumber }
      });
    }
  };

  // ========================================
  // KEYPAD BUTTON RENDERING HELPERS
  // ========================================
  const renderKeypadButton = (number: string, letters?: string) => (
    <TouchableOpacity
      key={number}
      style={styles.keypadButton}
      onPress={() => handleKeyPress(number)}
      activeOpacity={0.7}
    >
      <Text style={styles.keypadNumber}>{number}</Text>
      {letters && <Text style={styles.keypadLetters}>{letters}</Text>}
    </TouchableOpacity>
  );

  const renderSpecialButton = (symbol: string, action: () => void, isDelete = false) => (
    <TouchableOpacity
      style={[styles.keypadButton, isDelete && styles.deleteButton]}
      onPress={action}
      activeOpacity={0.7}
    >
      <Text style={[styles.specialButtonText, isDelete && styles.deleteButtonText]}>
        {symbol}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ========================================
          STATUS BAR SECTION
          ======================================== */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>12:30</Text>
        <View style={styles.statusBarIcons}>
          <Ionicons name="cellular" size={16} color="#170e2b" />
          <Ionicons name="wifi" size={16} color="#170e2b" />
          <Ionicons name="battery-full" size={16} color="#170e2b" />
        </View>
      </View>

      {/* ========================================
          HEADER SECTION - LOGO & BRANDING
          ======================================== */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🌾</Text>
          </View>
          <Text style={styles.brandName}>PROMODE AGRO FARMS</Text>
        </View>
        <Text style={styles.tagline}>"Experience the Taste of Organic Farming"</Text>
      </View>

      {/* ========================================
          PHONE NUMBER INPUT SECTION
          ======================================== */}
      <View style={styles.inputSection}>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.phoneNumberText}>
            {phoneNumber}
            {cursorVisible && digitsEntered < 10 && <Text style={styles.cursor}>|</Text>}
          </Text>
        </View>
        
        {/* ========================================
            CONTINUE BUTTON
            ======================================== */}
        <TouchableOpacity 
          style={[styles.continueButton, !isComplete && styles.continueButtonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!isComplete}
        >
          <Text style={[styles.continueButtonText, !isComplete && styles.continueButtonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
          CUSTOM KEYPAD SECTION
          ======================================== */}
      <View style={styles.keypadContainer}>
        {/* Row 1: 1, 2, 3 */}
        <View style={styles.keypadRow}>
          {renderKeypadButton('1')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('2', 'ABC')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('3', 'DEF')}
        </View>

        {/* Row 2: 4, 5, 6 */}
        <View style={styles.keypadRow}>
          {renderKeypadButton('4', 'GHI')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('5', 'JKL')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('6', 'MNO')}
        </View>

        {/* Row 3: 7, 8, 9 */}
        <View style={styles.keypadRow}>
          {renderKeypadButton('7', 'PQRS')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('8', 'TUV')}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('9', 'WXYZ')}
        </View>

        {/* Row 4: *, 0, Back */}
        <View style={styles.keypadRow}>
          {renderSpecialButton('*', () => {})}
          <View style={styles.keypadSpacer} />
          {renderKeypadButton('0')}
          <View style={styles.keypadSpacer} />
          {renderSpecialButton('⌫', handleDelete, true)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    height: 50,
    backgroundColor: '#ffffff',
  },
  statusBarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#170e2b',
  },
  statusBarIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    gap: 15,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 15,
  },
  logoPlaceholder: {
    width: 100,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0ca201',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0ca201',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 20,
    opacity: 0.9,
  },
  inputSection: {
    marginTop: 30,
    paddingHorizontal: 30,
    gap: 20,
  },
  phoneInputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fafafa',
  },
  phoneNumberText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cursor: {
    color: '#0ca201',
    fontWeight: 'bold',
  },
  continueButton: {
    height: 50,
    backgroundColor: '#0ca201',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0ca201',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  continueButtonTextDisabled: {
    color: '#999999',
  },
  keypadContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
    marginTop: 25, // Increased space between continue button and keypad
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keypadSpacer: {
    width: 15,
  },
  keypadButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#f8f9fa',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  keypadNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  keypadLetters: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666666',
    letterSpacing: 0.5,
  },
  specialButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff5252',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  numberButton: {
    width: 70,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}); 