$(document).ready(function () {
    var users = [
        "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
    ];
    user_data = {};
    users.forEach(u => user_data[u] = {});
    var url = "https://wind-bow.gomix.me/twitch-api/";
    var user_url = name => url + "users/" + name + "?callback=?";
    var stream_url = name => url + "streams/" + name + "?callback=?";
    var f_user_data = users.map(function(user) {
        return $.getJSON(user_url(user))
            .done(u => user_data[user]['user'] = u);
    });
    var f_stream_data = users.map(function(user) {
        return $.getJSON(stream_url(user))
            .done(s => user_data[user]['stream'] = s);
    });
    Promise.all(f_user_data.concat(f_stream_data))
        .then(_ => show_user_cards(user_data));

    $('#menu input[type="radio"]').change(filter_cards);
});

function filter_cards(e) {
    checked = $('#menu input[type="radio"]:checked').attr('id');
    $cards = $('#cards');
    switch(checked) {
        case "online-radio":
            console.log('online')
            $cards.children()
                    .attr('hidden', true)
                    .filter('.online').attr('hidden', null);
            break;
        case "offline-radio":
            console.log('offline')
            $cards.children()
                    .attr('hidden', true)
                    .filter('.offline').attr('hidden', null);
            break;
        case "all-radio":
        default:
            console.log("all");
            $cards.children().attr('hidden', null);
    }
}

function show_user_cards(user_data) {
    $cards = $('#cards').empty();
    for (name in user_data) {
        if (!user_data.hasOwnProperty(name)) continue;
        $cards.append(build_card(user_data[name]));
    }
    $cards.find('[hidden]').attr('hidden', null);
}

function build_card(data) {
    var img_url = data.user.logo;
    var name = data.user.display_name;
    var url = "https://www.twitch.tv/" + data.user.name;

    $card = $('#card-template').clone().attr('id', null);
    $card.find('img').attr('src', data.user.logo);
    $card.find('.streamer-name > a').attr('href', url).text(name);

    if (data.stream.stream !== null) {
        var channel = data.stream.stream.channel;
        var game = channel.game;
        var stream_url = channel.url;
        var status = ": " + channel.status;
        var $link = $('.streamer-info > a').attr('href', stream_url);
        $card.addClass('online');
        $card.find('.streamer-game').text(game);
        $card.find('.streamer-summary').text(status);
    } else {
        $card.addClass('offline');
        $card.find('.streamer-game').text('Offline');
    }
    return $card;
}
