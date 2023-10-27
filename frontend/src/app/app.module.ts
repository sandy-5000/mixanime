import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgIconsModule } from '@ng-icons/core'
import { FormsModule } from '@angular/forms'

import { LayoutComponent } from './layout/layout.component'

import { HomeComponent } from './pages/home/home.component'
import { TrendingComponent } from './pages/trending/trending.component'
import { RecentComponent } from './pages/recent/recent.component'
import { SearchComponent } from './pages/search/search.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { ScheduleComponent } from './pages/schedule/schedule.component'
import { DetailsComponent } from './pages/details/details.component'
import { WatchComponent } from './pages/watch/watch.component'

import { LoaderComponent } from './components/loader/loader.component'
import { FooterComponent } from './components/footer/footer.component'
import { CountdownComponent } from './components/countdown/countdown.component'
import { SnakegameComponent } from './components/snakegame/snakegame.component'

import {
	heroBolt, heroPlayCircle, heroMagnifyingGlass, heroXMark, heroNewspaper, heroPlus,
	heroMagnifyingGlassCircle, heroSwatch, heroChevronRight, heroChevronLeft, heroFunnel,
	heroArrowSmallRight
} from '@ng-icons/heroicons/outline'
import {
	heroArrowRightOnRectangleMini,
	heroIdentificationMini
} from '@ng-icons/heroicons/mini'
import {
	matHomeOutline, matChevronRightOutline
} from '@ng-icons/material-icons/outline'
import {
	simpleOpenstreetmap, simpleSoundcharts, simpleDiscord
} from '@ng-icons/simple-icons'
import {
	iconoirHomeSimpleDoor, iconoirHomeSimple
} from '@ng-icons/iconoir'
import {
	tablerCalendarTime, tablerSquareRoundedArrowRight, tablerSquareRoundedChevronsRight, tablerSquareRoundedChevronsLeft,
	tablerCircleDashed, tablerTransitionRight, tablerPointFilled, tablerHeartFilled
} from '@ng-icons/tabler-icons'


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LayoutComponent,
		TrendingComponent,
		RecentComponent,
		SearchComponent,
		ProfileComponent,
		LoaderComponent,
		FooterComponent,
		CountdownComponent,
		DetailsComponent,
		WatchComponent,
		ScheduleComponent,
		SnakegameComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgIconsModule.withIcons({
			heroBolt, iconoirHomeSimple, heroArrowRightOnRectangleMini, simpleDiscord, heroMagnifyingGlass,
			heroSwatch, matHomeOutline, matChevronRightOutline, heroPlayCircle, tablerSquareRoundedArrowRight,
			tablerSquareRoundedChevronsRight, tablerSquareRoundedChevronsLeft, tablerCircleDashed, heroPlus,
			heroMagnifyingGlassCircle, heroXMark, tablerTransitionRight, heroChevronRight, heroChevronLeft,
			tablerPointFilled, tablerHeartFilled, heroFunnel, heroArrowSmallRight,
			iconoirHomeSimpleDoor, simpleSoundcharts, heroNewspaper, heroIdentificationMini, simpleOpenstreetmap, tablerCalendarTime
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
