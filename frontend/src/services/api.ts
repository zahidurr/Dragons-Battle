import axios from "axios";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const getDragons = () => axios.get(`${BASE_URL}/dragons`);

export const getHistory = () => axios.get(`${BASE_URL}/battle/history`);

export const startBattle = (dragon1Id: number, dragon2Id: number) =>
  axios.post(`${BASE_URL}/battle`, { dragon1Id, dragon2Id });

export const getProbability = (dragon1Id: number, dragon2Id: number) =>
  axios.post(`${BASE_URL}/battle/probability`, { dragon1Id, dragon2Id });
