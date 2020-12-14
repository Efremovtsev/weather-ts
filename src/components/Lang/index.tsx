import React, { useCallback, useContext } from "react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { RU_LANG, EN_LANG } from "../../common/constants";
import { LangContext } from "../../app/LangContext";

const Lang: React.FC<any> = ({ onChange }: Props) => {
  const lang = useContext(LangContext);
  const changeHandler = useCallback((event) => onChange(event.target.value), [onChange]);

  return (
    <FormControl variant="outlined">
      <Select value={lang} onChange={changeHandler}>
        <MenuItem value={RU_LANG}>{RU_LANG}</MenuItem>
        <MenuItem value={EN_LANG}>{EN_LANG}</MenuItem>
      </Select>
    </FormControl>
  );
};

interface Props {
  onChange: Function;
}

export default Lang;
