
function getCardData(query) {
    var url = 'https://wikipedia.org/w/api.php?action=query';
    var params = {
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
    };
    // $getJSON
}
