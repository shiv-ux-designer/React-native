import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TextInput, Keyboard, KeyboardAvoidingView, Platform, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // ========================================
  // REFS FOR INPUT FOCUS MANAGEMENT
  // ========================================
  const inputRefs = useRef<TextInput[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // ========================================
  // COUNTDOWN TIMER FOR RESEND OTP
  // ========================================
  // Countdown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  // ========================================
  // KEYBOARD AVOIDING ANIMATION
  // ========================================
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      Animated.timing(slideAnim, {
        toValue: -80,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [slideAnim]);

  // ========================================
  // OTP INPUT HANDLERS
  // ========================================
  const handleOtpChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      if (text.length === 1 && index < 5) {
        setCurrentIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
      
      // Check if all digits are filled
      const updatedOtp = [...newOtp];
      if (updatedOtp.every(digit => digit !== '')) {
        // Auto navigate after a short delay
        setTimeout(() => {
          console.log('OTP completed:', updatedOtp.join(''));
          // Navigate to dashboard screen
          router.push('/dashboard');
        }, 500);
      }
    }
  };

  // ========================================
  // BACKSPACE HANDLER FOR NATIVE KEYBOARD
  // ========================================
  const handleKeyPress = (e: any) => {
    // Handle backspace from mobile keyboard
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[currentIndex] === '') {
        // If current field is empty, go to previous field
        if (currentIndex > 0) {
          const newOtp = [...otp];
          newOtp[currentIndex - 1] = '';
          setOtp(newOtp);
          setCurrentIndex(currentIndex - 1);
          inputRefs.current[currentIndex - 1]?.focus();
        }
      } else {
        // If current field has content, clear it
        const newOtp = [...otp];
        newOtp[currentIndex] = '';
        setOtp(newOtp);
      }
    }
  };

  // ========================================
  // RESEND OTP HANDLER
  // ========================================
  const handleResendOtp = () => {
    if (canResend) {
      console.log('Resending OTP...');
      // Reset countdown and disable resend
      setCountdown(30);
      setCanResend(false);
      // Add your resend OTP logic here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
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
            MAIN CONTENT - CENTERED WITH ANIMATION
            ======================================== */}
        <Animated.View 
          style={[
            styles.mainContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* ========================================
              OTP MESSAGE SECTION
              ======================================== */}
          <View style={styles.messageSection}>
            <Text style={styles.messageText}>
              "We've sent a verification code to"
            </Text>
            <Text style={styles.phoneNumberText}>
              {phoneNumber || '+91 1234567890'}
            </Text>
          </View>

          {/* ========================================
              OTP INPUT BOXES - CENTERED
              ======================================== */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  currentIndex === index && styles.otpInputFocused
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={handleKeyPress}
                onFocus={() => setCurrentIndex(index)}
                maxLength={1}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                selectTextOnFocus
              />
            ))}
          </View>

          {/* ========================================
              RESEND TIMER SECTION
              ======================================== */}
          <TouchableOpacity 
            style={styles.resendContainer} 
            onPress={handleResendOtp}
            disabled={!canResend}
          >
            <Text style={[
              styles.resendText,
              canResend && styles.resendTextBold
            ]}>
              {canResend ? 'Resend OTP' : `Resend OTP in ${countdown} Sec`}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 7,
    height: 53,
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 50,
    gap: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0a0b0a',
    textAlign: 'center',
    letterSpacing: 0.36,
  },
  phoneNumberText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0ca201',
    textAlign: 'center',
    letterSpacing: 0.36,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 9,
    width: '100%',
    maxWidth: 300,
  },
  otpInput: {
    width: 42,
    height: 43,
    borderWidth: 1.5,
    borderColor: '#cccbcb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  otpInputFocused: {
    borderColor: '#0ca201',
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2b2928',
    textAlign: 'center',
  },
  resendTextBold: {
    fontWeight: '700',
    color: '#0ca201',
  },
}); 