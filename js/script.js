$(document).ready(function () {

    // selectors //

    // elements
    var $overlay = $('#overlay')
    var $next = $('#next')
    var $tapToStart = $('#tap-to-start')
    var $gameOver = $('#game-over')
    var $playAgain = $('#play-again')
    var $cups = $('.cup .main path')

    // sounds
    var soundMoveLeft = document.getElementById('sound-move-left')
    var soundMoveTop = document.getElementById('sound-move-top')
    var soundCorrect = document.getElementById('sound-correct')
    var soundGameOver = document.getElementById('sound-game-over')
    
    // initial sizes
    var ballHeight = $('#ball').height()
    var cupTop = $('.cup').offset().top

    // cups positions
    var cup1 = $('.cup1').offset().left
    var cup2 = $('.cup2').offset().left
    var cup3 = $('.cup3').offset().left

    // time for levels
    var time = 300

    // events //

    // overlay click
    $overlay.click(function () {
        $overlay.hide()
        $tapToStart.hide()
        $('#ball').show()
        $('.cup').addClass('avoid-clicks')
        $cups.css('transition', `${time + 100}ms`)

        $cups.css({
            'transform': `translateY(-${100 - ballHeight}px)`
        })

        soundMoveTop.play()

        setTimeout(() => {
            $cups.css({
                'transform': 'translateY(100px)'
            })

            soundMoveTop.currentTime = 0.1
            soundMoveTop.play()

        }, time * 5);

        setTimeout(() => {
            var i = 0
            var shuffle = setInterval(() => {
                i++

                var rand1 = Math.floor(Math.random() * 3 + 1)
                var rand2 = Math.floor(Math.random() * 3 + 1)

                while (rand1 == rand2) {
                    var rand2 = Math.floor(Math.random() * 3 + 1)
                }

                var distance = ($(`.cup${rand1}`).offset().left - $(`.cup${rand2}`).offset().left) / 2

                $(`.cup${rand1}`).animate({
                    left: $(`.cup${rand2}`).offset().left + distance,
                    top: `${cupTop - 50}`
                }, time, 'linear').animate({
                    left: $(`.cup${rand2}`).offset().left,
                    top: `${cupTop}`
                }, time, 'linear')

                $(`.cup${rand2}`).animate({
                    left: $(`.cup${rand1}`).offset().left - distance,
                    top: `${cupTop + 50}`
                }, time, 'linear').animate({
                    left: $(`.cup${rand1}`).offset().left,
                    top: `${cupTop}`
                }, time, 'linear')

                if (i == 15) {
                    clearInterval(shuffle)
                    $('.cup').removeClass('avoid-clicks')
                }

                soundMoveLeft.currentTime = 0.04
                soundMoveLeft.play()

            }, time * 2 + 50);
        }, time * 7);
    })

    // cups click
    $('.cup').click(function () {
        $('.cup').addClass('avoid-clicks')

        $cups.css({
            'transform': `translateY(-${100 - ballHeight}px)`
        })

        if ($(this).hasClass('cup2')) {
            $next.show()
            $(this).find('.o').show()

            soundCorrect.play()
        } else {
            $gameOver.show().css('animation', 'gameOver 3.32s steps(1)')
            $playAgain.show()
            $(this).find('.x').show()

            soundGameOver.play()
        }
    })

    // next click
    $next.click(function () {
        $(this).hide()
        $('.o').hide()

        $tapToStart.show()
        $overlay.show()
        
        $('#level').html(`${parseInt($('#level').html()) + 1}`)

        $cups.css({
            'transition': '0s',
            'transform': 'translateY(100px)'
        })
        
        $('.cup1').css('left', cup1)
        $('.cup2').css('left', cup2)
        $('.cup3').css('left', cup3)
        
        if (time <= 300 && time > 100) {
            time -= 25
        } else if (time <= 100 && time > 50) {
            time -= 10
        } else if (time <= 50 && time > 30) {
            time -= 2
        }
    })

    // play again click
    $playAgain.click(function () {
        $(this).hide()
        $($gameOver).hide()
        $('.x').hide()

        $tapToStart.show()
        $overlay.show()

        $('#level').html('1')

        $cups.css({
            'transition': '0s',
            'transform': 'translateY(100px)'
        })

        $('.cup1').css('left', cup1)
        $('.cup2').css('left', cup2)
        $('.cup3').css('left', cup3)

        time = 300

        soundGameOver.pause()
        soundGameOver.currentTime = 0
    })
});