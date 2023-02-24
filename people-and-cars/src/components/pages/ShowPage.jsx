import { Divider, Space, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import PersonCard from "../cards/PersonCard";

const ShowPage = () => {
  const { id } = useParams();
  console.log(id);
  const [carsArray, peopleArray, dataActions] = useOutletContext();
  console.log(peopleArray);
  const filterCars = (personId) => {
    const cars = carsArray.filter((car) => car.personId === personId);
    return cars;
  };

  const person = useRef(peopleArray.filter((p) => p.id === id));
  // let person = peopleArray.filter(p => p.id === id)

  useEffect(() => {
    person.current = peopleArray.filter((p) => p.id === id);
  }, [peopleArray, id]);
  console.log("showpage person>>", person.current[0]);

  return (
    <>
      <Typography.Title level={3}>PEOPLE AND THEIR CARS</Typography.Title>
      <Divider>Person Details</Divider>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Typography
          style={{ textAlign: "left", color: "blue", marginBottom: "1rem" }}
        >
          Go back
        </Typography>
      </Link>
      <PersonCard
        person={person.current[0]}
        personCars={filterCars(id)}
        dataActions={dataActions}
        people={peopleArray}
        key={id}
      />
    </>
  );
};

export default ShowPage;
