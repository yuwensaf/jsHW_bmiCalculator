
// 指定 dom
let recordsWrap = document.querySelector('.records-wrap');

let inputHeight = document.getElementById('inputHeight');
let inputWeight = document.getElementById('inputWeight');
let seeResult = document.querySelector('.seeResult');
let calResult = document.querySelector('.cal-result');
let resultLayout = document.querySelector('.result-layout');
let resultNum = document.querySelector('.result-num');
let refresh = document.querySelector('.refresh');
let resultStatus = document.querySelector('.result-status');
let resultText = document.querySelector('.result-text');
let saveResult = document.querySelector('.saveResult'); // 儲存結果
let removeRecord = document.querySelector('.remove-record'); // 清除所有記錄

let data = JSON.parse(localStorage.getItem('dataItem')) || []; // data 陣列

// 取得時間
let d = new Date();
let day = d.getDate();
let month = d.getMonth() + 1;
let year = d.getFullYear();

// init: 網頁一載入，就先執行「更新介面」
updateList();

// 綁定監聽事件
seeResult.addEventListener('click', getInput, false); // 點擊「看結果」，就會顯示結果在「右邊的圓圈裡」
refresh.addEventListener('click', refreshInput, false); // 點擊「refresh 按鈕」，就會把「input 欄位」都清空
saveResult.addEventListener('click', pushItem, false); // 點擊「儲存結果」，就會把“該次結果”儲存到「localStorage」裡面，同時「更新下方的介面」
removeRecord.addEventListener('click', remove, false); // 點擊「清除所有記錄」按鈕，就會清空「data 陣列」裡面的物件

function getInput(e){
    e.preventDefault();
    let currentHeight = Math.round(inputHeight.value); // 四捨五入
    let currentWeight = Math.round(inputWeight.value); // 四捨五入

    if (currentHeight === '' || currentHeight === '0' || currentWeight === '' || currentWeight === '0'){
        alert('請填入身高與體重，數值不可為 0');
    }else{
        showResult(); // 顯示在畫面上「右邊的圓圈裡」
    }
}

// 顯示在畫面上「右邊的圓圈裡」
function showResult(){
    let currentHeight = Math.round(inputHeight.value); // 四捨五入
    let currentWeight = Math.round(inputWeight.value); // 四捨五入
    let currentBmi = Math.round((currentWeight / Math.pow(currentHeight / 100, 2)) * 100) / 100; // 小數點兩位數的四捨五入

    switch (true) {
        case currentBmi < 18.5:
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #31BAF9';
            resultLayout.style.color = '#31BAF9';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#31BAF9';
            resultStatus.style.color = '#31BAF9';
            resultText.textContent = '過輕';
            break;
        case ((18.5 <= currentBmi) && (currentBmi < 25)):
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #86D73F';
            resultLayout.style.color = '#86D73F';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#86D73F';
            resultStatus.style.color = '#86D73F';
            resultText.textContent = '理想';
            break;
        case ((25 <= currentBmi) && (currentBmi < 30)):
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #FF982D';
            resultLayout.style.color = '#FF982D';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#FF982D';
            resultStatus.style.color = '#FF982D';
            resultText.textContent = '過重';
            break;
        case ((30 <= currentBmi) && (currentBmi < 35)):
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #FF6C03';
            resultLayout.style.color = '#FF6C03';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#FF6C03';
            resultStatus.style.color = '#FF6C03';
            resultText.textContent = '輕度肥胖';
            break;
        case ((35 <= currentBmi) && (currentBmi < 40)):
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #FF6C03';
            resultLayout.style.color = '#FF6C03';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#FF6C03';
            resultStatus.style.color = '#FF6C03';
            resultText.textContent = '中度肥胖';
            break;
        case currentBmi >= 40:
            seeResult.style.display = 'none';
            calResult.style.display = 'flex';
            resultLayout.style.border = '6px solid #FF1200';
            resultLayout.style.color = '#FF1200';
            resultNum.textContent = currentBmi;
            refresh.style.backgroundColor = '#FF1200';
            resultStatus.style.color = '#FF1200';
            resultText.textContent = '重度肥胖';
            break;
    }

    // 顯示出右側的「儲存結果」按鈕
    saveResult.style.display = 'flex';
}

// 把「input 欄位」都清空
function refreshInput(e){
    e.preventDefault();
    inputHeight.value = '';
    inputWeight.value = '';
    seeResult.style.display = 'flex';
    calResult.style.display = 'none';
    saveResult.style.display = 'none';
}

