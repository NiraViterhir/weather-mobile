import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";

interface SearchProps {
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  onSubmitSearch: () => void,
}

export default function Search(props: SearchProps) {
  return (
    <View style={styles.noticeBox}>
      <Text style={styles.noticeTitle}>Search a location</Text>
      <TextInput
        placeholder="Search city or place"
        placeholderTextColor="#999"
        style={styles.searchBox}
        returnKeyType="search"
        value={props.query}
        onChangeText={props.setQuery}
        onSubmitEditing={props.onSubmitSearch}
      />
      <Text style={styles.noticeText}>
        Or go to the Map tab and long-press anywhere to choose a location.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  noticeBox: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  noticeTitle: {
    fontWeight: '600', marginBottom: 4
  },
  noticeText: {
    color: '#555'
  },
  searchBox: {
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    color: '#111'
  },
});
