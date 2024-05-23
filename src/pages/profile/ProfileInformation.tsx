import React, { useEffect, useState } from "react";
import { Flex, Text, Button } from "@aws-amplify/ui-react";
import axios from "axios";

const ProfileInformation = () => {
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    apellido: "",
    email: "",
    tipoUsuario: "",
    especialidad: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.id;

      const userEndpoint =
        userType === "profesional"
          ? `${process.env.REACT_APP_URL}api/v1/profesionales/${userId}`
          : `${process.env.REACT_APP_URL}api/v1/secretarias/${userId}`;

      axios
        .get(userEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la información del usuario:", error);
        });
    }
  }, []);

  return (
    <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="14px">
        Profile Information
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Full Name:
        </Text>
        <Text variation="tertiary">{`${userInfo.nombre} ${userInfo.apellido}`}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Email:
        </Text>
        <Text variation="tertiary">{userInfo.email}</Text>
      </Flex>
      {userInfo.tipoUsuario === "profesional" && (
        <Flex>
          <Text variation="tertiary" fontWeight="600">
            Speciality:
          </Text>
          <Text variation="tertiary">{userInfo.especialidad}</Text>
        </Flex>
      )}
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">Chile</Text>
      </Flex>
      <div className="profile-card-edit">
        <Button marginLeft="auto">Edit</Button>
      </div>
    </div>
  );
};

export default ProfileInformation;