function pushItem(e){
    e.preventDefault();
    let currentHeight = Math.round(inputHeight.value); // 四捨五入
    let currentWeight = Math.round(inputWeight.value); // 四捨五入
    let currentBmi = Math.round((currentWeight / Math.pow(currentHeight / 100, 2)) * 100) / 100; // 小數點兩位數的四捨五入

    let item = {
        bmi: currentBmi,
        weight: currentWeight,
        height: currentHeight
    }

    data.push(item); // 把「item 物件」一個一個新增到「data 陣列」裡面

    saveLocalStorage(); // 每新增一個「item 物件」到「data 陣列」裡面，就儲存一次到「localStorage」裡面
}

// 儲存到「localStorage 裡面」
function saveLocalStorage() {
    let dataString = JSON.stringify(data); // 先把「data 陣列」變為「字串」
    localStorage.setItem('dataItem', dataString); // 把「data 陣列」變為「字串」後，就可以儲存到 localStorage 裡面

    updateList(); // 每儲存一次到「localStorage」裡面，就更新一次介面
}

// 更新下方的介面
function updateList(){
    let dataLen = data.length;
    let str = '';
    for(let i=0; i<dataLen; i++){
        // 先用 switch 把對應的字都找好
        switch (true) {
            case data[i].bmi < 18.5:
                data[i].status = '過輕';
                data[i].borderColor = '#31BAF9';
                data[i].color = 'rgba(49,186,249,0.29)';
                break;
            case ((18.5 <= data[i].bmi) && (data[i].bmi < 25)):
                data[i].status = '理想';
                data[i].borderColor = '#86D73F';
                data[i].color = 'rgba(134,215,63,0.29)';
                break;
            case ((25 <= data[i].bmi) && (data[i].bmi < 30)):
                data[i].status = '過重';
                data[i].borderColor = '#FF982D';
                data[i].color = 'rgba(255,152,45,0.29)';
                break;
            case ((30 <= data[i].bmi) && (data[i].bmi < 35)):
                data[i].status = '輕度肥胖';
                data[i].borderColor = '#FF6C03';
                data[i].color = 'rgba(255,108,3,0.29)';
                break;
            case ((35 <= data[i].bmi) && (data[i].bmi < 40)):
                data[i].status = '中度肥胖';
                data[i].borderColor = '#FF6C03';
                data[i].color = 'rgba(255,108,3,0.29)';
                break;
            case data[i].bmi >= 40:
                data[i].status = '重度肥胖';
                data[i].borderColor = '#FF1200';
                data[i].color = 'rgba(255,18,0,0.29)';
                break;
        }

        // 字都找好後，最後才來組字串
        str += `<div class="records-item">
                    <div class="row item">
                        <div class="col-md-2 px-0 d-flex align-items-center item-layout status-layout">
                            <div class="border-layout" style="background-color: ${data[i].borderColor}; color: ${data[i].color}"></div>
                            <p class="status">${data[i].status}</p>
                        </div>
                        <div class="col-md-3 d-flex align-items-center item-layout bmi-layout">
                            <p class="bmi font-sm">BMI <span class="bmi-num font-lg">${data[i].bmi}</span></p>
                        </div>
                        <div class="col-md-5 px-0 d-flex align-items-center item-layout">
                            <p class="weight font-sm">weight <span class="weight-num font-lg">${data[i].weight}kg</span></p>
                            <p class="height font-sm">height <span class="height-num font-lg">${data[i].height}cm</span></p>
                        </div>
                        <div class="col-md-2 px-0 d-flex align-items-center item-layout">
                            <p class="date font-sm"><span class="month">${month}</span>-<span class="day">${day}</span>-<span class="year">${year}</span></p>
                        </div>
                    </div>
                    <a href="#" class="delThis" data-index="${i}">刪除</a>
                </div>`;

    }

    recordsWrap.innerHTML = str;

}

// 清除單一記錄
recordsWrap.addEventListener('click', delThis, false); // 監聽整個 recordsWrap，來偵測裡面的每一個「a 連結（刪除按鈕）」
function delThis(e){
    e.preventDefault();
    let target = e.target.nodeName; // 選取「我目前點擊到的元素」
    // 如果「我目前點擊到的元素」是「a 連結」
    if(target === 'A'){
        let index = e.target.dataset.index;
        data.splice(index, 1);
        saveLocalStorage(); // 刪除完「data 陣列」的資料後，也要更新 localStorage
        updateList(); // 刪除完「data 陣列」的資料後，也要再更新一次介面
    }
}

// 清除所有記錄
function remove(e){
    e.preventDefault();
    let dataLen = data.length;
    data.splice(0, dataLen);
    saveLocalStorage(); // 刪除完「data 陣列」的資料後，也要更新 localStorage
    updateList(); // 把「data 陣列」清空之後，再更新一次介面

    inputHeight.value = '';
    inputWeight.value = '';
    seeResult.style.display = 'flex';
    calResult.style.display = 'none';
    saveResult.style.display = 'none';
}








