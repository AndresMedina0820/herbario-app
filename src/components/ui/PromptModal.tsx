import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';

interface PromptModalProps {
  visible: boolean;
  title: string;
  subtitle: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  maxLength?: number;
}

export function PromptModal({
  visible,
  title,
  subtitle,
  placeholder,
  value,
  onChangeText,
  onCancel,
  onConfirm,
  maxLength
}: PromptModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView 
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>
          
          <TextInput
            style={styles.modalInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.inkMedium}
            value={value}
            onChangeText={onChangeText}
            autoFocus
            maxLength={maxLength}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={onCancel}>
              <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonConfirm} onPress={onConfirm}>
              <Text style={styles.modalButtonTextConfirm}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.paper,
    borderWidth: 3,
    borderColor: Colors.inkDark,
    padding: Theme.spacing.lg,
    width: '100%',
    shadowColor: Colors.inkDark,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  modalTitle: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.xl,
    color: Colors.inkDark,
    marginBottom: Theme.spacing.sm,
  },
  modalSubtitle: {
    fontFamily: Theme.typography.family.sans,
    fontSize: 14,
    color: Colors.inkMedium,
    marginBottom: Theme.spacing.md,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: Colors.inkDark,
    backgroundColor: Colors.paperHighlight,
    fontFamily: Theme.typography.family.sans,
    fontSize: 16,
    color: Colors.inkDark,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.md,
  },
  modalButtonCancel: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalButtonTextCancel: {
    fontFamily: Theme.typography.family.sans,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.inkMedium,
  },
  modalButtonConfirm: {
    backgroundColor: Colors.inkDark,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalButtonTextConfirm: {
    fontFamily: Theme.typography.family.sans,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.paperHighlight,
  }
});
