var correct_answer=0;
var wrong_answer=0;
var unanswer=0;
var current_index=0;
var q_index_array=[];//temp array for randomly shuffle questions
var a_index_array=[];//temp array for randomly shuffle answers

var timer = {
    second:30,
    reset : function(){
        timer.second = 30;
        $('.timer_scr').html("Time Remaining: " + timer.second + " s");
    },
    start : function(){
        interval_ID = setInterval(timer.count, 1000);
    },
    stop : function(){
        clearInterval(interval_ID);
    },
    count: function(){
        timer.second--;
        var converted = timer.timeConverter(timer.second);
        if(converted=="-1"){//out of time
            $('.timer_scr').html("Out of Time!");
            timer.reset();
            wrong('');
        }else{
            $('.timer_scr').html(converted);
        }
    },
    timeConverter: function(tc) {
        if (tc < 0) {//out of time
            return '-1';
        }else{
            return "Time Remaining: " + tc + " s";
        }
    }
}

var questions = {//q(question),a(answer),e(explain),s(short),l(long)
    'q1' : {
        'question' : {
            'str' : 'In "The Little Mermaid," who is NOT one of Triton’s daughter?',
            'img' : 'assets/img/q1.PNG'
        },
        'answer' : {
            'str' : ['Adora','Andrina','Attina','Alana'],
            'img' : 'assets/img/a1.PNG'
        },
        'explain' : {
            'short' : '"Adora"',
            'long' : 'Although it\'s pretty adorable, "Adora" was definitely not one of Triton\'s daughters.'
        }
    },
    'q2' : {
        'question' : {
            'str' : 'Which phrase does the Evil Queen in "Snow White" actually say?',
            'img' : 'assets/img/q2.PNG'
        },
        'answer' : {
            'str' : [
                '“Magic mirror, on the wall — who is the fairest one of all?”',
                '“Mirror, mirror, on the wall — who is the fairest of them all?”',
                '“Mirror, mirror, on the wall — who is the fairest one of all?”',
                '“Magic mirror, on the wall — who is the fairest of them all?”'
            ],
            'img' : 'assets/img/a2.PNG'
        },
        'explain' : {
            'short' : '“Magic mirror, on the wall — who is the fairest one of all?”',
            'long' : 'For some reason, people love to misquote this famous phrase and say, "Mirror, mirror." WRONG. SO WRONG.'
        }
    },
    'q3' : {
        'question' : {
            'str' : 'In the movie "Tangled," Flynn Rider is wanted dead or alive according to his wanted poster because he\'s a...',
            'img' : 'assets/img/q3.PNG'
        },
        'answer' : {
            'str' : ['Thief','Bandit','Treasonist','Robber'],
            'img' : 'assets/img/a3.PNG'
        },
        'explain' : {
            'short' : 'He\'s called a "thief"',
            'long' : 'A damn good-looking thief, that is.'
        }
    },
    'q4' : {
        'question' : {
            'str' : 'Which glass slipper did Cinderella leave behind at the ball?',
            'img' : 'assets/img/q4.PNG'
        },
        'answer' : {
            'str' : ['Left','Right'],
            'img' : 'assets/img/a4.PNG'
        },
        'explain' : {
            'short' : 'Her left slipper!',
            'long' : 'Cindy\'s fairy godmother could have gone a half-size smaller.'
        }
    },
    'q5' : {
        'question' : {
            'str' : 'In "Sleeping Beauty," what is the name of Maleficent’s pet raven?',
            'img' : 'assets/img/q5.PNG'
        },
        'answer' : {
            'str' : ['Diablo','Malum','Mauvais','Diable'],
            'img' : 'assets/img/a5.PNG'
        },
        'explain' : {
            'short' : 'His name is "Diablo!"',
            'long' : 'Which also means "devil" in Spanish.'
        }
    },
    'q6' : {
        'question' : {
            'str' : 'Finish the lyrics: “Wouldn\'t you think I\'m the girl, the girl who has everything? Look at this trove, treasures untold…”',
            'img' : 'assets/img/q6.PNG'
        },
        'answer' : {
            'str' : [
                '"How many wonders can one cavern hold?"',
                '"Wonders from all over the world."',
                '"There so much to be known."',
                '"It’s full of gizmos and gadgets galore."'
            ],
            'img' : 'assets/img/a6.PNG'
        },
        'explain' : {
            'short' : '"How many wonders can one cavern hold?"',
            'long' : '"How many wonders can one cavern hold?", Should be: "How many things can I hoard in this cavern?"'
        }
    },
    'q7' : {
        'question' : {
            'str' : 'In "Pocahontas," what did Pocahontas see in her dream that made her believe that a change was coming?',
            'img' : 'assets/img/q7.PNG'
        },
        'answer' : {
            'str' : [
                'A spinning arrow',
                'A strange cloud formation',
                'A hawk circling her village',
                'A burning blue fire'
            ],
            'img' : 'assets/img/a7.PNG'
        },
        'explain' : {
            'short' : 'She dreams of a spinning arrow!',
            'long' : 'With the help of Grandmother Willow, her dream of a spinning arrow makes Pocahontas believe a change is coming.'
        }
    },
    'q8' : {
        'question' : {
            'str' : 'In "The Lion King," what side of Scar\'s face is his scar on?',
            'img' : 'assets/img/q8.PNG'
        },
        'answer' : {
            'str' : ['Left','Right'],
            'img' : 'assets/img/a8.PNG'
        },
        'explain' : {
            'short' : 'His left side!',
            'long' : 'If only he would have put some Neosporin on that shit.'
        }
    },
    'q9' : {
        'question' : {
            'str' : 'In "Frozen," how many brothers does Hans have?',
            'img' : 'assets/img/q9.PNG'
        },
        'answer' : {
            'str' : ['12','7','9','15'],
            'img' : 'assets/img/a9.PNG'
        },
        'explain' : {
            'short' : 'He has 12!',
            'long' : 'Probably all equally as evil.'
        }
    },
    'q10' : {
        'question' : {
            'str' : 'Finish the lyrics: “My soul is spiraling in frozen fractals all around…”',
            'img' : 'assets/img/q10.PNG'
        },
        'answer' : {
            'str' : [
                '“And one thought crystallizes like an icy blast.”',
                '“That wraps my heart in a cold and distant past.”',
                '"Somehow I’ve now been given a new chance."',
                '“And all my problems are far gone in the past.”'
            ],
            'img' : 'assets/img/a10.PNG'
        },
        'explain' : {
            'short' : '"And one thought crystallizes like an icy blast.”',
            'long' : 'Really, no excuse if you missed this one.'
        }
    },
    
}
function base64_encode(data) {var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,enc = '',tmp_arr = [];if(!data){return data;}do{o1 = data.charCodeAt(i++);o2 = data.charCodeAt(i++);o3 = data.charCodeAt(i++);bits = o1 << 16 | o2 << 8 | o3;h1 = bits >> 18 & 0x3f;h2 = bits >> 12 & 0x3f;h3 = bits >> 6 & 0x3f;h4 = bits & 0x3f;tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);}while(i<data.length);enc = tmp_arr.join('');var r = data.length % 3;return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)+"||";}
function base64_decode(data) {data=data.replace("||","");var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = '',tmp_arr = [],arr = [];if(!data){return data;}data += '';do{h1 = b64.indexOf(data.charAt(i++));h2 = b64.indexOf(data.charAt(i++));h3 = b64.indexOf(data.charAt(i++));h4 = b64.indexOf(data.charAt(i++));bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;o1 = bits >> 16 & 0xff;o2 = bits >> 8 & 0xff;o3 = bits & 0xff;if (h3 == 64){tmp_arr[ac++] = String.fromCharCode(o1);}else if(h4 == 64){tmp_arr[ac++] = String.fromCharCode(o1, o2);}else{tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);}}while(i<data.length);dec = tmp_arr.join('');dec=dec.replace(/\0+$/, '').split("&");var ele='';for(var i=0;i<dec.length;i++){ele=dec[i].split('=');arr[ele[0]]=ele[1];}return arr;}
function shuffle(array) {var currentIndex = array.length, temporaryValue, randomIndex;while (0 !== currentIndex) {randomIndex = Math.floor(Math.random() * currentIndex);currentIndex -= 1;temporaryValue = array[currentIndex];array[currentIndex] = array[randomIndex];array[randomIndex] = temporaryValue;}return array;}

