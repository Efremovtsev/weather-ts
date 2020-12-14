import React from "react";
import Typography from "@material-ui/core/Typography";

const Hour: React.FC<any> = ({ data }: Props) => {
  return (
    <>
      <div>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} width="64" height="64" alt="" />
      </div>
      <div>
        <Typography variant="h3" color={Number(data.main.temp) < 0 ? "error" : "primary"}>
          {Math.round(Number(data.main.temp))}°
        </Typography>
      </div>
      <div>
        <Typography variant="h6" color="secondary">
          {data.weather[0].description}
        </Typography>
      </div>
      <div>
        <Typography variant="body2" color="textPrimary">
          {data.dt_txt.slice(-8, -3)}
        </Typography>
      </div>
    </>
  );
};

interface Props {
  data: any;
}

export default Hour;
