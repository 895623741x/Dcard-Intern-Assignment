# 如何啟動?

## Step 1

在 vs code 的 terminal 輸入 `git clone https://github.com/895623741x/Dcard-Intern-Assignment.git`

## Step 2

待 `git clone` 完成後在 terminal 輸入 `cd Dcard-Intern-Assignment` 進入 folder

## Step 3

輸入 `npm install` 以安裝所需 libraries

## Step 4

待 npm install 完成後, 在 terminal 輸入 `npm start`。 等待幾秒鐘後, 就可以在網頁上使用

## Step 5

將開啟後的 route 更改為 `http://localhost:3000/scenicSpot` 即可進入首頁

# 作業架構設計說明

## 1.

Header 的頁面轉換我選擇 router-router-dom, 如此一來在就不用重繪每一個新分頁而浪費效能因為每個頁面基本上一致

## 2.

對於 api 的串接我選擇使用 axios, 個人認為 axios 的 syntax 比 fetch 相對簡單

## 3.

全部景點(scenicSpot)的按鈕為"Taiwan", 其他縣市(scenicSpot/{City})則用英文代表如金門縣為 KinmenCounty, 台南市為 Tainan 等等
