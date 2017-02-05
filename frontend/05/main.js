function loadCards(data) {
    clearCards();
    var pages = data.query.pages
    $('.jumbotron').removeClass('centered');
    for (page in pages) {
        if (!pages.hasOwnProperty(page)) continue;
        addCard(pages[page].title, pages[page].extract);
    }
}

function clearCards() {
    $('.jumbotron').addClass('centered');
    $('#cards').empty();
}

function addCard(title, body) {
    var $elem = $('#card-template').clone();
    $elem.attr('hidden', null);
    $elem.attr('id', null);
    $elem.children('.card-title').html(title);
    $elem.children('.card-body').html(body);
    $('#cards').append($elem);
}

function runQuery(query) {
    console.log('Query:', query);
    var url = 'https://wikipedia.org/w/api.php?action=query';
    var settings = {
        dataType: "jsonp",
        data: {
            format: "json",
            prop: "extracts",
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
            gsrinfo: "totalhits%7Csuggestion%7Crewrittenquery",
            gsrprop: "snippet%7Ctitlesnippet'",
        }
    };
    $.ajax(url, settings).done(loadCards).fail(function(e) {console.error(e)});
}

$(document).ready(function() {
    $('#query').keydown(function(e) {
        if (e.key === 'Enter') {
            var query = $('#query').get()[0].value;
            runQuery(query);
        }
    }).focus();
});
