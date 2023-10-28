import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { AnilistService } from 'src/app/services/anilist/anilist.service'
import { BackendService } from 'src/app/services/backend/backend.service'
import { ScraperService } from 'src/app/services/scraper/scraper.service'
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service'

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.css']
})
export class WatchComponent {

	constructor(
		private sharedView: SharedviewService,
		private route: ActivatedRoute,
		private scaper: ScraperService,
		private sanitizer: DomSanitizer,
		private server: BackendService
	) {
		this.dataMethods = AnilistService.fetcher()
		window.addEventListener("resize", () => {
			this.setEpisodesHeight()
		})
		this.date = (year: number, month: number, day: number) => {
			let p: any = new Date(year, month - 1, day)
			let dateExtention = 'th', date = p.getDate()
			if (date < 11 || 13 < date) {
				if (date % 10 == 1) {
					dateExtention = 'st'
				} else if (date % 10 == 2) {
					dateExtention = 'nd'
				} else if (date % 10 == 3) {
					dateExtention = 'rd'
				}
			}
			return date + dateExtention + ' ' + p.toString().slice(4, 7) + ', ' + p.getFullYear()
		}
	}

	params: any = null
	dataMethods: any = {}
	episode: number = 1
	item: any = null
	episodeLink: any = null
	date: any = null

	airedUpto: number = 0
	episodeNo: any = ''
	episodes: any = []
	episodeOrder: string = 'ASCENDING'

	setEpisodesHeight() {
		const minHeight = 440
		let height = document.getElementById('player')?.clientHeight || minHeight
		height = Math.max(minHeight, height)
		const episodes = document.getElementById('episodes')
		if (episodes) {
			episodes.setAttribute('style', `height: ${height - 80}px`)
		}
	}

	debounce: any = null
	filterEpisodes() {
		if (this.debounce) {
			clearInterval(this.debounce)
		}
		this.debounce = setTimeout(() => {
			if (this.episodeNo) {
				this.episodeNo += ''
				this.episodes = new Array(this.airedUpto)
					.fill(0)
					.map((_: any, i) => (i + 1) + '')
					.filter((x: String) => x.startsWith(this.episodeNo))
			} else {
				this.episodes = new Array(this.airedUpto)
					.fill(0)
					.map((_: any, i) => i + 1)
			}
			if (this.episodeOrder === 'DESCENDING') {
				this.episodes.reverse()
			}
			this.debounce = null
		}, 200)
	}

	prevEpisode() {
		if (this.episode <= 1) {
			this.episode = 1
			return
		}
		this.episode -= 1
		this.sharedView.episode = this.episode
		this.fetchData()
	}

	nextEpisode() {
		if (this.airedUpto <= this.episode) {
			this.episode = this.airedUpto
			return
		}
		this.episode += 1
		this.sharedView.episode = this.episode
		this.fetchData()
	}

	setEpisode(episode: number) {
		if (episode < 1) {
			this.episode = 1
			return
		}
		if (this.item.episodes && this.item.episodes <= episode) {
			this.episode = this.item.episodes
			return
		}
		if (this.item.nextAiringEpisode) {
			episode = Math.min(episode, this.item.nextAiringEpisode.episode - 1)
			this.episode = episode
		}
		this.fetchData()
	}

	setPageData: any = {
		watch: (data: any) => {
			this.item = data
			this.airedUpto = (data.nextAiringEpisode?.episode || 0) - 1
			if (this.airedUpto == -1) {
				this.airedUpto = data.episodes || 0
			}
			this.filterEpisodes()
			this.episodeLink = null
			this.server.get(`/api/anime/${this.params?.id}/${this.episode}`, {}).subscribe((data: any) => {
				let romaji: string = this.item.title.romaji?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
				let uuid: string = (data.uuid || romaji) + '-episode-' + this.episode
				if (data?.linkURL?.link) {
					this.episodeLink = {
						link: this.sanitizer.bypassSecurityTrustResourceUrl(data.linkURL.link),
						status: data.linkURL.status || 200
					}
					return
				}
				this.scaper.scrape(uuid, (urlData: any) => {
					this.episodeLink = {
						"link": this.sanitizer.bypassSecurityTrustResourceUrl(urlData.link),
						"status": 200
					}
				})
			})

		}
	}

	fetchData() {
		this.item = null
		this.dataMethods.get('watch', { id: this.params.id }, (data: any) => {
			this.setPageData.watch(data)
		})
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['watch']
		})
		this.params = this.route.snapshot.queryParams
		this.episode = this.sharedView.episode
		this.fetchData()
		this.setEpisodesHeight()
	}

}
