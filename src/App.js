import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Popup from "./Popup";
import Drawer from "@mui/material/Drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function ControllableStates() {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => {
    console.log("asss");

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <diV
        style={{
          display: "flex",
          backgroundColor: "lightblue",
          height: "80px"
        }}
      >
        <Button style={{ color: "white" }}>
          <ArrowBackIosIcon /> View Audience
        </Button>
      </diV>

      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={() => toggleDrawer(anchor, true)}
            style={{ marginTop: "50px", marginLeft: "50px" }}
          >
            Save Segment
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
            // sx={style1}
          >
            <Popup click={toggleDrawer} />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
