import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export default function KeyboardSafeScreen({ style, children }: Props) {
  return (
    <KeyboardAvoidingView
      style={style}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {children}
    </KeyboardAvoidingView>
  );
}


