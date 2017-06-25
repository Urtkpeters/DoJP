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
                url: '/event/login?username=' + username + '&password=' + password,
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
                        $('#topButtonsDiv').append('<a href="/page/account"><div id="accountButton" class="topButton"><label>ACCOUNT</label></div></a>');
                        blnLoggedIn = true;
                        setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);

                        if(window.location.pathname == '/page/dojp')
                        {
                            checkLogin();
                            checkForSave();
                        }
                    }
                    else
                    {
                        $('#loginErrorDiv').text(responseData.strMessage);
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
            url: '/event/logout',
            cache: false,
            dataType: 'json',
            success: function(responseData)
            {
                if(responseData.blnSuccess == true)
                {
                    $('#messages').html('<label>' + responseData.strMessage + '</label>');
                    $('#loginDiv').html('<label>LOGIN</label>');
                    $('#accountButton').remove();
                    blnLoggedIn = false;

                    setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                }
                else
                {
                    $('#messages').text('There was an error during logout.');
                }

                if(window.location.pathname == '/page/account')
                {
                    location.href = '/';
                }
                else if(window.location.pathname == '/page/dojp')
                {
                    objGame.hasSavedGame = false;
                }
            }
        });
    }
}

function showLogin()
{
    $.fancybox.close();
    $.fancybox.open({src: '#loginLightbox'});
    $('.fancybox-slide').click(function(){$.fancybox.close();});
    $('#loginLightbox').click(function(event){event.stopPropagation();})
}

function showRegister()
{
    $.fancybox.close();
    $.fancybox.open({src: '#registerLightbox'});
    $('.fancybox-slide').click(function(){$.fancybox.close();});
    $('#registerLightbox').click(function(event){event.stopPropagation();})
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
                url: '/event/register?emailAddress=' + email + '&username=' + username + '&password=' + password,
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