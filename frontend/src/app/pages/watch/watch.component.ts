import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AnilistService } from 'src/app/services/anilist/anilist.service'
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service'

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.css']
})
export class WatchComponent {

	constructor(
		private sharedView: SharedviewService,
		private route: ActivatedRoute
	) { 
		this.dataMethods = AnilistService.fetcher()
	}

	params: any = null
	dataMethods: any = {}
	episode: number = 1
	item: any = null

	prevEpisode() {
		if (this.episode <= 1) {
			this.episode = 1
			return
		}
		this.episode -= 1
		this.sharedView.episode = this.episode
	}

	nextEpisode() {
		if (this.item.episodes && this.item.episodes <= this.episode) {
			this.episode = this.item.episodes
			return
		}
		if (this.item.nextAiringEpisode && this.item.nextAiringEpisode.episode - 1 <= this.episode) {
			this.episode = this.item.nextAiringEpisode.episode - 1
			return
		}
		this.episode += 1
		this.sharedView.episode = this.episode
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
	}

	setPageData: any = {
		watch: (data: any) => {
			this.item = data
			console.log(this.item)
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
	}

}
