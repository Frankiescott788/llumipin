import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const containerWidth = Math.min(width * 0.95, 500);

const UserIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="white" fill="none" />
    <Path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="white" fill="none" />
  </Svg>
);

const CustomerService01Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path d="M17 11.8045C17 11.4588 17 11.286 17.052 11.132C17.2032 10.6844 17.6018 10.5108 18.0011 10.3289C18.45 10.1244 18.6744 10.0222 18.8968 10.0042C19.1493 9.98378 19.4022 10.0382 19.618 10.1593C19.9041 10.3198 20.1036 10.6249 20.3079 10.873C21.2513 12.0188 21.7229 12.5918 21.8955 13.2236C22.0348 13.7334 22.0348 14.2666 21.8955 14.7764C21.6438 15.6979 20.8485 16.4704 20.2598 17.1854C19.9587 17.5511 19.8081 17.734 19.618 17.8407C19.4022 17.9618 19.1493 18.0162 18.8968 17.9958C18.6744 17.9778 18.45 17.8756 18.0011 17.6711C17.6018 17.4892 17.2032 17.3156 17.052 16.868C17 16.714 17 16.5412 17 16.1955V11.8045Z" stroke="white" fill="none" />
    <Path d="M7 11.8046C7 11.3694 6.98778 10.9782 6.63591 10.6722C6.50793 10.5609 6.33825 10.4836 5.99891 10.329C5.55001 10.1246 5.32556 10.0224 5.10316 10.0044C4.43591 9.9504 4.07692 10.4058 3.69213 10.8732C2.74875 12.019 2.27706 12.5919 2.10446 13.2237C1.96518 13.7336 1.96518 14.2668 2.10446 14.7766C2.3562 15.6981 3.15152 16.4705 3.74021 17.1856C4.11129 17.6363 4.46577 18.0475 5.10316 17.996C5.32556 17.978 5.55001 17.8757 5.99891 17.6713C6.33825 17.5167 6.50793 17.4394 6.63591 17.3281C6.98778 17.0221 7 16.631 7 16.1957V11.8046Z" stroke="white" fill="none" />
    <Path d="M20 10.5V9C20 5.13401 16.4183 2 12 2C7.58172 2 4 5.13401 4 9V10.5" stroke="white" fill="none" />
    <Path d="M20 17.5C20 22 16 22 12 22" stroke="white" fill="none" />
  </Svg>
);

const Settings02Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="white" fill="none" />
    <Path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2071 19.2644 14.6668 20.7211C15.0438 21.0971 15.2323 21.2854 15.3993 21.3079C15.5663 21.3304 15.7524 21.2247 16.1256 21.0134L17.8493 20.0341C18.2296 19.8188 18.4193 19.7111 18.4854 19.5548C18.5515 19.3985 18.4823 19.1321 18.3439 18.5992C17.8396 16.6616 19.0603 14.6225 21.011 14.0965Z" stroke="white" fill="none" />
  </Svg>
);

const Logout03Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path d="M10.5 6.5L3 12L10.5 17.5" stroke="white" fill="none" />
    <Path d="M21 12L3 12" stroke="white" fill="none" />
  </Svg>
);

const LinkBackwardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

const ProfileScreen = () => {
  const navigation = useNavigation(); 

 
  const handleBack = () => {
    navigation.goBack();
  };

 
  const handleMenuItemPress = (title) => {
    switch (title) {
      case 'Profile Settings':
        navigation.navigate('ProfileSettings'); 
        break;
      case 'Support':
        navigation.navigate('Support'); 
        break;
      case 'About':
        navigation.navigate('About'); 
        break;
      case 'Log Out':
        Alert.alert('Logging out...', 'You have been logged out.', [
          { text: 'OK', onPress: () => navigation.navigate('signup') },
        ]);
        break;
      default:
        break;
    }
  };

  
  const menuItems = [
    { title: 'Profile Settings', Component: UserIcon },
    { title: 'Support', Component: CustomerService01Icon },
    { title: 'Privacy', Component: Settings02Icon },
    { title: 'Log Out', Component: Logout03Icon },
  ];

  
  const renderMenuItem = ({ title, Component }) => (
    <TouchableOpacity
      key={title}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(title)}
    >
      <View style={styles.menuIconContainer}>
        <Component />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <LinkBackwardIcon style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://i.pinimg.com/236x/31/eb/97/31eb9767cb1e55594bfcae11c9fe1967.jpg' }}
                style={styles.profileImage}
              />
              <Text style={styles.name}>Newa Sithagu</Text>
              <Text style={styles.email}>newa@gmail.com</Text>
            </View>

            <View style={styles.menuContainer}>
              {menuItems.map(renderMenuItem)}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  card: {
    width: containerWidth,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#19AFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});

export default ProfileScreen;