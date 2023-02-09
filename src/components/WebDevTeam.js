import * as React from "react";
import Box from "@mui/material/Box";
import MemberCard from "./MemberCard";
import { Grid } from "@mui/material";

import CHIRAG_SHELAR from "../assets/Team/CHIRAG_SHELAR.jpeg";
import AMANPREET_BAINS from "../assets/Team/AMANPREET_BAINS.jpg";

export default function WebDevTeam() {
  return (
    <Box sx={{ maxWidth: "1300px", margin: "0 auto" }} data-aos="fade-up">
      <center>
        <p style={{ marginBottom: "1.2rem" }}>
          Website contributed by{" "}
          <a
            href="https://communityofcoders.in/"
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "green",
              fontSize: "1.2rem",
              fontWeight: "strong",
            }}
          >
            Community of Coders, VJTI
          </a>{" "}
          💚
        </p>
      </center>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item md>
          <MemberCard
            color="orange"
            name="Chirag Shelar"
            img={CHIRAG_SHELAR}
            type="web"
            link="https://www.linkedin.com/in/chiragshelar/"
            git="https://github.com/ChiragShelar"
          />
        </Grid>
        <Grid item md>
          <MemberCard
            color="orange"
            name="Amanpreet Bains"
            img={AMANPREET_BAINS}
            type="web"
            link="https://www.linkedin.com/in/amanpreet-bains-939ba5227/"
            git=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}
