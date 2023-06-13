const normalquiz = [
    {
        question: '次のアラバスタの町を麦わらの一味が訪れた順に並び替えよ',
        options: [
            'レインベース',
            'ユバ',
            'ナノハナ',
            'エルマル',
        ],
        correct: [
            'ナノハナ',            
            'エルマル',
            'ユバ',
            'レインベース',
        ],
    },{
        highlevel:'高難易度',
        question: 'シェルズタウンにいる海兵を次の内から全て選べ',
        options: [
            'リッパー中佐',
            'ウッカリー三等兵',
            'ロッカク中尉',
            'ジョン・ジャイアント',
        ],
        correct:  [
            'リッパー中佐',
            'ウッカリー三等兵',
            'ロッカク中尉',
        ],
    },{
        highlevel:'高難易度',
        question: 'リカの母の名前を答えよ',
        correct: 'リリカ',
    },{
        question: 'シェルズタウンでルフィが使った技を次の内から全て選べ',
        options: [
            'ゴムゴムの銃',
            'ゴムゴムの銃乱打',
            'ゴムゴムの鞭',
            'ゴムゴムのロケット',
        ],
        correct: [
            'ゴムゴムの銃',
            'ゴムゴムの鞭',
            'ゴムゴムのロケット',
        ],
    },{
        question:'ベガパンクの猫の一人である「悪」の読み方をカタカナで答えよ',
        correct:'リリス',
    },{
        question:'ベガパンクの猫の一人である「知」の読み方をカタカナで答えよ',
        correct:'ピタゴラス',
    },{
        question:'ベガパンクの猫の一人である「欲」の読み方をカタカナで答えよ',
        correct:'ヨーク',
    },{
        question:'ベガパンクの猫の一人である「正」の読み方をカタカナで答えよ',
        correct:'シャカ',
    },{
        question: 'クロコダイル、ミホーク、バギーが設立した組織の名前を答えよ',
        correct: 'クロスギルド',
    },{
        question: 'サボが五老星やイム様に放った技名を答えよ。スペースや「！」「・」などの記号は不要とする。',
        correct: '火拳王手飛車',
    },
];

const extraquiz = [
    {
        question: 'ショコラの好物を答えよ',
        correct: 'オレンジサワー',            
        
    },{
        question: 'ニセフランキーの本名を次の内から一つ選べ',
        options: [
            'ドリップ',
            'ココア',
            'トルコ',
            'マンジャロウ',
        ],
        correct: 'トルコ',
    },{
        question: '黄猿の好物を次の内から全て選べ',
        options: [
            'レモン',
            'みそラーメン',
            'しょうが',
            'バナナ',
        ],
        correct: [
            'みそラーメン',
            'しょうが',
            'バナナ'
        ],
    },{
        question: 'トルコの好物を答えよ',
        correct: 'アイスクリーム',
    },{
        question:'800年前のアラバスタ王国の王女をフルネームで答えよ',
        correct:'ネフェルタリ・リリィ',
    },
];


const $main = document.getElementById('main');
const $timer = document.getElementById('timer');
const $questionNumber = document.getElementById('questionNumber');
const $numberofquestion = document.getElementById('numberofquestion');
const $questiontype = document.getElementById('questiontype');
const $level = document.getElementById('level');
const $question = document.getElementById('question');
const $button = document.querySelectorAll('.option-btn');
const $input = document.getElementById('input');
const $decide = document.getElementById('decide');
const $result = document.getElementById('result');

let quizNumber = 0;
let answerorder = [];
let score = 0;


