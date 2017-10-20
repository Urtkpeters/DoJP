function syncMatches()
{
    $.ajax(
    {
        url: 'https://api.opendota.com/api/players/17677340/matches',
        cache: false,
        dataType: 'json',
        success: function(responseData)
        {
            console.log(responseData);
        }
    });
}


// My most recent match
// url: 'https://api.opendota.com/api/matches/3368165242',

// My profile's matches
// url: 'https://api.opendota.com/api/players/17677340/matches',