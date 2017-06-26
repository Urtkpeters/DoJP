function usernameChange(event)
{
    if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
    {

        changeAccountValue('username', $('#usernameChange').val());
    }
}

function emailChange(event)
{
    if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
    {

        changeAccountValue('emailAddress', $('#emailChange').val());
    }
}

function passwordChange(event)
{
    if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
    {
        var newPassword = $('#passwordChange').val();
        var passwordConfirmChange = $('#passwordConfirmChange').val();

        if(newPassword == passwordConfirmChange)
        {
            $('#passwordError').addClass('noDisplay');

            changeAccountValue('password', newPassword);
        }
        else
        {
            $('#passwordError').removeClass('noDisplay');
        }
    }
}

function changeAccountValue(accountCode, accountValue)
{
    var sessionId = parseInt(document.cookie.split('=')[1]);

    if(typeof(sessionId) !== 'undefined' && sessionId > 0)
    {
        $.ajax
        ({
            url: '/event/setAccountValue?sessionId=' + sessionId + '&accountCode=' + accountCode + '&accountValue=' + accountValue,
            cache: false,
            dataType: 'json',
            success: function (responseData)
            {
                $('#accountInfoFeedback').html('<label>' + responseData.strMessage + '</label>');
                setTimeout(function(){$('#accountInfoFeedback').fadeOut(2000, function(){var objMessagesDiv = $('#accountInfoFeedback'); objMessagesDiv.text(' '); objMessagesDiv.fadeIn(0)});}, 6000);
            }
        });
    }
}

$('#enableMusic').click(function()
{
    changeSettingValue('enableMusic', $('#enableMusic').prop('checked'));
});

$('#enableSound').click(function()
{
    changeSettingValue('enableSound', $('#enableSound').prop('checked'));
});

function changeSettingValue(settingCode, settingValue)
{
    var sessionId = parseInt(document.cookie.split('=')[1]);

    if(typeof(sessionId) !== 'undefined' && sessionId > 0)
    {
        $.ajax
        ({
            url: '/event/setSettingValue?sessionId=' + sessionId + '&settingCode=' + settingCode + '&settingValue=' + settingValue,
            cache: false,
            dataType: 'json',
            success: function (responseData)
            {
                $('#settingFeedback').html('<label>' + responseData.strMessage + '</label>');
                setTimeout(function(){$('#settingFeedback').fadeOut(2000, function(){var objMessagesDiv = $('#settingFeedback'); objMessagesDiv.text(' '); objMessagesDiv.fadeIn(0)});}, 6000);
            }
        });
    }
}