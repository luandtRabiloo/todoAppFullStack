import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../../utils/color';
import { AppImage } from '../../../element/AppImage';

type TProfileCardProps = {
  data: {
    _id?: string;
    lastMessage?: {
      content: string;
    };
    seenBy: {
      username: string;
    };
  };
};

export const ConversationItem: React.FC<TProfileCardProps> = ({ data }) => {
  const { lastMessage, seenBy } = data;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Avatar */}
        <AppImage isOnline />
        {/* Profile Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {seenBy?.username}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.location} numberOfLines={1}>
              {lastMessage?.content}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardGradient: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.base,
    borderRadius: 24,
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  location: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  followButton: {
    overflow: 'hidden',
    shadowColor: '#29b6f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  followingButton: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  buttonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  followingText: {
    color: '#495057',
  },
});
