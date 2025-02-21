import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
  </svg>
);

const PrivacyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#999"/>
  </svg>
);

const PrivacyPage: React.FC = () => {
  const navigation = useNavigation();

  // State variables to toggle expanded info for each section
  const [dataUsageExpanded, setDataUsageExpanded] = useState(false);
  const [cookieSettingsExpanded, setCookieSettingsExpanded] = useState(false);
  const [thirdPartyIntegrationsExpanded, setThirdPartyIntegrationsExpanded] = useState(false);

  // Toggle functions
  const toggleDataUsage = () => setDataUsageExpanded(!dataUsageExpanded);
  const toggleCookieSettings = () => setCookieSettingsExpanded(!cookieSettingsExpanded);
  const toggleThirdPartyIntegrations = () => setThirdPartyIntegrationsExpanded(!thirdPartyIntegrationsExpanded);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy</Text>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Usage</Text>
          <Text style={styles.sectionText}>
            We collect data to enhance your experience. Learn more about our data usage and policies here.
          </Text>
          <TouchableOpacity onPress={toggleDataUsage}>
            <Text style={styles.linkText}>
              {dataUsageExpanded ? 'Show Less' : 'Learn More'}
            </Text>
          </TouchableOpacity>
          {dataUsageExpanded && (
            <Text style={styles.sectionText}>
              As part of our service, we collect personal data, such as your name, email, and booking preferences.
              This data is used to improve your experience, including personalized restaurant recommendations,
              promotions, and service improvements. For more details, refer to our privacy policy.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cookie Settings</Text>
          <Text style={styles.sectionText}>
            Manage your cookie preferences for a personalized experience. You can choose to accept or decline.
          </Text>
          <TouchableOpacity onPress={toggleCookieSettings}>
            <Text style={styles.linkText}>
              {cookieSettingsExpanded ? 'Show Less' : 'Manage Cookies'}
            </Text>
          </TouchableOpacity>
          {cookieSettingsExpanded && (
            <Text style={styles.sectionText}>
              Cookies are small data files stored on your device to enhance your browsing experience. You can
              manage your cookie preferences through the app settings. Some cookies are necessary for the proper
              functioning of the website, while others are used to track your preferences and activities across
              different sites.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Third-Party Integrations</Text>
          <Text style={styles.sectionText}>
            We may share your data with trusted third-party services for better functionality.
          </Text>
          <TouchableOpacity onPress={toggleThirdPartyIntegrations}>
            <Text style={styles.linkText}>
              {thirdPartyIntegrationsExpanded ? 'Show Less' : 'View Integrations'}
            </Text>
          </TouchableOpacity>
          {thirdPartyIntegrationsExpanded && (
            <Text style={styles.sectionText}>
              We work with various third-party service providers to improve our offerings. For example, we may
              integrate with payment processors to complete your transactions or with analytics providers to
              track app performance. We ensure that all third-party integrations adhere to our privacy policies
              and comply with data protection regulations.
            </Text>
          )}
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
  contentSection: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  linkText: {
    color: '#19AFFF',
    fontSize: 16,
  },
});

export default PrivacyPage;
