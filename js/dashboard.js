$(document).ready(function () {

    function active(classId) {

        const ids = ["#daily", "#monthly", "#weekly"];
        for (const id of ids) {
            $(id).removeClass("not-active");
            $(id).removeClass("active");
        }

        for (const id of ids.filter(i => i != classId)) {
            $(id).addClass("not-active");
        }

        $(classId).addClass("active");
    }

    $('#daily').on('click', (_) => {
        active("#daily");
        publish('Day');
    });

    $("#weekly").on('click', (_) => {
        active("#weekly");
        publish('Week');
    });


    $("#monthly").on('click', (_) => {
        active("#monthly");
        publish('Month');
    });

    class Calender {
        constructor(type, currentHrs, prevHrs) {
            this.type       = type;
            this.currentHrs = currentHrs;
            this.prevHrs    = prevHrs;
        }
    }

    class Card {
        constructor(id, title, backgroundImage, bgColor, calenders) {
            this.id                 = id
            this.title              = title;
            this.backgroundImage    = backgroundImage;
            this.calenders          = calenders;
            this.bgColor            = bgColor;
        }
    }

    const cards = [
        new Card(1, "Work", "./images/icon-work.svg", "#ff8c66",
            [
                new Calender("Day", 5, 7),
                new Calender("Week", 32, 36),
                new Calender("Month", 103, 128)
            ]),
        new Card(2, "Play", "./images/icon-play.svg", "#56c2e6",
            [
                new Calender("Day", 1, 2),
                new Calender("Week", 10, 8),
                new Calender("Month", 23, 29)
            ]),
        new Card(3, "Study", "./images/icon-study.svg", "#ff5c7c",
            [
                new Calender("Day", 0, 1),
                new Calender("Week", 4, 7),
                new Calender("Month", 13, 19)
            ]),
        new Card(4, "Exercise", "./images/icon-exercise.svg", "#4acf81",
            [
                new Calender("Day", 1, 1),
                new Calender("Week", 4, 5),
                new Calender("Month", 11, 18)
            ]),
        new Card(5, "Social", "./images/icon-social.svg","#7536d3",
            [
                new Calender("Day", 1, 3),
                new Calender("Week", 5, 10),
                new Calender("Month", 21, 23)
            ]),
        new Card(6, "Self Care", "./images/icon-self-care.svg","#f1c65b",
            [
                new Calender("Day", 0, 1),
                new Calender("Week", 2, 2),
                new Calender("Month", 7, 11)
            ])
    ];


    active("#weekly");
    publish("Week");

    function publish(type) {

        console.log("type: ", type);
        $(".new-card").remove();
        
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const cardCalender = card.calenders.find(c => c.type == type);
            
            $(".template-card")
            .clone()
            .last()
            .css('background-color', card.bgColor)
            .removeClass("d-none template-card")
            .addClass("new-card")
            .find('.card-img_top')
            .attr('src', card.backgroundImage)
            .end()
            .find('#card__front-title')
            .text(card.title)
            .end()
            .find('.current-time')
            .text(cardCalender.currentHrs + "hrs")
            .end()
            .find('.last-time')
            .text("Last "+ type + " - " + cardCalender.prevHrs + "hrs")
            .end()
            .insertAfter(".card:last");
        }
    }
        
});