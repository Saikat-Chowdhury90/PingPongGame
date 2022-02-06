let gameState = 'start';
	let player_1 = document.querySelector('.player-1');
	let player_2 = document.querySelector('.player-2');
	let board = document.querySelector('.board');
	let initial_ball = document.querySelector('.ball');
	let ball = document.querySelector('.ball');
	let score_1 = document.querySelector('.player_1_score');
	let score_2 = document.querySelector('.player_2_score');
	let message = document.querySelector('.message');
	let player_1_coord = player_1.getBoundingClientRect();
	let player_2_coord = player_2.getBoundingClientRect();
	let initial_ball_coord = ball.getBoundingClientRect();
	let ball_coord = initial_ball_coord;
	let board_coord = board.getBoundingClientRect();
	let player_common =
		document.querySelector('.player').getBoundingClientRect();
	let dx = Math.floor(Math.random() * 4) + 3;
	let dy = Math.floor(Math.random() * 4) + 3;
	let dxd = Math.floor(Math.random() * 2);
	let dyd = Math.floor(Math.random() * 2);

	document.addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
    console.log(e.key);
		gameState = gameState == 'start' ? 'play' : 'end';
		if(gameState == 'end')
		{
			
			window.alert('Press Enter To Start Again');
			message.style.left = 42 + 'vw';
			ball_coord = initial_ball_coord;
			ball.style = initial_ball.style;
			score_2.innerHTML = 0 ;
		    score_1.innerHTML = 0;

			gameState = 'play';
		}
		if (gameState == 'play') {
		message.innerHTML = 'Game Started';
		message.style.left = 42 + 'vw';

		
		requestAnimationFrame(() => {
			dx = Math.floor(Math.random() * 4) + 3;
			dy = Math.floor(Math.random() * 4) + 3;
			dxd = Math.floor(Math.random() * 2);
			dyd = Math.floor(Math.random() * 2);
			moveBall(dx, dy, dxd, dyd);
		});
		}
	}
	if (gameState == 'play') {
		if (e.key == 'w') {
		player_1.style.top =
			Math.max(
			board_coord.top,
			player_1_coord.top - window.innerHeight * 0.06
			) + 'px';
		player_1_coord = player_1.getBoundingClientRect();
		}
		if (e.key == 's') {
		player_1.style.top =
			Math.min(
			board_coord.bottom - player_common.height,
			player_1_coord.top + window.innerHeight * 0.06
			) + 'px';
		player_1_coord = player_1.getBoundingClientRect();
		}

		if (e.key == 'ArrowUp') {
		player_2.style.top =
			Math.max(
			board_coord.top,
			player_2_coord.top - window.innerHeight * 0.1
			) + 'px';
		player_2_coord = player_2.getBoundingClientRect();
		}
		if (e.key == 'ArrowDown') {
		player_2.style.top =
			Math.min(
			board_coord.bottom - player_common.height,
			player_2_coord.top + window.innerHeight * 0.1
			) + 'px';
		player_2_coord = player_2.getBoundingClientRect();
		}
	}
	});

	function moveBall(dx, dy, dxd, dyd) {
	if (ball_coord.top <= board_coord.top) {
		dyd = 1;
	}
	if (ball_coord.bottom >= board_coord.bottom) {
		dyd = 0;
	}
	if (
		ball_coord.left <= player_1_coord.right &&
		ball_coord.top >= player_1_coord.top &&
		ball_coord.bottom <= player_1_coord.bottom
	) {
		dxd = 1;
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
	}
	if (
		ball_coord.right >= player_2_coord.left &&
		ball_coord.top >= player_2_coord.top &&
		ball_coord.bottom <= player_2_coord.bottom
	) {
		dxd = 0;
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
	}
	if (
		ball_coord.left <= board_coord.left ||
		ball_coord.right >= board_coord.right
	) {
		if (ball_coord.left <= board_coord.left) {
		score_2.innerHTML = +score_2.innerHTML + 1;
		} else {
		score_1.innerHTML = +score_1.innerHTML + 1;
		}
		if(score_2.innerHTML == 5 || score_1.innerHTML == 5)
		{
			gameState = 'end';
			if(score_2.innerHTML == 5)
			{
				ball_coord = initial_ball_coord;
				ball.style = initial_ball.style;
				message.innerHTML = 'Player_2 wins';
				message.style.left = 38 + 'vw';
				
			}
			if(score_1.innerHTML == 5)
			{
				ball_coord = initial_ball_coord;
				ball.style = initial_ball.style;
				message.innerHTML = 'Player_1 wins';
				message.style.left = 38 + 'vw';
			
			}
		
			return;

		}
		gameState = 'start';

		ball_coord = initial_ball_coord;
		ball.style = initial_ball.style;
		message.innerHTML = 'Start The Battle';
		message.style.left = 38 + 'vw';
		return;
	}
	ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
	ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
	ball_coord = ball.getBoundingClientRect();
	requestAnimationFrame(() => {
		moveBall(dx, dy, dxd, dyd);
	});
	}