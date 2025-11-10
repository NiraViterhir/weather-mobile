import { Text, TextInput, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { styles } from "./Search.styles";

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

