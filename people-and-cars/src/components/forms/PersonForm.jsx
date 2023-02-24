import { Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";

const PersonForm = ({
  dataActions,
  editInfo = {},
  setEditMode = () => {},
  variant,
}) => {

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const formData = useRef({...editInfo});

  const handleFinish = (e) => {
    setEditMode(false);
    if (variant === 'edit') {
      dataActions.editPerson(formData.current);
    } else {
      dataActions.addPerson(formData.current);
    }
  };

  const handleFinishFailed = () => {
    alert("Form submission failed");
  };

  const handleChange = (changedValues, allValues) => {
    formData.current = {...formData.current, ...allValues};
    let countEntries = 0;
    Object.values(allValues).forEach((value) => {
      if (value) {
        countEntries += 1;
      }
    });
    if (countEntries === Object.keys(allValues).length) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  useEffect(() => {
    if (variant === "edit") {
      setSubmitDisabled(false);
    }
  }, [variant]);

  return (
    <Form
      name="basic"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handleChange}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          flexBasis: "550px",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          style={{ flexBasis: "260px" }}
          initialValue={editInfo ? editInfo.firstName : ""}
          rules={[
            {
              required: true,
              message: "Please input firstname",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          initialValue={editInfo ? editInfo.lastName : ""}
          style={{ flexBasis: "260px" }}
          rules={[
            {
              required: true,
              message: "Please input your lastname",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={submitDisabled}>
          {variant === "edit" ? "Save" : "Add Person"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonForm;
