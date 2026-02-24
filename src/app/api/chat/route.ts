import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// Types for tools
interface WeatherResponse {
  latitude: number;
  longitude: number;
  current?: {
    temperature_2m: number;
    windspeed_10m: number;
    weathercode: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

// Tool: Get Weather
async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("current", "temperature_2m,windspeed_10m,weathercode");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());
  return response.json();
}

// Tool: Get News from RSS
async function getNews(rssUrl: string): Promise<NewsItem[]> {
  try {
    // Use a CORS proxy for RSS feeds
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    
    if (data.status === "ok" && data.items) {
      return data.items.slice(0, 5).map((item: { title?: string; link?: string; pubDate?: string; contentSnippet?: string }) => ({
        title: item.title || "Sin título",
        link: item.link || "",
        pubDate: item.pubDate || "",
        contentSnippet: item.contentSnippet || "",
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// City coordinates mapping
const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  "paris": { lat: 48.8566, lon: 2.3522 },
  "madrid": { lat: 40.4168, lon: -3.7038 },
  "new york": { lat: 40.7128, lon: -74.0060 },
  "london": { lat: 51.5074, lon: -0.1278 },
  "tokyo": { lat: 35.6762, lon: 139.6503 },
  "sydney": { lat: -33.8688, lon: 151.2093 },
  "berlin": { lat: 52.5200, lon: 13.4050 },
  "rome": { lat: 41.9028, lon: 12.4964 },
  "barcelona": { lat: 41.3851, lon: 2.1734 },
  "mexico": { lat: 19.4326, lon: -99.1332 },
  "buenos aires": { lat: -34.6037, lon: -58.3816 },
  "lima": { lat: -12.0464, lon: -77.0428 },
  "bogota": { lat: 4.7110, lon: -74.0721 },
  "sao paulo": { lat: -23.5505, lon: -46.6333 },
  "santiago": { lat: -33.4489, lon: -70.6693 },
};

// RSS Feed URLs
const rssFeeds: Record<string, string> = {
  "tech": "https://techcrunch.com/feed/",
  "world": "https://feeds.bbci.co.uk/news/world/rss.xml",
  "hacker": "http://news.ycombinator.com/rss",
  "science": "https://www.sciencedaily.com/rss/all.xml",
  "business": "https://feeds.bbci.co.uk/news/business/rss.xml",
};

// Weather code descriptions
const weatherCodes: Record<number, string> = {
  0: "Despejado",
  1: "Parcialmente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna densa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia fuerte",
  71: "Nevada ligera",
  73: "Nevada moderada",
  75: "Nevada fuerte",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos fuertes",
  95: "Tormenta",
  96: "Tormenta con granizo ligero",
  99: "Tormenta con granizo fuerte",
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const zai = await ZAI.create();

    // System prompt for the AI agent
    const systemPrompt = `<role>
You are the n8n Demo AI Agent, a friendly and helpful assistant designed to showcase the power of AI agents. Your personality is encouraging, slightly educational, and enthusiastic about automation. You are conversational and respond in the same language the user speaks.

You have access to these tools:
1. **Get Weather**: Get weather forecast for any city. Just provide the city name.
2. **Get News**: Get the latest news from various categories (tech, world, hacker, science, business).

When a user asks about weather, call the weather function with the appropriate city.
When a user asks about news, call the news function with the appropriate category.

Current date & time: ${new Date().toLocaleString()}
</role>

<output_format>
- Respond in a friendly, conversational, and helpful tone.
- When presenting weather, format it nicely with temperature, conditions, and forecast.
- When presenting news, list the top headlines with brief summaries.
- Be proactive. If the user is unsure what to do, suggest some examples of what they can ask.
</output_format>`;

    // Prepare messages for the AI
    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // First, get the AI's response
    const completion = await zai.chat.completions.create({
      messages: conversationMessages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    let aiResponse = completion.choices[0]?.message?.content || "";

    // Check if we need to call tools based on the response or user message
    const lastUserMessage = messages.filter((m: { role: string; content: string }) => m.role === "user").pop()?.content?.toLowerCase() || "";

    // Weather detection
    let weatherData: WeatherResponse | null = null;
    let cityFound = "";

    for (const [city, coords] of Object.entries(cityCoordinates)) {
      if (lastUserMessage.includes(city) || lastUserMessage.includes(`clima`) || lastUserMessage.includes(`weather`) || lastUserMessage.includes(`tiempo`)) {
        if (lastUserMessage.includes(city)) {
          cityFound = city;
          weatherData = await getWeather(coords.lat, coords.lon);
          break;
        }
      }
    }

    // If asking about weather but city not found in message, try to extract or ask
    if (!weatherData && (lastUserMessage.includes("clima") || lastUserMessage.includes("weather") || lastUserMessage.includes("tiempo"))) {
      // Try to find any city mentioned
      for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (lastUserMessage.includes(city)) {
          cityFound = city;
          weatherData = await getWeather(coords.lat, coords.lon);
          break;
        }
      }
    }

    // News detection
    let newsData: NewsItem[] = [];
    let newsCategory = "";

    if (lastUserMessage.includes("noticias") || lastUserMessage.includes("news") || lastUserMessage.includes("titulares")) {
      for (const [category, url] of Object.entries(rssFeeds)) {
        if (lastUserMessage.includes(category) || 
            (category === "tech" && (lastUserMessage.includes("tech") || lastUserMessage.includes("tecnología"))) ||
            (category === "world" && (lastUserMessage.includes("world") || lastUserMessage.includes("mundo"))) ||
            (category === "hacker" && (lastUserMessage.includes("hacker") || lastUserMessage.includes("programación")))) {
          newsCategory = category;
          newsData = await getNews(url);
          break;
        }
      }
      // Default to tech news if no specific category
      if (newsData.length === 0) {
        newsCategory = "tech";
        newsData = await getNews(rssFeeds["tech"]);
      }
    }

    // Enrich the response with tool data
    if (weatherData && cityFound) {
      const current = weatherData.current;
      const weatherDesc = current ? weatherCodes[current.weathercode] || "Desconocido" : "N/A";
      const temp = current?.temperature_2m || 0;
      const wind = current?.windspeed_10m || 0;
      
      aiResponse = `🌤️ **Clima en ${cityFound.charAt(0).toUpperCase() + cityFound.slice(1)}**\n\n` +
        `**Temperatura actual:** ${temp}°C\n` +
        `**Condición:** ${weatherDesc}\n` +
        `**Velocidad del viento:** ${wind} km/h\n\n` +
        `_Datos obtenidos de Open-Meteo API_`;
    }

    if (newsData.length > 0) {
      let newsResponse = `📰 **Últimas noticias de ${newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1)}**\n\n`;
      newsData.forEach((item, index) => {
        newsResponse += `${index + 1}. **${item.title}**\n` +
          `   ${item.contentSnippet?.substring(0, 150)}...\n` +
          `   [Leer más](${item.link})\n\n`;
      });
      aiResponse = newsResponse;
    }

    return NextResponse.json({
      message: aiResponse,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Error processing your request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
