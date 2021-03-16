# 如何啟動?

## Step 1

在 vs code 的 terminal 輸入 `git clone https://github.com/895623741x/Dcard-Intern-Assignment.git`



## Step 2

待 `git clone` 完成後在 terminal 輸入 `cd Dcard-Intern-Assignment` 進入 folder

## Step 3

輸入 `npm install` 以安裝所需 libraries


## Step 4

待npm install完成後, 在 terminal 輸入 `npm start`。 等待幾秒鐘後, 就可以在網頁上使用

## Step 5

將開啟後的route更改為 `http://localhost:3000/scenicSpot` 即可進入首頁

# 作業架構設計說明

## 1. 
Header 的頁面轉換我選擇router-router-dom, 如此一來在按下所選地點時就不需要每次重整頁面

## 2. 
對於api的串接我選擇使用 axios, 個人認為 axios 的 syntax 比 fetch 相對簡單

## 3.
全部景點的按鈕為"Taiwan", 其他縣市則用英文代表如金門縣為 KinmenCounty, 台南市為 Tainan
