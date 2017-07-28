<div id="homeBanner" class="homeBanner">
    <div id="sliderBackButton" class="sliderButton sliderBackButton">&#10094;</div>
    <div id="sliderForwardButton" class="sliderButton sliderForwardButton">&#10095;</div>
    <div id="bannerSlide1" class="bannerSlide" style="opacity: 1;">
        <a href="page/dol"><img id="bannerImage" src="media/site/dolBanner.jpg" /></a>
    </div>
    <div id="bannerSlide2" class="bannerSlide" style="opacity: 0;">
        <a href="page/arc"><img id="bannerImage" src="media/site/ARCBanner.jpg" /></a>
    </div>
</div>
<script>
    var slideIndex = 1;
    var numberOfSlides = 2;
    var pauseSlider = false;
    var resetSlider = false;

    for(var i = 1; i <= numberOfSlides; i++)
    {
        if(i == 1)
        {
            $('#bannerSlide' + i).css('z-index', 2);
        }
        else
        {
            $('#bannerSlide' + i).css('opacity', 0);
        }
    }

    $('#sliderForwardButton').click(function()
    {
        changeSlide('forward');
    });

    $('#sliderBackButton').click(function()
    {
        changeSlide('backward');
    });

    $(function()
    {
        $('#bannerImage').hover(stopSlider, resumeSlider);
        $('#sliderBackButton').hover(stopSlider, resumeSlider);
        $('#sliderForwardButton').hover(stopSlider, resumeSlider);
    });

    function queueSlide()
    {
        if(!pauseSlider)
        {
            changeSlide('forward');
            setTimeout(queueSlide, 5000);
        }
        else
        {
            resetSlider = true;
        }
    }

    function changeSlide(direction)
    {
        if(slideIndex < numberOfSlides && direction == 'forward')
        {
            slideIndex += 1;
        }
        else if(slideIndex == numberOfSlides && direction == 'forward')
        {
            slideIndex = 1;
        }
        else if(slideIndex > 1 && direction == 'backward')
        {
            slideIndex -= 1;
        }
        else if(slideIndex == 1 && direction == 'backward')
        {
            slideIndex = numberOfSlides;
        }

        for(var i = 1; i <= numberOfSlides; i++)
        {
            if(i != slideIndex)
            {
                $('#bannerSlide' + i).animate({ opacity: 0 }, 750).delay(750).css('z-index', 1);
            }
            else
            {
                $('#bannerSlide' + i).animate({ opacity: 1 }, 750).delay(750).css('z-index', 2);
            }
        }
    }

    function stopSlider()
    {
        pauseSlider = true;
    }

    function resumeSlider()
    {
        pauseSlider = false;

        if(resetSlider)
        {
            resetSlider = false;
            setTimeout(queueSlide, 5000);
        }
    }

    setTimeout(queueSlide, 8000);
</script>