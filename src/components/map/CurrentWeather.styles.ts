import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  callout: {
    minHeight: 80,
    maxWidth: 220,
    padding: 8,
  },
  cityAndTemp:{
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  city: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  district: {
    marginBottom: 8,
    fontSize: 12,
    color: '#344ba6',
  },
  temperature: {
    fontSize: 14,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666',
  },
});


