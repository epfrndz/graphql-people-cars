import React from "react";
import { Divider, Typography } from "antd";
import PersonForm from "../forms/PersonForm";
import CarForm from "../forms/CarForm";
import PersonCard from "../cards/PersonCard";
import { useOutletContext } from "react-router-dom";

const IndexPage = () => {

  const [carsArray, peopleArray, dataActions] = useOutletContext();

  const filterCars = (personId) => {
    const cars = carsArray.filter((car) => car.personId === personId);
    return cars;
  };

  return (
    <>
      <Typography.Title level={3}>PEOPLE AND THEIR CARS</Typography.Title>
      <Divider>Add Person</Divider>
      <PersonForm dataActions={dataActions} variant="add" />
      {peopleArray.length !== 0 ? (
        <>
          <Divider>Add Car</Divider>
          <CarForm
            people={peopleArray}
            dataActions={dataActions}
            variant="add"
          />
        </>
      ) : (
        <></>
      )}
      <Divider>Records</Divider>
      {peopleArray.map((person) => (
        <PersonCard
          person={person}
          personCars={filterCars(person.id)}
          dataActions={dataActions}
          people={peopleArray}
          key={person.id}
        />
      ))}
      {peopleArray.length === 0 ? (
        <Typography>
          Nothing to display. Please add a person to start.
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default IndexPage;
