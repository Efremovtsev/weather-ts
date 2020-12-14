export const getWeather = async (city: string, lang: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=a482965107344b27f7075f6ac1658a39`
  );
  return await response.json();
};
