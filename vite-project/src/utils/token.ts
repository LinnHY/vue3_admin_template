// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};

export const GET_TOKEN = () => {
  console.log("localStorage.getItem('TOKEN')=", localStorage.getItem("TOKEN"));
  return localStorage.getItem("TOKEN");
};

export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN");
};