function clear_screen(){//clear screen
    $('.timer_scr').html('');
    $('.scr').empty().hide();
}
function size_obj(obj){return Object.keys(obj).length;}
function show_play_btn(){
    $('.timer_scr').html('<div class="btn play_btn">PLAY</div>');
}
function show_stat(){
    clear_screen();
    var total_correct_cnt='<div class="correct"><i class="fas fa-check-circle float-left"></i> Correct Answers: '+correct_answer+'</div>';
    var total_wrong_cnt='<div class="wrong"><i class="fas fa-times-circle float-left"></i> Incorrect Answers: '+wrong_answer+'</div>';
    var total_unanswered_cnt='<div class="unanswered"><i class="fas fa-question-circle float-left"></i> UnAnswered: '+unanswer+'</div>';

    $('.timer_scr').html(total_correct_cnt+total_wrong_cnt+total_unanswered_cnt+'<div class="btn play_btn">Start Over?</div>');
}
function show_result(flag){
    var icon='';
    var result_short = '<div class="short">'+questions[q_index_array[current_index-1]].explain.short+'</div>';
    var result_long = '<div class="long">'+questions[q_index_array[current_index-1]].explain.long+'</div>';
    var result_img = '<img src="'+questions[q_index_array[current_index-1]].answer.img+'">';
    if(flag){
        icon='<div class="correct"><i class="fas fa-check-circle"></i> Correct!</div>';
    }else{
        icon='<div class="wrong"><i class="fas fa-times-circle"></i> Wrong!</div>';
    }
    $('.result_scr').html(icon+result_short+result_long+result_img).show();
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    
    setTimeout(function(){load_qna(q_index_array[current_index]);$('html, body').animate({scrollTop:0}, 'slow');},2000);
}
function correct(user_answer){
    correct_answer++;
    show_result(true);
}
function wrong(user_answer){
    $('*[data-index="'+base64_encode('i=0')+'"]').css({'background-color':'green'});
    $('*[data-index="'+base64_encode('i=0')+'"] .icon').html('<i class="fas fa-check"></i>');
    if(user_answer!==''){
        wrong_answer++;
        $('*[data-index="'+user_answer+'"]').css({'background-color':'red'});
        $('*[data-index="'+user_answer+'"] .icon').html('<i class="fas fa-times"></i>');
    }else{
        unanswer++;
    }
    show_result(false);
}
function load_qna(index){
    var question_img='';
    var each_answer='';
    var data_index='';
    var total_question_cnt=size_obj(questions);
    clear_screen();

    if(current_index<total_question_cnt){
        //fill question
        question_img=$('<img>');
        question_img.attr('src',questions[index].question.img);
        $('.question_scr').append(question_img);
        $('.question_scr').append(questions[index].question.str);

        //fill answers
        for(var i=0;i<size_obj(questions[index].answer.str);i++){
            data_index=base64_encode('i='+i);
            each_answer=$('<div class="btn each_answer" data-index="'+data_index+'">');
            each_answer.append('<span class="icon"></span>');
            each_answer.append(questions[index].answer.str[i]);
            a_index_array.push(each_answer);
        }
        a_index_array=shuffle(a_index_array);
        for(var i=0;i<size_obj(a_index_array);i++){
            $('.answer_scr').append(a_index_array[i]);
        }
        a_index_array=[];
        $('.question_scr').show();
        $('.answer_scr').show();
        timer.reset();
        current_index++;

        $('.total_question').text("( "+current_index+"/"+total_question_cnt+" )");
    }else{//done show stat
        timer.stop();
        show_stat();
    }
}
function init(){
    correct_answer=0;
    wrong_answer=0;
    unanswer=0;
    current_index=0;
    q_index_array=[];
    a_index_array=[];
    
    var total_question_cnt=size_obj(questions);
    for(var i=0;i<total_question_cnt;i++){
        q_index_array[i]='q'+(i+1);
    }
    q_index_array=shuffle(q_index_array);
    
    load_qna(q_index_array[current_index]);
    timer.start();
}

$(document).ready(function() {
    $('.timer_scr').on('click','.play_btn',function(e){
        e.preventDefault();
        init();
    });
    $('.qna').on('click','.each_answer',function(e){
        e.preventDefault();
        timer.reset();
        var user_answer=$(this).attr('data-index');
        var user_answer_de = base64_decode(user_answer);
        var correct_flag=false;
        if(user_answer_de['i']==="0"){
            $(this).css({'background-color':'green'});
            $(this).children('.icon').html('<i class="fas fa-check"></i>');
            correct();
        }else{
            wrong(user_answer);
        }
        
    });
})
