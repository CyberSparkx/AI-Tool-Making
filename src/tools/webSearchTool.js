import { tool } from "langchain";
import { z } from "zod";
import fetch from "node-fetch";

export const weatherTool = tool(
  // Function
  async ({ city }) => {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      if (!apiKey) return "Missing WEATHER_API_KEY in .env";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      if (!res.ok) return `Error: ${res.statusText}`;

      const data = await res.json();

      return `
Weather for ${data.name}
🌡️ Temp: ${data.main.temp}°C
🤔 Feels: ${data.main.feels_like}°C
🌤️ Condition: ${data.weather[0].description}
💧 Humidity: ${data.main.humidity}%
💨 Wind: ${data.wind.speed} m/s
      `.trim();
    } catch (e) {
      return `Weather fetch failed: ${e.message}`;
    }
  },

  // Metadata
  {
    name: "get_weather",
    description: "Fetch current weather for a city.",
    schema: z.object({
      city: z.string().describe("City name to fetch weather for")
    })
  }
);
