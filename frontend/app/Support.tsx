import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';  

interface TopicItem {
  icon: string;
  title: string;
  description: string;
}

interface SupportFormState {
  name: string;
  email: string;
  message: string;
}

const SupportScreen: React.FC = () => {

  const [formData, setFormData] = useState<SupportFormState>({
    name: '',
    email: '',
    message: '',
  });

 
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopic, setExpandedTopic] = useState<TopicItem | null>(null);

  const navigation = useNavigation();  

  const topics: TopicItem[] = [
    {
      icon: "🍔",
      title: "Order issues and cancellations",
      description: "Having trouble with your order or need to cancel it? We'll guide you through the process to resolve any issues with your food orders.",
    },
    {
      icon: "🍕",
      title: "Menu inquiries and customizations",
      description: "Need help with our menu items or want to customize your order? Here, we’ll provide details on how to modify your order.",
    },
    {
      icon: "🧃",
      title: "Food delivery and packaging",
      description: "Questions about how your food is delivered or concerns with packaging? We'll address all the delivery-related inquiries you might have.",
    },
    {
      icon: "🍽️",
      title: "Restaurant partnerships and feedback",
      description: "Want to become a restaurant partner or leave feedback? We’ll explain how you can collaborate with Lumipin and share your thoughts.",
    },
  ];

  
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleInputChange = (field: keyof SupportFormState, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;

    if (name === '' || email === '' || message === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mnnajaza', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Success',
          `Thank you for reaching out, ${name}. We'll get back to you soon.`,
          [
            {
              text: 'OK',
              onPress: () => setFormData({ name: '', email: '', message: '' }),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to send your message. Please try again later.');
    }
  };

 
  const handleTopicPress = (topic: TopicItem) => {
    setExpandedTopic((prevState) => (prevState === topic ? null : topic));
  };

  
  const handleGoBack = () => {
    navigation.goBack();  
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
       
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

  
          <Text style={styles.title}>Support Lumipin</Text>

         
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search questions, keywords, topics"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

         
          <Text style={styles.sectionTitle}>Popular Support Topics</Text>

        
          {filteredTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicCard}
              activeOpacity={0.7}
              onPress={() => handleTopicPress(topic)}
            >
              <View style={styles.topicContent}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <Text style={styles.topicTitle}>{topic.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}

          
          {expandedTopic && (
            <View style={styles.topicDetails}>
              <Text style={styles.topicDescription}>{expandedTopic.description}</Text>
            </View>
          )}

         
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Contact Support</Text>

            <TextInput
              style={styles.formInput}
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.formInput}
              placeholder="Your Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
            />

            <TextInput
              style={[styles.formInput, styles.textArea]}
              placeholder="Your Message"
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 48,
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  topicCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  topicTitle: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 24,
    color: '#ccc',
  },
  topicDetails: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  topicDescription: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SupportScreen;
