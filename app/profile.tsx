import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleOrdersPress = () => {
    router.push('/orders-history');
  };

  const handleCartPress = () => {
    // Since we don't have cart items in profile, we'll navigate to cart without items
    // The cart screen will handle empty state
    router.push('/cart');
  };

  const handleWishlistPress = () => {
    router.push('/favourites');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate back to phone number entry screen (login)
            router.replace('/phone-number-entry');
          },
        },
      ]
    );
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
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.supportButton}>
          <Ionicons name="headset" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================
            ACCOUNT SECTION
            ======================================== */}
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>My account</Text>
          <Text style={styles.accountNumber}>1234567890</Text>
        </View>

        {/* ========================================
            YOUR INFORMATION SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Information</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOrdersPress}>
            <View style={styles.menuLeft}>
              <Ionicons name="time" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Your Orders</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleCartPress}>
            <View style={styles.menuLeft}>
              <Ionicons name="cart" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Your Cart</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleWishlistPress}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Your Wishlist</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="location" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Saved Addresses</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            OTHER INFORMATION SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Information</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="share-social" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Share the app</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="information-circle" size={24} color="#0ca201" />
              <Text style={styles.menuText}>About us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="lock-closed" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Account Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <Ionicons name="log-out" size={24} color="#0ca201" />
              <Text style={styles.menuText}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ========================================
          BOTTOM NAVIGATION
          ======================================== */}
      <View style={[styles.bottomNavigation, { 
        paddingBottom: Math.max(insets.bottom, 20),
        height: 70 + Math.max(insets.bottom, 20),
        bottom: 5,
      }]}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="home" size={26} color="#000000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={26} color="#000000" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="refresh" size={26} color="#000000" />
          <Text style={styles.navText}>Reorders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { 
          backgroundColor: 'rgba(12, 162, 1, 0.1)',
        }]}>
          <Ionicons name="menu" size={26} color="#0ca201" />
          <Text style={styles.navText}>Menu</Text>
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
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  supportButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  accountContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(43, 41, 40, 0.9)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    zIndex: 100,
    height: 60,
    paddingBottom: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 65,
    borderRadius: 20,
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 3,
  },
}); 