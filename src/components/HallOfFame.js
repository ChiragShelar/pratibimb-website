import React from "react";
import { Grid } from "@mui/material";
import HeroCommon from "./HeroCommon";

function importAll(r) {
  let images = {};
  // eslint-disable-next-line
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images2020 = importAll(
  require.context(
    "../assets/prs/2020",
    false,
    /\.(png|jpg|JPG|jpe?g|svg|webp|jfif)$/
  )
);

const images2019 = importAll(
  require.context(
    "../assets/prs/2019",
    false,
    /\.(png|jpg|JPG|jpe?g|svg|webp|jfif|gif)$/
  )
);

const imagesHallOfFame = importAll(
  require.context(
    "../assets/prs/halloffame",
    false,
    /\.(png|jpg|JPG|jpe?g|svg|webp|jfif)$/
  )
);

const imageNames2020 = Object.keys(images2020);
const imageNames2019 = Object.keys(images2019);
const imagesNameHallOfFame = Object.keys(imagesHallOfFame);

const CelebCircle = ({ img, name }) => {
  return (
    <div className="celeb-wrapper">
      <div className="celeb-cirlce">
        <img src={img} alt="" />
      </div>
      <p>{name}</p>
    </div>
  );
};

const HallOfFame = () => {
  return (
    <div>
      <HeroCommon
        imgClass="hero-hof"
        title="HALL OF FAME"
        subtitle="ALL THE BEAUTIFUL PERSONALITIES WHO HAVE BLESSED PRATIBIMB WITH THEIR PRESENCE"
      ></HeroCommon>
      <div className="hall-of-fame">
        <div className="glimpses">
          <h2>Glimpses of 2020</h2>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            {imageNames2020.map((x) => {
              return (
                <Grid item key={x} md>
                  <CelebCircle
                    img={images2020[x]["default"]}
                    name={x.split(".")[0].replace(/_/g, " ")}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className="glimpses">
          <h2>Glimpses of 2019</h2>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            {imageNames2019.map((x) => {
              return (
                <Grid item key={x} md>
                  <CelebCircle
                    img={images2019[x]["default"]}
                    name={x.split(".")[0].replace(/_/g, " ")}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div className="glimpses">
          <h2>Hall Of Fame</h2>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            {imagesNameHallOfFame.map((x) => {
              return (
                <Grid item key={x} md>
                  <CelebCircle
                    img={imagesHallOfFame[x]["default"]}
                    name={x.split(".")[0].replace(/_/g, " ")}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
