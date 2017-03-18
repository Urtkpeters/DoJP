function login(event)
{
    if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
    {
        var password = $('#password').val();
        var username = $('#username').val();
        $('#loginErrorDiv').text('');

        if(password.length && username.length)
        {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=login&username=' + username + '&password=' + password,
                cache: false,
                dataType: 'json',
                success: function(responseData)
                {
                    if(responseData.blnSuccess == true)
                    {
                        $.fancybox.close();
                        $('#password').val('');
                        $('#username').val('');

                        $('#messages').html('<label>' + responseData.strMessage + '</label>');
                        $('#loginDiv').html('<label>LOGOUT</label>');
                        blnLoggedIn = true;
                        setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                    }
                    else
                    {
                        $('#loginErrorDiv').text('Credentials do not match.');
                    }
                }
            });
        }
    }
    else if(event.type == 'keypress' && event.keyCode == 9)
    {
        if($(event.target).attr('id') == 'username')
        {
            setTimeout(function()
            {
                $('#password').focus();
            }, 50);
        }
        else if($(event.target).attr('id') == 'password')
        {
            setTimeout(function()
            {
                $('#username').focus();
            }, 50);
        }
    }
}

function logout()
{
    if(blnLoggedIn)
    {
        $.ajax
        ({
            url: '/lib/siteLib/ajaxHandler.php?request=logout',
            cache: false,
            dataType: 'json',
            success: function(responseData)
            {
                if(responseData.blnSuccess == true)
                {
                    $('#messages').html('<label>' + responseData.strMessage + '</label>');
                    $('#loginDiv').html('<label>LOGIN</label>');
                    blnLoggedIn = false;

                    setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                }
                else
                {
                    $('#messages').text('There was an error during logout.');
                }
            }
        });
    }
}

function showLogin()
{
    $.fancybox.close();
    $.fancybox.open({src: '#loginLightbox'});
}

function showRegister()
{
    $.fancybox.close();
    $.fancybox.open({src: '#registerLightbox'});
}

function register(event)
{
    if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
    {
        var email = $('#newEmail').val();
        var username = $('#newUsername').val();
        var password = $('#newPassword').val();
        var passwordConfirm = $('#newPasswordConfirm').val();

        if (password == passwordConfirm) {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=register&emailAddress=' + email + '&username=' + username + '&password=' + password,
                cache: false,
                dataType: 'json',
                success: function (responseData)
                {
                    if (responseData.blnSuccess == true)
                    {
                        $.fancybox.close();
                        $('#messages').html('<label>' + responseData.strMessage + '</label>');
                        $('#newEmail').val('');
                        $('#newUsername').val('');
                        $('#newPassword').val('');
                        $('#newPasswordConfirm').val('');

                        setTimeout(function () {
                            $('#messages').fadeOut(2000, function () {
                                var objMessagesDiv = $('#messages');
                                objMessagesDiv.text('');
                                objMessagesDiv.fadeIn(0)
                            });
                        }, 8000);
                    }
                    else {
                        $('#registerErrorDiv').text(responseData.strMessage);
                    }
                }
            });
        }
        else {
            $('#registerErrorDiv').text('Password values must match.');
        }
    }
}