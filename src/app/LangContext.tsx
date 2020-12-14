import React from "react";
import { connect } from "react-redux";
import { RU_LANG } from "../common/constants";
import { getLang } from "../features/weather/weatherSlice";
import { RootState } from "./types";

const LangContext = React.createContext(RU_LANG);

const LangContextProvider: React.FC<any> = ({ lang, children }: LangContextProviderProps) => {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};

const mapStateToProps = (state: RootState) => ({
  lang: getLang(state),
});
const mapDispatchToProps = {};

interface LangContextProviderProps {
  lang: string;
  children: any;
}

const LangProvider = connect(mapStateToProps, mapDispatchToProps)(LangContextProvider);

export { LangContext, LangProvider };
