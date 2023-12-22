import { Box, Container, Typography, ToggleButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { IoMdAlarm } from "react-icons/io";
import { useState, useEffect } from "react";

import { ButtonState } from "../components/index.js";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeSelected, setCurrentTimeSelected] = useState(
    parseInt(localStorage.getItem("currentTimeSelected")) ||
      new Date().getTime()
  );
  //TOOGLE BUTTON
  const [selectedState, setSelectedState] = useState(
    localStorage.getItem("selectedStateCurrent") || "disconnected"
  );
  //const [alignment, setAlignment] = useState("disconnected");
  //ACUMULATE TIME BY STATE
  const [accumulatedTime, setAccumulatedTime] = useState({
    online: parseInt(localStorage.getItem("accumulatedTimeOnline")) || 0,
    lunch: parseInt(localStorage.getItem("accumulatedTimeLunch")) || 0,
    coach: parseInt(localStorage.getItem("accumulatedTimeCoach")) || 0,
    disconnected:
      parseInt(localStorage.getItem("accumulatedTimeDisconnected")) || 0,
  });

  const handleStateChange = (newState) => {
    if (newState === "refresh") {
      // Actualiza el tiempo sin cambiar el estado
      calculateTime(selectedState);
    } else {
      // Calcula el tiempo y cambia el estado
     calculateTime(selectedState);
     setSelectedState(newState);
     localStorage.setItem("selectedStateCurrent", newState);
     setCurrentTimeSelected(currentTime.getTime());
     localStorage.setItem("currentTimeSelected", currentTime.getTime());
    }
  };

  //calcular el tiempo acumulado por cada estado
  const calculateTime = (state) => {
    const time = currentTime.getTime() - currentTimeSelected; // Time difference in milliseconds

    const secondsTimeCurrent = Math.floor(time / 1000); // Convert to seconds

    setAccumulatedTime((prevState) => {
      return { ...prevState, [state]: prevState[state] + secondsTimeCurrent };
    });

    // Update currentTimeSelected to the current time
    setCurrentTimeSelected(currentTimeSelected + time); // Utilize the calculated time
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2)}h ${String(minutes).padStart(
      2
    )}m ${String(secs).padStart(2)}s`;
  };

  const cleanTime = () => {
    console.log("SE LIMPIA TODO");
    setAccumulatedTime({
      online: 0,
      lunch: 0,
      coach: 0,
      disconnected: 0,
    });
    setSelectedState("disconnected");
    setCurrentTimeSelected(currentTime.getTime());
    localStorage.setItem("selectedStateCurrent", "disconnected");
  };

  //TABLE
  const columns = [
    { headerName: "Estado", field: "stateConnect", flex: 1, sortable: false },
    {
      headerName: "Tiempo de conexión",
      field: "timeConnection",
      flex: 1,
      sortable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      stateConnect: "En línea",

      timeConnection: formatTime(accumulatedTime.online),
    },
    {
      id: 2,
      stateConnect: "Almuerzo",
      timeConnection: formatTime(accumulatedTime.lunch),
    },
    {
      id: 3,
      stateConnect: "Coach",
      timeConnection: formatTime(accumulatedTime.coach),
    },
    {
      id: 4,
      stateConnect: "Desconectado",
      timeConnection: formatTime(accumulatedTime.disconnected),
    },
  ];

  useEffect(() => {
    // Intenta recuperar currentTimeSelected desde localStorage al montar el componente
    const storedTimeSelected = parseInt(
      localStorage.getItem("currentTimeSelected")
    );
    setCurrentTimeSelected(storedTimeSelected || new Date().getTime());
  }, []);

  useEffect(() => {
    localStorage.setItem("accumulatedTimeOnline", accumulatedTime.online);
    localStorage.setItem("accumulatedTimeLunch", accumulatedTime.lunch);
    localStorage.setItem("accumulatedTimeCoach", accumulatedTime.coach);
    localStorage.setItem(
      "accumulatedTimeDisconnected",
      accumulatedTime.disconnected
    );
  }, [accumulatedTime]);

  useEffect(() => {
    // Actualiza currentTime cada segundo
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          height: "18rem",
          position: "relative",
          backgroundImage: `url(https://res.cloudinary.com/dvzjgzqbn/image/upload/v1702974782/cron%C3%B3metroJSX/mtaldvsvtmetrkm7hn83.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.5,
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          zIndex: 1,
          alignItems: "center",
          marginTop: "-6.5rem",
          paddingLeft: "1rem",
        }}
      >
        <IoMdAlarm
          style={{
            fontSize: "5rem",
            color: "#fff",
            marginRight: "0.5rem",
          }}
        />
        <Typography variant="h2" component="h1" align="center">
          Cronómetro Botmaker
        </Typography>
      </Box>

      <Container
        sx={{
          paddingTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <Typography variant="h3" component="h3" align="center">
          Tiempo Actual:
        </Typography>
        <Typography variant="h1" component="h3" align="center">
          {currentTime.toLocaleTimeString()}
        </Typography>
        <Box sx={{ "& button": { m: 2 } }}>
          <ToggleButtonGroup exclusive aria-label="text alignment">
            <ButtonState
              defaultState={localStorage.getItem("selectedStateCurrent")}
              onStateChange={handleStateChange}
              onRefresh={() => {
                calculateTime(selectedState);
              }}
              confirmModal={() => {
                cleanTime();
              }}
            />
          </ToggleButtonGroup>
        </Box>
        <DataGrid
          sx={{
            margin: "auto",
            marginBottom: "2rem",
            width: "70%",
          }}
          rows={rows}
          columns={columns}
          disableColumnFilter
          showToolbar={false}
          disableColumnMenu
          hideFooter={true}
          hideFooterPagination
        />
      </Container>
    </Box>
  );
}

export default App;
