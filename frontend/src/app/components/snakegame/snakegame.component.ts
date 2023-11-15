import { Component } from '@angular/core';

@Component({
	selector: 'app-snakegame',
	templateUrl: './snakegame.component.html',
	styleUrls: ['./snakegame.component.css']
})
export class SnakegameComponent {

	constructor() { }

	ngOnInit(): void {
	}

	init() {
		let gameDetails = {
			started: false
		}
		return () => {
			if (gameDetails.started) {
				return
			}
			this.startGame(gameDetails)
		}
	}

	start = this.init()

	startGame(gameDetails: any) {

		gameDetails.started = true
		const playBoard: any = document.querySelector('.play-board')
		const scoreElement: any = document.querySelector('.score')
		const highScoreElement: any = document.querySelector('.high-score')
		const controls: any = document.querySelectorAll('.controls')
		const gameMessage: any = document.querySelector('.game-message')

		let gameOver: boolean = false
		let foodX: any = null
		let foodY: any = null
		let snakeX: number = 5
		let snakeY: number = 5

		let velocityX = 1
		let velocityY = 0

		let snakeBody: any = []
		let setIntervalId: any = null
		let score: number = 0

		let highScore: number = parseInt(localStorage.getItem('high-score') || '0')

		highScoreElement.innerHTML = `High Score: ${highScore}`
		gameMessage.innerText = ''

		const handleGameOver = () => {
			controls.forEach((element: any) => {
				element.removeEventListener('click', controlEvent)
			})
			gameDetails.started = false
			clearInterval(setIntervalId)
			gameMessage.innerText = 'KO!'
			console.log('Game Over! Press \'start\' to replay...')
		}

		const changeDirection = (e: any) => {
			if (e.preventDefault && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1 && !gameOver) {
				e.preventDefault()
			}
			if (e.key === 'ArrowUp' && velocityY != 1) {
				velocityX = 0
				velocityY = -1
			} else if (e.key === 'ArrowDown' && velocityY != -1) {
				velocityX = 0
				velocityY = 1
			} else if (e.key === 'ArrowLeft' && velocityX != 1) {
				velocityX = -1
				velocityY = 0
			} else if (e.key === 'ArrowRight' && velocityX != -1) {
				velocityX = 1
				velocityY = 0
			}
		}

		const controlEvent = (e: any) => {
			const key = e.target.getAttribute('key')
			changeDirection({ key })
		}

		controls.forEach((element: any) => {
			element.addEventListener('click', controlEvent)
		})

		const updateFoodPosition = () => {
			foodX = Math.floor(Math.random() * 50) + 1
			foodY = Math.floor(Math.random() * 30) + 1
		}


		const initGame = () => {
			if (gameOver) {
				return handleGameOver()
			}
			let html = `<div class="bg-[#ff4982] lg:rounded-md md:rounded-md rounded-sm" style="grid-area: ${foodY} / ${foodX}"></div>`
			if (snakeX === foodX && snakeY === foodY) {
				updateFoodPosition()
				snakeBody.push([foodY, foodX])
				score++
				highScore = score >= highScore ? score : highScore
				localStorage.setItem('high-score', highScore + '')
				scoreElement.innerText = `Score: ${score}`
				highScoreElement.innerText = `High Score: ${highScore}`
			}

			snakeX += velocityX
			snakeY += velocityY

			for (let i = snakeBody.length - 1; i > 0; i--) {
				snakeBody[i] = snakeBody[i - 1]
			}
			snakeBody[0] = [snakeX, snakeY]
			if (snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 30) {
				return gameOver = true
			}
			for (let i = 0; i < snakeBody.length; i++) {
				html += `<div class="bg-[#60ffd5] lg:rounded-md md:rounded-md rounded-sm" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
				if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
					gameOver = true
				}
			}
			playBoard.innerHTML = html
		}

		updateFoodPosition()
		setIntervalId = setInterval(() => {
			initGame()
		}, 120)
		document.addEventListener('keydown', changeDirection)

	}

}
