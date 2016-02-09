$(document).ready(function() {
	
	var choices = {
		r:{
			s:1,
			lz:1,
			r:0,
			p:-1,
			sp:-1
		},
		p:{
			r:1,
			sp:1,
			p:0,
			s:-1,
			lz:-1
		},
		s:{
			p:1,
			lz:1,
			s:0,
			r:-1,
			sp:-1
		},
		lz:{
			p:1,
			sp:1,
			lz:0,
			r:-1,
			s:-1
		},
		sp:{
			s:1,
			r:1,
			sp:0,
			lz:-1,
			p:-1
		}
	};

	var userScore = 0, compScore = 0, roundCount=1, rounds;

	// CHOOSE FUNCTION	
	function chooser(){
		var choiceData = $(this).attr('data-choice');
		var userChoice = choices[choiceData];
		var compRandArr = ['s', 'r', 'p', 'lz', 'sp'];
		var compRand = compRandArr[Math.floor(Math.random()*compRandArr.length)];
		var compChoice = userChoice[compRand];

		modalStuff();
		$('#results-modal').modal('show');

		if(compChoice === 1){
			roundTitleClassRemove();
			$('.round-result').addClass('round-win').html('You win!');
			userScore++;
			roundIncrementer();
		}else if(compChoice === 0){
			roundTitleClassRemove();
			$('.round-result').addClass('round-tie').html('Tie!');
		}else if(compChoice === -1){
			roundTitleClassRemove();
			$('.round-result').addClass('round-lose').html('Computer wins!');
			compScore++;
			roundIncrementer();
		}

		$('.round-result').css('visibility', 'hidden').removeClass('round-result-animate');

		setTimeout(function(){
			$('.round-result').css('visibility', 'visible').addClass('round-result-animate');
		},1000);

		$('#user-score').html(userScore);
		$('#comp-score').html(compScore);

		function modalStuff(){
			var humanChoice = $('#human-choice-img');
			var computerChoice = $('#comp-choice-img');

			humanChoice.removeClass();
			computerChoice.removeClass();

			function imgSet(choice, player){
				if(choice==='r'){
					player.addClass('fa fa-hand-rock-o');
				}else if(choice==='p'){
					player.addClass('fa fa-hand-paper-o');
				}else if(choice==='s'){
					player.addClass('fa fa-scissors');
				}else if(choice==='lz'){
					player.addClass('fa fa-hand-lizard-o');
				}else if(choice==='sp'){
					player.addClass('fa fa-hand-spock-o');
				}
			}

			imgSet(choiceData, humanChoice);
			imgSet(compRand, computerChoice);
		}

		function roundTitleClassRemove(){
			$('.round-result').removeClass('round-win').removeClass('round-lose').removeClass('round-tie');
		}

	}

	// ROUND CHOOSE FUNCTION 
	function roundChoose(){
		rounds = parseInt($(this).attr('data-rounds'));
		$('.rounds-display-number').html(rounds).css('visibility', 'visible');

		if($('.round-choose-title').hasClass('round-choose-title-warn')){
			$('.round-choose-title').removeClass('round-choose-title-warn');
		}

		$('.start-button').addClass('start-button-animate');
	}

	// GAME START FUNCTION
	function gameStart(){
		// check if rounds var has a number
		if(rounds === undefined){
			$('.round-choose-title').addClass('round-choose-title-warn');
			return;
		}

		// make round chooser buttons, start button and rules disappear
		$('.game-start-area').fadeOut(500);
		// make game elements appear (wrap them all in a giant div to make it appear, same as gamestart screen)
		$('.game-area').fadeIn(500);
		// Allow game buttons to work
		$('.choice-button').on('click', chooser);
	}

	// ROUND LIMITER FUNCTION
	function roundIncrementer(){
		// if roundCount var = rounds var, hide game elements div, show final score screen
		roundCount++;
		if(roundCount > rounds){
			$('.choice-button').off();

			$('.choice-row').fadeOut(500, function(){
				$('.final-button-area').fadeIn(600);
			});

			$('.final-button').on('click', function(){
				$('.game-area').fadeOut(600,function(){
					$('.game-finish-area').fadeIn(1000);
				});
			});
				
			winnerAnnounce();
		}
	}

	// FINISH SCREEN FUNCTION
	function winnerAnnounce(){
		if(userScore === compScore){
			$('.overall-winner').html('Tie.  There is no victor.');
		}else if(userScore > compScore){
			$('.overall-winner').html('You Win')
		}else{
			$('.overall-winner').html('Computer Wins');
		}

		$('.final-user-score').html(userScore);
		$('.final-comp-score').html(compScore);

		function replay(){
			userScore = 0;
			compScore = 0;
			roundCount=1;
			rounds=undefined;
			$('#user-score').html(0);
			$('#comp-score').html(0);
			$('.choice-row').css('display', 'block');
			$('.final-button-area').css('display', 'none');
			$('.start-button').removeClass('start-button-animate');
			$('.rounds-display-number').css('visibility', 'hidden');
			$('.game-finish-area').fadeOut(500,function(){
				$('.game-start-area').fadeIn(1000);
			});
		}

		$('.replay').on('click', replay);
	}

	// START SCREEN IMAGE CHANGER
	function iconChange(){
		var iconList = ['fa-hand-rock-o', 'fa-hand-paper-o', 'fa-scissors', 'fa-hand-lizard-o', 'fa-hand-spock-o'];
		var randIcon = iconList[Math.floor(Math.random()*iconList.length)];

		$('#start-screen-icons').fadeOut(1000, function() {
			$(this).removeClass().addClass('fa').addClass(randIcon).fadeIn(1000);
		});
	}

	// BOUND FUNCTIONS
	$('.round-button').on('click', roundChoose);
	$('.start-button').on('click', gameStart);

	// FUNCTIONS CALLED
	setInterval(iconChange, 3700);

});