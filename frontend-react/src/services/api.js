import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getRuns = () => API.get("/pipeline");

export const getBranchSummary = (branch) =>
  API.get(`/pipeline/summary/${branch}`);