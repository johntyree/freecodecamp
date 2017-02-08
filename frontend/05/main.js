function loadCards(data) {
    var pages = data.query.pages
    for (page in pages) {
        if (!pages.hasOwnProperty(page)) continue;
        addCard(pages[page].title, pages[page].extract, pages[page].fullurl);
    }
}

function clearCards() {
    $('#cards').children().fadeOut(400, function() {
        $('#cards').addClass('shift-down');
        $('#cards').empty();
        $('.jumbotron').addClass('centered');
    });
}

function addCard(title, body, link) {
    var $elem = $('#card-template').clone();
    $elem.attr('id', null);
    $elem.find('.card-title').html(title);
    $elem.find('.card-body').html(body);
    $elem.children('a').attr('href', link);
    $('#cards').append($elem);
    $elem.removeClass('shift-down');
    $elem.fadeIn(400);
}

function runQuery(query) {
    console.log('Query:', query);
    clearCards();
    $('.jumbotron').removeClass('centered');
    var url = 'https://en.wikipedia.org/w/api.php?action=query';
    var settings = {
        dataType: "jsonp",
        data: {
            format: "json",
            prop: "extracts|info|links|extlinks",
            inprop: "url",
            list: "",
            meta: "",
            titles: "",
            generator: "search",
            exsentences: "1",
            exlimit: "10",
            exintro: "1",
            explaintext: "1",
            exsectionformat: "plain",
            gsrsearch: query,
            gsrlimit: "10",
            gsrqiprofile: "wsum_inclinks_pv",
            gsrwhat: "text",
            gsrinfo: "totalhits|suggestion|rewrittenquery",
            gsrprop: "snippet|titlesnippet'",
        }
    };
    $.ajax(url, settings).done(loadCards).fail(function(e) {console.error(e)});
}

function reset() {
    clearCards();
    $('#query').blur().get()[0].value = "";
}


$(document).ready(function() {
    $('#query').keydown(function(e) {
        switch (e.key) {
            case 'Enter':
                var query = $('#query').get()[0].value;
                runQuery(query);
                break;
            case 'Escape':
                reset();
                break;
        };
    }).focus();
    $('.eks-box').click(function() {
        reset();
    });
});
