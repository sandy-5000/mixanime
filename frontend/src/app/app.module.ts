import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { NgIconsModule } from '@ng-icons/core'
import { LayoutComponent } from './layout/layout.component'
import { TrendingComponent } from './trending/trending.component'
import { RecentComponent } from './recent/recent.component'
import { SearchComponent } from './search/search.component'
import { ProfileComponent } from './profile/profile.component'

import {
	heroBolt, heroSquares2x2, heroShare, heroMagnifyingGlassCircle,
	heroHome, heroNewspaper, heroCalendarDays
} from '@ng-icons/heroicons/outline'
import {
	heroArrowRightOnRectangleMini,
	heroPresentationChartBarMini, heroIdentificationMini
} from '@ng-icons/heroicons/mini'
import {
	matHomeOutline, matMapOutline, matPlayCircleOutline, matChevronRightOutline
} from '@ng-icons/material-icons/outline'


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LayoutComponent,
		TrendingComponent,
		RecentComponent,
		SearchComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgIconsModule.withIcons({
			heroBolt, heroSquares2x2, heroArrowRightOnRectangleMini, heroShare, heroMagnifyingGlassCircle,
			matPlayCircleOutline, matHomeOutline, matChevronRightOutline,
			heroHome, heroPresentationChartBarMini, heroNewspaper, heroIdentificationMini, matMapOutline, heroCalendarDays
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
