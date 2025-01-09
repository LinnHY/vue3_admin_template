import requests
import time
import re

ID = "5679"
Cookie = ('.AspNetCore.Cookies=CfDJ8La7H0hnjYJKkD5V5Iveu8j-8GSl3G7cc2Q1PqRJFuyTp0sKlBh674U8OMFNjjfe0Py5yLt5gbWIrDl76tEZK4Wyjq35mgr4ypEgVDNgNSvrAAxihYTd03O_Di6_dbqZgO323gyjcPPrYRWrBHuU-GRof4IbYnt5_O-JBd5R5FqV024zM8Js9-pMXiMVon6HAayIaQNprVEZcFsZtUTZVtPYjS0pCnaPpHg1mGrCzIuaX9p_NPRLss6ncQFmWO5XVPK62WaOuhm9TmJrFELhiFUeGUJ4WPXZvKNH6aVGwPDC; .ROLE=Author; .TRACK=1')
url = f"https://cmt3.research.microsoft.com/api/odata/ICASSP2025/Submissions({ID})"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Cookie": Cookie
}
p = 600  # 请保证>10，否则后果自负

def fetch_data():
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            res = response.text
            StatusId = re.findall('"StatusId":(.*?),', res)[0]
            return StatusId
        else:
            print(f"请求失败，状态码: {response.status_code}")
            return None
    except Exception as e:
        print(f"请求出错: {e}")
        return None

def main():
    print("开始轮询查询接口...")
    try:
        while True:
            data = fetch_data()
            if data:
                print(f"StatusId={data}")
            else:
                print("未获取到有效数据。")
            
            time.sleep(p)
    except KeyboardInterrupt:
        print("轮询已手动停止。")

if __name__ == "__main__":
    main()
