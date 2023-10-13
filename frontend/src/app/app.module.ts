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
	heroBolt, heroRectangleGroup, heroPlayCircle, heroMagnifyingGlass,
	heroNewspaper
} from '@ng-icons/heroicons/outline'
import {
	heroArrowRightOnRectangleMini,
	heroIdentificationMini
} from '@ng-icons/heroicons/mini'
import {
	matHomeOutline, matChevronRightOutline, matNewspaperOutline
} from '@ng-icons/material-icons/outline'
import {
	simpleOpenstreetmap, simpleSoundcharts, simpleDiscord
} from '@ng-icons/simple-icons'
import {
	iconoirHomeSimpleDoor, iconoirHomeSimple
} from '@ng-icons/iconoir'
import {
	tablerCalendarTime, tablerSquareRoundedArrowRight
} from '@ng-icons/tabler-icons'

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
			heroBolt, iconoirHomeSimple, heroArrowRightOnRectangleMini, simpleDiscord, heroMagnifyingGlass,
			matHomeOutline, matChevronRightOutline, heroPlayCircle, matNewspaperOutline, tablerSquareRoundedArrowRight,
			iconoirHomeSimpleDoor, simpleSoundcharts, heroNewspaper, heroIdentificationMini, simpleOpenstreetmap, tablerCalendarTime
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
