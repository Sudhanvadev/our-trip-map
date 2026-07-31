import { useEffect, useMemo, useState } from 'react';

const FALLBACK_COORDS = { lat: 23.2167, lon: 72.6833 };

const weatherCodeToText = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Violent showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm + hail',
  99: 'Severe thunderstorm',
};

const weatherCodeToIcon = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌧️',
  56: '🌧️',
  57: '🌧️',
  61: '🌦️',
  63: '🌧️',
  65: '🌧️',
  66: '🌧️',
  67: '🌧️',
  71: '🌨️',
  73: '🌨️',
  75: '❄️',
  77: '❄️',
  80: '🌦️',
  81: '🌧️',
  82: '⛈️',
  85: '🌨️',
  86: '🌨️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
};

const formatDay = (value) =>
  new Date(value).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [locationLabel, setLocationLabel] = useState('Present location: Ahmedabad, Gujarat');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveLocation = async () => {
      if (!navigator.geolocation) {
        setLocationLabel('Present location: Ahmedabad, Gujarat');
        return { latitude: FALLBACK_COORDS.lat, longitude: FALLBACK_COORDS.lon };
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            resolve({ latitude: FALLBACK_COORDS.lat, longitude: FALLBACK_COORDS.lon });
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      });
    };

    const getWeather = async () => {
      setLoading(true);
      try {
        const coords = await resolveLocation();

        const reverseResp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );

        const reverseData = await reverseResp.json();
        const reverseCity = reverseData?.address?.city || reverseData?.address?.town || reverseData?.address?.village || reverseData?.address?.state || 'Your current location';
        const reverseState = reverseData?.address?.state || 'Current region';
        setLocationLabel(`Present location: ${reverseCity}, ${reverseState}`);

        const weatherResp = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto&forecast_days=5`,
          { mode: 'cors' }
        );

        if (!weatherResp.ok) throw new Error('Weather request failed');
        const data = await weatherResp.json();
        setWeather(data);
      } catch {
        setLocationLabel('Present location: Ahmedabad, Gujarat');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const current = weather?.current;
  const daily = weather?.daily;

  const forecastCards = useMemo(() => {
    if (!daily?.time?.length) return [];
    return daily.time.slice(0, 3).map((day, index) => ({
      day: formatDay(day),
      icon: weatherCodeToIcon[daily.weather_code[index]] || '🌤️',
      high: `${Math.round(daily.temperature_2m_max[index])}°`,
      low: `${Math.round(daily.temperature_2m_min[index])}°`,
      rainChance: `${daily.precipitation_probability_max[index] || 0}%`,
    }));
  }, [daily]);

  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/40 bg-white/55 p-4 shadow-[0_25px_80px_-30px_rgba(14,165,233,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_90px_-28px_rgba(14,165,233,0.5)] dark:border-white/10 dark:bg-slate-900/55">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-sky-600 dark:text-sky-300">Gujarat Weather</p>
          <p className="mt-1 text-[12px] font-medium text-slate-600 dark:text-slate-300">{locationLabel}</p>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-200">
          Live
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 px-4 py-5 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300">
          Resolving your current location and weather…
        </div>
      ) : !current ? (
        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          Weather service is temporarily unavailable. Please try again in a moment.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-white/80 via-sky-50/80 to-orange-50/80 p-4 shadow-inner shadow-white/40 dark:from-slate-800/90 dark:via-slate-900/80 dark:to-slate-950/90">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{weatherCodeToIcon[current.weather_code] || '🌤️'}</div>
                <div>
                  <div className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{Math.round(current.temperature_2m)}°C</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">{weatherCodeToText[current.weather_code] || 'Weather'}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-right shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-400">Feels</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-100">{Math.round(current.apparent_temperature)}°C</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/75 px-3 py-2 text-center shadow-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-slate-900/70">
                <div className="text-sm">💧</div>
                <div className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-100">{current.relative_humidity_2m}%</div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400">Humidity</div>
              </div>
              <div className="rounded-xl bg-white/75 px-3 py-2 text-center shadow-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-slate-900/70">
                <div className="text-sm">🌬️</div>
                <div className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-100">{Math.round(current.wind_speed_10m)} km/h</div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400">Wind</div>
              </div>
              <div className="rounded-xl bg-white/75 px-3 py-2 text-center shadow-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-slate-900/70">
                <div className="text-sm">🌧️</div>
                <div className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-100">{current.precipitation.toFixed(1)} mm</div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400">Rain</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {forecastCards.map((item) => (
              <div
                key={item.day}
                className="group rounded-2xl border border-sky-100/80 bg-white/70 px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50/90 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-sky-500/40 dark:hover:bg-slate-800/90"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-400">{item.day}</div>
                <div className="mt-2 text-2xl transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                <div className="mt-2 text-[12px] font-bold text-slate-800 dark:text-white">{item.high} / {item.low}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-300">Rain {item.rainChance}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
