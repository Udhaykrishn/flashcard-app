import Cookies from "universal-cookie";

const cookies = new Cookies();
export const token = cookies.get("access_token");
