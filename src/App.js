import logo from './logo.svg';
import './App.css';
import { useEffect , useState} from 'react';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from "axios";
import moment from "moment"
import "moment/min/locales";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherApiSlice";
import CircularProgress from '@mui/material/CircularProgress';
moment.locale("ar");

export default function App() {
  const isLoading = useSelector((state) => state.weather.isLoading);
  const Temp = useSelector((state) => state.weather.weather);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [dateAndTime, setdateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");

  function handleChangeLanguage() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setdateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }

  useEffect(() => {
    dispatch(fetchWeather());
    i18n.changeLanguage(locale);
    setdateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }, []);

  // تحديد اتجاه النص العام بناءً على اللغة
  const isRtl = locale === "ar";
  const currentDir = isRtl ? "rtl" : "ltr";

  return (
    // الخلفية العامة رمادية فاتحة وناعمة مريحة جداً للعين
    <div className='App' style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Container maxWidth="sm">
        {/* CONTENT CONTAINER */}
        <div 
          style={{
            height: "100vh", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {/* CARD: أبيض ناصع، مرتفع قليلاً بظل ناعم وحواف دائرية احترافية */}
          <div 
            dir={currentDir}
            style={{
              background: "#ffffff",
              color: "#2c3e50", // لون نصوص غامق وأنيق متباين مع الأبيض
              width: "100%",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease"
            }}
          >
            {/* CONTENT */}
            <div>
              {/* CITY & TIME */}
              <div 
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginBottom: "15px"
                }} 
              >
                {/* قراءة اسم المدينة ديناميكياً من السيرفر مع دمج الملف الموحد */}
                <Typography variant="h3" style={{ fontWeight: "700", color: "#1a252f" }}>
                  {t(`${locale}.${Temp.name || 'As-Suwayda'}`)}
                </Typography>
                <Typography variant="body1" style={{ color: "#7f8c8d", fontWeight: "550" }}>
                  {dateAndTime}
                </Typography>
              </div>
              
              <hr style={{ border: "0", height: "1px", backgroundColor: "#eaeded", marginBottom: "20px" }}/>
              
              {/* CONTAINER OF DEGREE */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                {/* DEGREE & DESCRIPTION */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {isLoading ? (
                      <CircularProgress size={40} style={{ color: "#3498db" }}/>
                    ) : (
                      <Typography variant="h1" style={{ fontWeight: "700", color: "#2c3e50" }}>
                        {Temp.number}°
                      </Typography>
                    )}
                    {Temp.icon && <img src={Temp.icon} alt="weather icon" style={{ width: "60px", height: "60px" }}/>}
                  </div>
                  
                  <Typography variant="h6" style={{ color: "#34495e", marginTop: "5px", textTransform: "capitalize", fontWeight: "600" }}>
                    {t(`${locale}.${Temp.description}`)}
                  </Typography>
                  
                  {/* الصغرى والكبرى بتنسيق مرن ومتناسق */}
                  <div style={{ display: "flex", gap: "15px", marginTop: "10px", color: "#7f8c8d" }}>
                    <Typography variant="body2" style={{ fontWeight: "600" }}>
                      {t(`${locale}.min`)}: <span style={{ color: "#e74c3c" }}>{Temp.min}°</span>
                    </Typography>
                    <span style={{ color: "#bdc3c7" }}>|</span>
                    <Typography variant="body2" style={{ fontWeight: "600" }}>
                      {t(`${locale}.max`)}: <span style={{ color: "#2ecc71" }}>{Temp.max}°</span>
                    </Typography>
                  </div>
                </div>

                {/* أيقونة الطقس الجانبية الكبيرة بلون متناسق ومريح للعين */}
                <CloudIcon style={{ fontSize: "120px", color: "#3498db", opacity: "0.8" }} />
              </div>
            </div>
          </div>
          
          {/* TRANSLATION CONTAINER */}
          <div 
            dir={currentDir}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "15px"
            }}
          >
            <Button 
              variant="contained" 
              onClick={handleChangeLanguage}
              style={{
                backgroundColor: "#ffffff",
                color: "#3498db",
                fontWeight: "600",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                textTransform: "none",
                padding: "6px 20px"
              }}
            >
              {locale === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}