# 餐廳清單\_v3

此專案主要透過 mongoDB 與 Express 建立餐廳資料與 API，進行 CRUD 與顯示、搜尋餐廳名稱及詳細資訊。

## 產品功能

-   承接前個餐廳清單的功能(搭配模板引擎(handlebars)顯示餐廳資訊、製作搜尋欄、搭配 mongoose 以及種子資料)
-   利用 express.Router()簡化路由設定
-   加入排序(sorting)功能，可以更方便查找想要的餐廳資料
-   參考 RESTful 設計，利用 method-override 建立 GET,POST,PUT,DELETE 使路由帶有語義

## 專案畫面

![image](https://github.com/Ray7808/restaurantList_v3/blob/main/img/MainImage.png)

![image](https://github.com/Ray7808/restaurantList_v3/blob/main/img/SortingList.png)

![image](https://github.com/Ray7808/restaurantList_v3/blob/main/img/SortedImage.png)

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
-   method-override
