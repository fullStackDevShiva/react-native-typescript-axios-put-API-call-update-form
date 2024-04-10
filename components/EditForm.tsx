import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Pressable,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

interface DataProp {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  prerequisites: string;
  fees: string;
}

interface EditFormProps {
  formData: DataProp;
  formDisplayHandle: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ formData, formDisplayHandle }) => {
  const { _id, title, subtitle, description, prerequisites, fees } = formData;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<DataProp>();

  useEffect(() => {
    setValue("title", title);
    setValue("subtitle", subtitle);
    setValue("description", description);
    setValue("prerequisites", prerequisites);
    setValue("fees", fees);
  }, []);

  const onSubmit = async (formData: DataProp) => {
    Keyboard.dismiss();
    try {
      const res = await axios.put(
        `http://localhost:5002/courses/update/${_id}`,
        formData
      );
      console.log("response received");
      console.log(res.data);
      //   Alert.alert("Success! course was updated");
    } catch (error) {
      console.error(error);
    } finally {
      formDisplayHandle();
    }
  };

  return (
    <>
      <Pressable style={styles.cancel_btn} onPress={formDisplayHandle}>
        <Text style={styles.cancel_btn_txt}>X</Text>
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 5 }}>
        Edit Course
      </Text>
      {title && (
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          {title}
        </Text>
      )}

      <View style={[styles.rn_form_wrapper, { marginBottom: 50 }]}>
        {errors?.title && (
          <Text style={styles.error_txt}>{errors?.title?.message}</Text>
        )}
        <Controller
          name="title"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is a required field",
            },
            minLength: {
              value: 15,
              message: "This field requires min 15 characters",
            },
            maxLength: {
              value: 80,
              message: "This input exceeds 80 characters.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Title"
              onChangeText={onChange}
              value={value}
              style={styles.text_input}
            />
          )}
        />

        {errors?.subtitle && (
          <Text style={styles.error_txt}>{errors?.subtitle?.message}</Text>
        )}
        <Controller
          name="subtitle"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is a required field",
            },
            minLength: {
              value: 15,
              message: "This field requires min 15 characters",
            },
            maxLength: {
              value: 80,
              message: "This input exceeds 80 characters.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Sub Title"
              onChangeText={onChange}
              value={value}
              style={styles.text_input}
            />
          )}
        />

        {errors?.description && (
          <Text style={styles.error_txt}>{errors?.description?.message}</Text>
        )}
        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is a required field",
            },
            minLength: {
              value: 80,
              message: "This field requires min 80 characters",
            },
            maxLength: {
              value: 200,
              message: "This input exceeds 200 characters.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Description"
              onChangeText={onChange}
              value={value}
              style={styles.text_area}
            />
          )}
        />

        {errors?.prerequisites && (
          <Text style={styles.error_txt}>{errors?.prerequisites?.message}</Text>
        )}
        <Controller
          name="prerequisites"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is a required field",
            },
            minLength: {
              value: 80,
              message: "This field requires min 80 characters",
            },
            maxLength: {
              value: 200,
              message: "This input exceeds 200 characters.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Prerequisites"
              onChangeText={onChange}
              value={value}
              style={styles.text_area}
            />
          )}
        />
        {errors?.fees && (
          <Text style={styles.error_txt}>{errors?.fees?.message}</Text>
        )}
        <Controller
          name="fees"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is a required field",
            },
            minLength: {
              value: 3,
              message: "This field requires min 3 digits",
            },
            maxLength: {
              value: 4,
              message: "This input exceeds 4 digits.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Fees"
              onChangeText={onChange}
              value={value}
              style={styles.text_input}
              keyboardType="numeric"
            />
          )}
        />

        <Pressable style={styles.rn_form_btn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.rn_frmBtn_txt}>Update</Text>
        </Pressable>
      </View>
    </>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  rn_form_wrapper: {
    width: "100%",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  cancel_btn: {
    backgroundColor: "#dfe6e9",
    height: 36,
    width: 36,
    borderRadius: 50,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignContent: "center",
  },
  cancel_btn_txt: {
    color: "#ff4757",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  input_label: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  error_txt: {
    color: "red",
    marginBottom: 3,
  },
  text_input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  text_area: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  rn_form_btn: {
    width: "auto",
    backgroundColor: "#00cec9",
    padding: 8,
    marginTop: 5,
  },
  rn_frmBtn_txt: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    alignSelf: "center",
  },
});
