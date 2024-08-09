'use strict';

//出題される問題
const questions =[
    'JavaScript',
    'document',
    'window',
    'getElementById',
    'getElementsByClassName',
    'addEventListener'
];

const entered = document.getElementById('entered');
const remained = document.getElementById('remained');
const inputText = document.getElementById('inputText');
const game = document.getElementById('game');
const message = document.getElementById('message');
const replayBtn = document.getElementById('replayBtn');

let remainedTextWords = remained.textContent.split('');
let enteredTextWords = [];
let currentKey;
let currentText;


//新しい問題文をランダムにセットする関数
const setQuestion =() => {

    //問題文をランダムで選ぶ
    currentKey = Math.floor(Math.random() * questions.length);
    currentText = questions[currentKey];

    //一度選ばれた問題は配列から削除
    questions.splice(currentKey, 1);

    //画面に新しい問題文をセット
    entered.textContent =""
    remained.textContent = currentText;

    //これまでのフォームに入力された値をリセット
    inputText.value='';

    //入力ずみ文字、未入力文字の配列の中身をリセット
    enteredTextWords = []
    remainedTextWords = currentText.split('');
};

setQuestion();

document.addEventListener('input', (e) => {
    if(remainedTextWords[0] === e.data){

        // 入力済み文字の配列の最後に1文字追加
        enteredTextWords.push(remainedTextWords[0]);
        // 未入力文字の配列の先頭から1文字削除
        remainedTextWords.shift();

        // 入力済みテキスト＆未入力テキストを連結して画面表示
        entered.textContent = enteredTextWords.join('');
        remained.textContent = remainedTextWords.join('');

        // 全文字入力したら新しい問題文をセット
        if(remainedTextWords.length <= 0){
            if(questions.length <= 0){
                game.classList.add('hidden'); // ゲーム画面を非表示
                message.classList.remove('hidden'); // 終了メッセージ表示
            }else{
                setQuestion(); // 新しい問題文をセット
            }
        }
    }
});

// もう一度プレイするボタン
replayBtn.addEventListener('click', () => {
    window.location.reload();
});