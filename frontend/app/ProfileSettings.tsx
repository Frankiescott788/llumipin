import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
  </svg>
);

const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#999"/>
  </svg>
);

const AddPhotoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#00C853"/>
  </svg>
);

const ProfileSettings: React.FC = () => {
  const navigation = useNavigation();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [name, setName] = useState<string>('Muneiwa');
  const [phone, setPhone] = useState<string>('+27 677 567 678');
  const [email, setEmail] = useState<string>('newa@gmail.com');

  const handleSave = (field: string) => {
    if (field === 'name') {
      setIsEditingName(false);
    } else if (field === 'phone') {
      setIsEditingPhone(false);
    } else if (field === 'email') {
      setIsEditingEmail(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal info</Text>
      </View>

      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          <ProfileIcon />
          <View style={styles.addIconContainer}>
            <AddPhotoIcon />
          </View>
        </View>
        <Text style={styles.photoTitle}>Edit your profile</Text>
      </View>

      <View style={styles.infoSection}>
        
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <ProfileIcon style={styles.fieldIcon} />
            {isEditingName ? (
              <TextInput
                style={styles.infoText}
                value={name}
                onChangeText={(text) => setName(text)}
                autoFocus
              />
            ) : (
              <Text style={styles.infoText}>{name}</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => setIsEditingName((prev) => !prev)}>
            <Text style={styles.editButton}>{isEditingName ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={styles.fieldIcon}>📱</Text>
            {isEditingPhone ? (
              <TextInput
                style={styles.infoText}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                autoFocus
              />
            ) : (
              <Text style={styles.infoText}>{phone}</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => setIsEditingPhone((prev) => !prev)}>
            <Text style={styles.editButton}>{isEditingPhone ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

    
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={styles.fieldIcon}>✉️</Text>
            <View>
              {isEditingEmail ? (
                <TextInput
                  style={styles.infoText}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                  autoFocus
                />
              ) : (
                <Text style={styles.infoText}>{email}</Text>
              )}
              {!isEditingEmail && <Text style={styles.verificationStatus}>Not verified</Text>}
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsEditingEmail((prev) => !prev)}>
            <Text style={styles.editButton}>{isEditingEmail ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  photoSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addIconContainer: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#fff',
    color:'#19AFFF',
    borderRadius: 12,
    padding: 4,
  },
  photoTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fieldIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
  verificationStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    color: '#19AFFF',
    fontSize: 14,
    paddingHorizontal: 8,
  },
});

export default ProfileSettings;
