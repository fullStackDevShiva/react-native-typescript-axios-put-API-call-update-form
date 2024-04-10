import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import React from "react";
import ListItem from "./Item";

interface CourseProp {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  prerequisites: string;
  fees: string;
}

interface EditFormDisplayProp {
  formDisplayHandle: () => void;
}

const ListItems: React.FC<EditFormDisplayProp> = ({ formDisplayHandle }) => {
  const [courses, setCourses] = useState<CourseProp[] | null>(null);

  const getAllCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5002/courses");
      console.log(res.data);
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => (
        <ListItem
          itemId={item._id}
          txt1={item.title}
          txt2={item.subtitle}
          formDisplayHandle={formDisplayHandle}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListItems;