//問題文と選択肢を表示させる
const init = () =>{
    $questionNumber.firstChild.textContent  = `第${quizNumber + 1}問`;
    $numberofquestion.textContent =  `/${quiz.length}問`;
    $question.textContent = quiz[quizNumber].question;
    

    for(let i = 0; i < $button.length; i++){
        $button[i].classList.add('hidden');
        }
    $input.classList.add('hidden');
        
    //選択問題と記述問題とで条件分岐
        if(quiz[quizNumber].hasOwnProperty('options')){
        //一問一答
        $questiontype.textContent = '[一問一答]';
        for(let i = 0; i < $button.length; i++){
            $button[i].classList.remove('hidden');
            }

        let optionNumber = 0;
        while(optionNumber < $button.length){
            $button[optionNumber].textContent = quiz[quizNumber].options[optionNumber];
            optionNumber++;
        }
        
        if(Array.isArray(quiz[quizNumber].correct)){
            //一問多答
            $questiontype.textContent = '[一問多答]';
            if(quiz[quizNumber].correct.length === quiz[quizNumber].options.length){
                //並び替え
                $questiontype.textContent = '[並び替え]';
                for(let i = 0; i < $button.length; i++){
                    let orderElement = document.createElement('div');
                    $button[i].insertBefore(orderElement,$button[i].firstChild);
                
            }
            
        answerorder = [];
            
        }}
    
    }else{
        //記述
        $questiontype.textContent = '[記述]';
        $input.classList.remove('hidden');
        

    }
    
    //高難易度表示
    if(quiz[quizNumber].hasOwnProperty('highlevel')){
        $level.textContent = '高難易度';
    }else{
        $level.textContent = null;
    }
    
        


    //エクストラで制限時間表示
    if(quiz === extraquiz){
        clearTimeout(countdown);
        if(quiz[quizNumber].hasOwnProperty('options')){
            timer(60);
        }else{
            timer(90);
        }
        
    }

    $decide.disabled = true;

};


//選択肢を選ぶ
const selectanswer = ()=>{
    for(let i = 0; i < $button.length; i++){
        $button[i].addEventListener('click', (e)=>{

         //一問一答かどうか
        if(!Array.isArray(quiz[quizNumber].correct)){
            //一問一答押したボタン一つだけ色変わる
            if(e.target.classList.contains('clicked')){
                e.target.classList.remove('clicked');
            }
            else{
                for(let i = 0; i < $button.length; i++){
                    if($button[i].classList.contains('clicked')){
                        $button[i].classList.remove('clicked');
                    }
                }
                e.target.classList.add('clicked');
            }
            //ボタン選んだら決定ボタン使えるようになる
            if(e.target.classList.contains('clicked')){
                $decide.disabled = false;
            }else{
                for(let i = 0; i < $button.length; i++){
                    if($button[i].classList.contains('clicked')){
                        $decide.disabled = false;
                    }else{
                        $decide.disabled = true;
                    }
                }
            }
            
        }else if (Array.isArray(quiz[quizNumber].correct)){
            //並べ替え問題
            if(quiz[quizNumber].correct.length === quiz[quizNumber].options.length){
                e.currentTarget.classList.toggle('clicked');
                e.currentTarget.firstChild.classList.add('order');

                if(e.currentTarget.classList.contains('clicked')){
                    answerorder.push(e.currentTarget.textContent);
                    e.currentTarget.firstChild.textContent = answerorder.length;
                                                        
                }else{
                    //並べ替え番号変わる
                    for(let i = 0; i < $button.length; i++){
                        if($button[i].firstChild.textContent > e.currentTarget.firstChild.textContent){
                            $button[i].firstChild.textContent = Number($button[i].firstChild.textContent) - 1;
                     }}

                    e.currentTarget.firstChild.textContent = null;
                    
                   //indexofとsplice組み合わせる
                   answerorder.splice(answerorder.indexOf(e.currentTarget.textContent),1);
                  

                }
                //全てのボタン選択したら決定ボタン押せるようになる
                    if(answerorder.length === quiz[quizNumber].correct.length){
                        $decide.disabled = false;
                    }else{
                        $decide.disabled = true;
                    }
                    

            }else{ //一問多答
                e.target.classList.toggle('clicked');

                //ボタン選んだら決定ボタン使えるようになる
                if(e.target.classList.contains('clicked')){
                    $decide.disabled = false;
                }else{
                    $decide.disabled = true;
                    for(let i = 0; i < $button.length; i++){
                        if($button[i].classList.contains('clicked')){
                            $decide.disabled = false;
                        }
                    }
                }
            }
        }
        
        });

        
    };

};

