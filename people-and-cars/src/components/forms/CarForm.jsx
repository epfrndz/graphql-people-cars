import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";

const CarForm = ({
  people,
  dataActions,
  editInfo = {},
  setEditMode = () => {},
  variant,
}) => {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const formData = useRef({...editInfo});

  const handleFinish = () => {
    setEditMode(false)
    if (variant === 'edit') {
      dataActions.editCar(formData.current)
    } else {
      dataActions.addCar(formData.current);
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

  const peopleOptions = [];
  people.forEach((person) => {
    const personObj = {
      value: person.id,
      label: `${person.firstName} ${person.lastName}`,
    };
    peopleOptions.push(personObj);
  });

  useEffect(() => {
    if (variant === "edit") {
      setSubmitDisabled(false)
    }
  }, [variant])

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
          width: "fit-content",
          flexBasis: "900px",
        }}
      >
        <Form.Item
          label="Year"
          name="year"
          initialValue={editInfo ? editInfo.year : ''}
          style={{ flexBasis: "120px" }}
          rules={[
            {
              required: true,
              message: "Please input model year",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Make"
          name="make"
          initialValue={editInfo ? editInfo.make : ''}
          style={{ flexBasis: "180px" }}
          rules={[
            {
              required: true,
              message: "Please input car make",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          initialValue={editInfo ? editInfo.model : ''}
          style={{ flexBasis: "180px" }}
          rules={[
            {
              required: true,
              message: "Please input car model",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          initialValue={editInfo ? editInfo.price : ''}
          style={{ flexBasis: "150px" }}
          rules={[
            {
              required: true,
              message: "Please input car price",
            },
          ]}
        >
          <InputNumber prefix="$" controls={false} />
        </Form.Item>

        <Form.Item
          label="Person"
          name="personId"
          initialValue={editInfo ? editInfo.personId : ''}
          style={{ flexBasis: "200px" }}
          rules={[
            {
              required: true,
              message: "Please input car owner",
            },
          ]}
        >
          <Select options={peopleOptions} />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={submitDisabled}>
          {variant === "edit" ? "Save" : 'Add Car'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
