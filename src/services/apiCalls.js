import axios from "axios"

// const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
const mainApi = `https://www.themealdb.com`

const HomeApi = () => {
    return axios.get(`${mainApi}/api/json/v1/1/search.php?s=`);
}

const categoryApi = () => {
    return axios.get(`${mainApi}/api/json/v1/1/categories.php`);
}

const itemDetailsApi = (propsId) => {
    return axios.get(`${mainApi}/api/json/v1/1/lookup.php?i=${propsId}`)
}

const searchMealApi = (query) => {
  return axios.get(`${mainApi}/api/json/v1/1/search.php?s=${query}`);
};


export {HomeApi , categoryApi , itemDetailsApi , searchMealApi};