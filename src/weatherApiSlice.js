import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl=process.env.REACT_APP_WEATHER_BASE_URL;
export const fetchWeather=createAsyncThunk("weatherAPI/fetchWeather" ,async ()=>{
    console.log("calling featch weather");
    const response = await axios
    .get(baseUrl);

    
    const responsetemp=Math.round(response.data.main.temp - 272.15);
    const min=Math.round(response.data.main.temp_min -272.15);
    const max=Math.round(response.data.main.temp_max -272.15);
    const description=response.data.weather[0].description;
    const responseIcon=response.data.weather[0].icon;
    const IconLink=`https://openweathermap.org/img/wn/${responseIcon}@2x.png`;
return {number:responsetemp,min,max,description , icon: IconLink};


}
    );
const weatherApiSlice=createSlice({
    name:"weatherApi",
    initialState:{
        resault:"empty",
        weather:"",
        isLoading:false
    },
    reducers:{
        ChangeResult:(currentState,action)=>{
            currentState.resault="changed"
        },
    },
    extraReducers(builder){
        builder.addCase(fetchWeather.pending , (state,action) => {
            console.log("received weatherAPI/fetchWeather/pending");
            console.log(state,action)
            state.isLoading=true;

        }).addCase(fetchWeather.fulfilled ,(state,action)=>{
            
            state.isLoading=false;
            state.weather=action.payload;
        })
        .addCase(fetchWeather.rejected, (state,action) => {
            state.isLoading = false;
        })
    }

});

export const {ChangeResult}=weatherApiSlice.actions;
export default weatherApiSlice.reducer;