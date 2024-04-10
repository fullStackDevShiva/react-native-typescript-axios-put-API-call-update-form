import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";

interface ItemProp {
  itemId: string;
  txt1: string;
  txt2: string;
  formDisplayHandle: () => void;
}

const Item: React.FC<ItemProp> = ({
  itemId,
  txt1,
  txt2,
  formDisplayHandle,
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemTxt1}>{txt1}</Text>
      <Text style={styles.itemTxt2}>{txt2}</Text>
      <Pressable
        style={styles.editBtn}
        onPress={() => formDisplayHandle(itemId)}
      >
        <Text style={styles.editBtnTxt}>Edit</Text>
      </Pressable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  itemTxt1: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  itemTxt2: {
    fontSize: 16,
  },
  editBtn: {
    backgroundColor: "transparent",
    marginTop: 10,
    padding: 0,
    alignSelf: "flex-end",
  },
  editBtnTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f75f7c",
  },
});
