import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  dateAndTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontWeight: '600',
    marginBottom: 6,
  },
  temp: {
    fontSize: 16,
    marginBottom: 4,
  },
  precip: {
    color: '#666',
  },
});


