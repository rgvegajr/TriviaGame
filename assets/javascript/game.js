//apollo trivia game javascript code. Apollo missions questions:  source https://www.funtrivia.com/en/History/Apollo-Missions-10284.html
$(document).ready(function() {
    //global variables
    const qnaArray = [{
            q: "There were a total of 7 lunar landing missions. Of those how many men have walked on moon?",
            a1: "12",
            a2: "10",
            a3: "14",
            a4: "9",
            corAnsId: "a1",
            corAnsText: "12",
            pic: "src='assets/images/q1-moonwalker.jpg'/>"
        },
        {
            q: "December 21, 1968 was a milestone in the Space program. This Apollo mission was the first to orbit the moon and return?",
            a1: "Apollo 9",
            a2: "Apollo 10",
            a3: "Apollo 8",
            a4: "Apollo 13",
            corAnsId: "a3",
            corAnsText: "Apollo 8",
            pic: "src='assets/images/q2-moonorbit.jpg'/>"
        },
        {
            q: "Gus Grissom, Ed White and Roger Chaffee were killed in the Apollo 1 fire. What year did this occur?",
            a1: "1968",
            a2: "1967",
            a3: "1965",
            a4: "1970",
            corAnsId: "a2",
            corAnsText: "1967",
            pic: "src='assets/images/q3-fire.jpg'/>"
        },
        {
            q: "After the success of Apollo 7, 8, 9, and 10, Apollo 11 lifted off from Florida on its way to the moon on what date?",
            a1: "July 20, 1969",
            a2: "August 16, 1969",
            a3: "July 10, 1969",
            a4: "July 16, 1969",
            corAnsId: "a4",
            corAnsText: "July 16, 1969",
            pic: "src='assets/images/q4-apollo11.jpg'/>"
        },
        {
            q: "After being grounded for 10 years with an inner ear disorder, this Mercury astronaut finally achieved his dream of walking on the moon during Apollo 14. Who was he?",
            a1: "M. Scott Carpenter",
            a2: "Alan Shepard",
            a3: "Walter M. Schirra, Jr.",
            a4: "L. Gordon Cooper",
            corAnsId: "a2",
            corAnsText: "Alan Shepard",
            pic: "src='assets/images/q5-astronaut.jpg'/>"
        },
        {
            q: "Apollo 15 marked the first mission to use what on the moon for EVA?",
            a1: "Land Rover",
            a2: "Lunar Rover",
            a3: "Lunar Pogo Stick",
            a4: "Jet Pack",
            corAnsId: "a2",
            corAnsText: "Lunar Rover",
            pic: "src='assets/images/q6-rover.jpg'/>"
        },
        {
            q: "We all know Neil Armstrong and Buzz Aldrin were the first men to walk on the moon. My question is who was the third member of the Apollo 11 crew?",
            a1: "L. Gordon Cooper",
            a2: "Michael Collins",
            a3: "Deke Slayton",
            a4: "Walter M.Schirra, Jr.",
            corAnsId: "a2",
            corAnsText: "Michael Collins",
            pic: "src='assets/images/q7-collins.jpg'/>"
        },
        {
            q: "Harrison 'Jack' Schmitt was the first what to go to the moon?",
            a1: "Firefighter",
            a2: "Non-Pilot",
            a3: "Teacher",
            a4: "Police Officer",
            corAnsId: "a2",
            corAnsText: "Non-Pilot",
            pic: "src='assets/images/q8-non-pilot.jpg'/>"
        }
    ];
    let qTimer;
    let aTimer;
    let intervalId;
    let clockRunning;
    let corAnswers = 0;
    let inCorAnswers = 0;
    let unAnswered = 0;

    //functions
    //code to reset timers for each new question and load new questions and answers
    function init(i) {
        console.log("i inside init = " + i);
        let question = qnaArray[i].q;
        let answer1 = qnaArray[i].a1;
        let answer2 = qnaArray[i].a2;
        let answer3 = qnaArray[i].a3;
        let answer4 = qnaArray[i].a4;
        let turnAnsId = qnaArray[i].corAnsId;
        let turnAnsImg = qnaArray[i].pic;
        $("#q").text(question);
        $("#a1").text(answer1);
        $("#a2").text(answer2);
        $("#a3").text(answer3);
        $("#a4").text(answer4);
        $("#start").remove(); //try empty replace with remove if doesnt work
        qTimer = 15;
        aTimer = 5;
        clockRunning = false;
    };
    //code to stop game when question answered or time out
    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    };
    //  The decrement function called by question timer functions.
    function decrementQ() {
        //  Decrease number by one.
        qTimer--;
        $("#timeRem").text("Time Remaining: " + qTimer);
        //  Once number hits zero...
        if (qTimer === 0) {
            let fullAnswer = qnaArray[i].corAnsText; //
            //  ...run the stop function.
            stop();
            $("#a1").empty();
            $("#a2").empty();
            $("#a3").empty();
            $("#a4").empty();
            //  Alert the user that time is up.
            $("#q").text("Out of Time!");
            $("#a1").text("The Correct Answer was:  " + fullAnswer);
            $("#a3").html("<img " + qnaArray[i].pic);
            unAnswered++;
            runA();
        }
    };

    function runQ() { //question timer
        clockRunning = true;
        clearInterval(intervalId);
        intervalId = setInterval(decrementQ, 1000);
    };

    function runA() { //answer timer
        $("#timeRem").text("Time Remaining: " + 5);
        clockRunning = true;
        clearInterval(intervalId);
        intervalId = setInterval(decrementA, 1000);
    };

    function decrementA() {
        //  Decrease number by one.
        aTimer--;
        $("#timeRem").text("Time Remaining: " + aTimer);
        if (aTimer === 0) {
            nextQ();
        }

    };

    function nextQ() {
        if (i < (qnaArray.length - 1)) { //try length -1
            console.log("nextQ staart i = " + i);
            runQ();
            i++;
            console.log("i for init = " + i);
            init(i);
        } else {
            $("#a1").empty();
            $("#a2").empty();
            $("#a3").empty();
            $("#a4").empty();
            $("#q").text("All Done!");
            $("#a1").text("Here's how you did!");
            $("#a2").text("Correct Answers = " + corAnswers);
            $("#a3").text("Incorrect Answers = " + inCorAnswers);
            $("#a4").text("Unanswered = " + unAnswered);
            $(".gameButton").append("<button id='start'>Start Over??</button>");
            stop();
        }
    };
    //click listeners
    $("#start").on("click", function() { //  Start on click. 
        i = 0;
        init(i);
        $("#timeRem").text("Time Remaining: " + 15);
        runQ();
        //play function                                    
        $("p").click(function(event) {
            let turnAns = event.target.id;
            let fullAnswer = qnaArray[i].corAnsText;
            $("#a1").empty();
            $("#a2").empty();
            $("#a3").empty();
            $("#a4").empty();
            if (turnAns == qnaArray[i].corAnsId) {
                $("#q").text("Correct!"); //display right answer plus gif, etc
                corAnswers++;
                $("#a3").html("<img " + qnaArray[i].pic);
            } else {
                $("#q").text("Nope!"); //display right answer plus gif, etc
                inCorAnswers++;
                $("#a1").text("The Correct Answer was:  " + fullAnswer);
                $("#a3").html("<img " + qnaArray[i].pic);
            };
            runA();
        });
    });

});