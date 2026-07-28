// screens/RoleSelectionScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../redux/slices/userSlice'; // ✅ Adjust path as needed
import { FontType } from '../../Components/Constants/FontType'; // Optional: for consistent fonts

export default function RoleSelectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<'consumer' | 'provider' | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    // Save role to Redux
    dispatch(setUserRole(selectedRole));
    
    // Navigate to appropriate flow
    if (selectedRole === 'provider') {
      navigation.replace('ProviderSetup'); // ✅ Use replace to prevent going back
    } else {
      navigation.replace('ConsumerHome'); // ✅ Use replace to prevent going back
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a...</Text>
      
      <TouchableOpacity 
        style={[styles.option, selectedRole === 'consumer' && styles.selectedOption]}
        onPress={() => setSelectedRole('consumer')}
      >
        <Text style={styles.optionTitle}>Customer / Consumer</Text>
        <Text style={styles.optionDesc}>I want to book services</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.option, selectedRole === 'provider' && styles.selectedOption]}
        onPress={() => setSelectedRole('provider')}
      >
        <Text style={styles.optionTitle}>Service Provider</Text>
        <Text style={styles.optionDesc}>I want to offer services</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, !selectedRole && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 32,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#FFF3E8',
    borderColor: '#F27122',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: '#42526E',
  },
  button: {
    backgroundColor: '#F27122',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});