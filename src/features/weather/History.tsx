import React, { useContext, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Lang from "../../components/Lang";
import { RootState } from "../../app/types";
import { LangContext } from "../../app/LangContext";
import LOCALES from "../../common/locales";
import { setLang as setLangAction, getHistory } from "./weatherSlice";

const History: React.FC<any> = ({ data, setLang }) => {
  const lang = useContext(LangContext);

  const columns = useMemo(
    () => [
      { field: "city", headerName: LOCALES[lang].history.table.city, width: 210, sortable: false },
      {
        field: "createDate",
        headerName: LOCALES[lang].history.table.createDate,
        width: 200,
        valueGetter: (params: any) =>
          new Date(params.row.createDate).toLocaleString(lang, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
      },
      {
        field: "date",
        headerName: LOCALES[lang].history.table.date,
        width: 230,
        sortable: false,
        valueGetter: (params: any) => `${params.row.dayOfWeek} ${params.row.dateString}`,
      },
      {
        field: "weather",
        headerName: LOCALES[lang].history.table.weather,
        sortable: false,
        width: 350,
        valueGetter: (params: any) =>
          `${params.row.list[0].dt_txt.slice(-8, -3)} ${Math.round(Number(params.row.list[0].main.temp))}° ${
            params.row.list[0].weather[0].description
          }`,
      },
    ],
    [lang]
  );

  return (
    <Grid container direction="column" spacing={6}>
      <Grid container item justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">{LOCALES[lang].history.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            <Link to="/">{LOCALES[lang].search.link}</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Lang onChange={setLang} />
        </Grid>
      </Grid>
      <Grid item>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: getHistory(state),
});
const mapDispatchToProps = {
  setLang: setLangAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