//記述答え入力
const inputanswer =()=>{
    const $input = document.getElementById('input');
    $input.addEventListener('input',()=>{
        $decide.disabled = false;
    })
};


//答え決定、正誤判定 
const judge = ()=>{
    $decide.addEventListener('click',()=>{
        if(quiz[quizNumber].hasOwnProperty('options')){
            //選択問題
            if(Array.isArray(quiz[quizNumber].correct)){

                if(quiz[quizNumber].correct.length === quiz[quizNumber].options.length){
                    //並び替え
                    if(answerorder.toString() === quiz[quizNumber].correct.toString()){
                        score++;
                    }
                    console.log(answerorder.toString());
                }else{
                    //一問多答
                    let answer = document.querySelectorAll('.clicked');
                    let answerbox = [];
                    for(let i = 0; i < answer.length; i++){
                        answerbox.push(answer[i].textContent);
                    }
                    if(answerbox.toString() === quiz[quizNumber].correct.toString()){
                        score++;
                    }   
                    console.log(answerbox.toString());
                }                
            }else{
                //一問一答
                let answer = document.querySelector('.clicked');
                console.log(answer.textContent);
                    if(answer.textContent === quiz[quizNumber].correct){
                score++;
                }                
            }
            console.log('score ' + score);
            for(let i = 0; i < $button.length; i++){
            $button[i].classList.remove('clicked');
            }
            gotonext ();
        }else{
            //記述問題
            console.log($input.value)
            if($input.value === quiz[quizNumber].correct){
                score++;
            }
            console.log('score ' + score);
            $input.value = '';
            gotonext ();
        }  
        
        //エクストラ3問誤答で終了
        if(quiz === extraquiz){
            if(quizNumber - score === 3){
                clearTimeout(countdown);
                finish();
            }
        }    
    })
};


//次の問題表示か終了
const gotonext = () =>{
    quizNumber++;
    if(quizNumber < quiz.length){
        init();
    }else{
        finish();
    }
};

//制限時間
let countdown;
const timer = (settime)=>{
    settime--;
    let min = Math.floor(settime / 60).toString().padStart(2,'0');
    let sec = (settime % 60).toString().padStart(2,'0');
    $timer.textContent = min + ':'+ sec;
        
    if(quiz === normalquiz){
        //ノーマル
        if(settime === 0){
            finish();
            
        }else if(quizNumber < quiz.length){
            setTimeout(timer,1000,settime);
        }    
    }else{
        //エクストラ
        if(settime === 0){
            gotonext();
            
        }else if(quizNumber < quiz.length){
           countdown = setTimeout(timer,1000,settime);
        }   
    }
    
};


let quiz = normalquiz;
timer(600);
init ();
selectanswer();
inputanswer();
judge();

//結果画面表示
const finish = ()=>{
    if(quiz === normalquiz){
        console.log('result ' + score);
        $main.classList.add('hidden');
        $result.firstChild.textContent = '終了！あなたのスコアは' + score + '/' + quiz.length + 'です';
        if(score >= quiz.length*0.9){
            const $extra = document.createElement('button');
            $extra.setAttribute('type','button');
            $extra.setAttribute('id','extra');
            $extra.textContent = 'エクストラステージに進む';
            $result.appendChild($extra);
            $result.lastChild.addEventListener('click',()=>{
                $main.classList.remove('hidden');
                $result.classList.add('hidden');
                quizNumber = 0;
                score = 0;
                quiz = extraquiz;
                init();            
            });
        }
            }else{
        console.log('result ' + score);
        $main.classList.add('hidden');
        $result.firstChild.textContent = '終了！あなたのスコアは' + score + '/' + quiz.length + 'です';
        $result.classList.remove('hidden');
        $result.lastChild.classList.add('hidden');

    }
    

};
