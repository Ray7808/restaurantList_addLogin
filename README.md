# 餐廳清單\_v2

此專案主要透過 mongoDB 與 Express 建立餐廳資料與 API，進行 CRUD 與顯示、搜尋餐廳名稱及詳細資訊。

## 產品功能

-   承接前個餐廳清單的功能(搭配模板引擎(handlebars)顯示餐廳資訊、製作搜尋欄)
-   利用 mongoDB 搭配 Robo 3T 建立多個餐廳資訊
-   利用種子資料，可快速建立餐廳資訊的初始資訊
-   新增創建刪除跟編輯餐廳資訊的功能

## 專案畫面

![image](https://github.com/Ray7808/restaurantList_v2/blob/main/img/AllRestaurantsInfo.png)

![image](https://github.com/Ray7808/restaurantList_v2/blob/main/img/OneRestaurantInfo.png)

![image](https://github.com/Ray7808/restaurantList_v2/blob/main/img/deleteInfo.png)

![image](https://github.com/Ray7808/restaurantList_v2/blob/main/img/editInfo.png)

## 安裝流程

1. git clone 下載檔案

    ```
    git clone https://github.com/Ray7808/restaurantList.git
    ```

2. 安裝相關套件

    ```
    npm install
    ```

3. 新增種子資料

    ```
    npm run seed
    ```

4. 執行程式
    ```
    npm run start
    ```

## 使用的套件

-   Bootstrap
-   Express
-   Handlebars
-   Nodemon
-   dotenv
-   body-parser
-   mongodb
-   mongoose
