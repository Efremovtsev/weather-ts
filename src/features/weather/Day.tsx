import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hour from "./Hour";

const styles = (theme: Theme) => ({
  dayRow: {
    marginBottom: 40,
  },
});

const Day: React.FC<any> = ({ classes, data: { date, dateString, list, dayOfWeek } }: Props) => {
  return (
    <div className={classes.dayRow}>
      <Typography variant="h3" gutterBottom color="secondary">
        {dayOfWeek} {dateString}
      </Typography>
      <Grid container alignItems="flex-start" justify="flex-start" spacing={4}>
        {list.map((_item: any) => (
          <Grid item xs={6} sm={3} key={_item.dt}>
            <Hour data={_item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

interface Props {
  data: any,
  classes: {
    dayRow: string;
  };
}

export default withStyles(styles)(Day);
