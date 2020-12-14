import React, { useEffect, useState, useContext, useMemo } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { debounce } from "../../common/utils";
import { LangContext } from "../../app/LangContext";
import LOCALES from "../../common/locales";
import { CITIES } from "../../common/constants";

const Search: React.FC<any> = ({ city, onTextChange }: Props) => {
  const lang = useContext(LangContext);

  const [text, setText] = useState(city);
  const [option, setOption] = useState(CITIES[lang].find((c: any) => c.title === city) || { title: "", id: 0 });
  const [prevText, setPrevText] = useState("");

  const onChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setText(newValue?.title);
    setOption(newValue);
  };

  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const updateInputText = debounce((_text: string) => {
    onTextChange(_text);
    setPrevText(_text);
  }, 400);

  const citiesOptions = useMemo(
    () => CITIES[lang].sort((a: any, b: any) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0)),
    [lang]
  );

  useEffect(() => {
    if (text !== prevText) {
      const id = window.setTimeout(() => {
        updateInputText(text);
      }, 400);
      return () => {
        window.clearTimeout(id);
      };
    }
  }, [text, prevText, updateInputText]);

  useEffect(() => {
    setText(city);
    setPrevText(city);

    const cityOption = CITIES[lang].find((c: any) => c.title === city);
    if (cityOption) {
      setOption(cityOption);
    }
  }, [lang, city, setText, setPrevText]);

  return (
    <Autocomplete
      options={citiesOptions}
      getOptionLabel={(option: any) => option.title || ""}
      style={{ width: 300 }}
      onChange={onChange}
      value={option}
      renderInput={(params: any) => (
        <TextField
          label={LOCALES[lang].fields.city}
          variant="outlined"
          value={text}
          onChange={onChangeInputText} // debounce change handler
          InputLabelProps={{ shrink: true }}
          {...params}
        />
      )}
    />
  );
};

interface Props {
  city: string;
  onTextChange: Function;
}

export default Search;
