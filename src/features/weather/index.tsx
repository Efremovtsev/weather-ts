import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {
  getFetching,
  getCity,
  getDays,
  setCity as setCityAction,
  setLang as setLangAction,
  getError,
} from "./weatherSlice";
import { RootState } from "../../app/types";
import Day from "./Day";
import Search from "../../components/Search";
import Lang from "../../components/Lang";
import { LangContext } from "../../app/LangContext";
import LOCALES from "../../common/locales";
import ROUTES from "../../common/routes";

const Weather: React.FC<any> = ({ fetching, city, days, error, setCity, setLang }) => {
  const lang = useContext(LangContext);

  return (
    <Grid container direction="column" spacing={6}>
      <Grid container item justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Search onTextChange={setCity} city={city} />
        </Grid>
        <Grid item>
          <Typography variant="h4">
            <Link to={ROUTES.history.path}>{LOCALES[lang].history.title}</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Lang onChange={setLang} />
        </Grid>
      </Grid>
      {fetching ? (
        <Grid item>
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography variant="h1">{error || city}</Typography>
          </Grid>
          <Grid item>
            {days?.map((_day: any) => (
              <Day key={_day.date} data={_day} />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  fetching: getFetching(state),
  city: getCity(state),
  days: getDays(state),
  error: getError(state),
});
const mapDispatchToProps = {
  setCity: setCityAction,
  setLang: setLangAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
