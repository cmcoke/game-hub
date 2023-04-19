import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "5d587448e94441979dcaa3f45ed08a2e"
  }
});
