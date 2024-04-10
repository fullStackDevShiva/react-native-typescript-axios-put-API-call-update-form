import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { useState } from "react";
import EditForm from "./components/EditForm";
import ListItems from "./components/ListItems";

export default function App() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editCourseData, setEditCourseData] = useState(null);

  // To get the course data that to be edited
  const getCourseData = async (itemId: string) => {
    console.log(itemId);
    try {
      const res = await axios.get(`http://localhost:5002/courses/${itemId}`);
      if (!res) {
        console.log("Course not found");
        return;
      }
      console.log(res.data);
      setEditCourseData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const passCourseId = (itemId: string) => {
  //   getCourseData(itemId);
  //   formDisplayHandle();
  // };

  const formDisplayHandle = (itemId: string) => {
    if (showForm === false) {
      getCourseData(itemId);
      setShowForm(true);
    } else {
      setEditCourseData(null);
      setShowForm(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {showForm === true ? (
        <>
          {editCourseData ? (
            <EditForm
              formData={editCourseData}
              formDisplayHandle={formDisplayHandle}
            />
          ) : null}
        </>
      ) : (
        <ListItems formDisplayHandle={formDisplayHandle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
});
