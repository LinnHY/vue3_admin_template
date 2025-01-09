//品牌管理模块的接口
import request from "../../../utils/request";
import {
  TradeMarkResponseData,
  TradeMark,
} from "../../../views/product/trademark/type";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETE_URL = "/admin/product/baseTrademark/remove/",
}
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    //有id，是update请求
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    //没有id，是append请求
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id);
