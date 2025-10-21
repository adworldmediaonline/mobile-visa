import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number | string;
  scrollable?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  height = '50%',
  scrollable = true,
}) => {
  const modalHeight = typeof height === 'string'
    ? screenHeight * (parseInt(height) / 100)
    : height;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        >
          <BlurView intensity={20} className="flex-1 bg-black/20" />
        </TouchableOpacity>

        <View
          className="bg-white rounded-t-3xl"
          style={{ height: modalHeight }}
        >
          {title && (
            <View className="flex-row items-center justify-between p-6 border-b border-secondary-100">
              <Text className="text-xl font-bold text-secondary-900">
                {title}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 items-center justify-center"
              >
                <Text className="text-secondary-500 text-2xl">×</Text>
              </TouchableOpacity>
            </View>
          )}

          {scrollable ? (
            <ScrollView
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View className="flex-1">
              {children}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
