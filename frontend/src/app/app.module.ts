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
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'

import { CountdownComponent } from './components/countdown/countdown.component'
import { DigitalclockComponent } from './components/digitalclock/digitalclock.component'
import { FooterComponent } from './components/footer/footer.component'
import { LoaderComponent } from './components/loader/loader.component'
import { SnakegameComponent } from './components/snakegame/snakegame.component'

import {
	heroBolt, heroPlayCircle, heroMagnifyingGlass, heroXMark, heroNewspaper, heroPlus,
	heroMagnifyingGlassCircle, heroSwatch, heroChevronRight, heroChevronLeft, heroFunnel,
	heroArrowSmallRight
} from '@ng-icons/heroicons/outline'
import {
	heroCalendarDaysSolid
} from '@ng-icons/heroicons/solid'
import {
	heroIdentificationMini
} from '@ng-icons/heroicons/mini'
import {
	matHomeOutline, matChevronRightOutline, matRestartAltOutline, matLogInOutline, matLogoutOutline
} from '@ng-icons/material-icons/outline'
import {
	simpleOpenstreetmap, simpleSoundcharts, simpleDiscord, simpleTelegram, simpleIonic, simpleLaunchpad
} from '@ng-icons/simple-icons'
import {
	iconoirHomeSimpleDoor, iconoirHomeSimple
} from '@ng-icons/iconoir'
import {
	tablerCalendarTime, tablerSquareRoundedArrowRight, tablerSquareRoundedChevronsRight, tablerSquareRoundedChevronsLeft,
	tablerCircleDashed, tablerTransitionRight, tablerPointFilled, tablerHeartFilled, tablerArrowBigUpLine, tablerCalendarDown,
	tablerCalendarUp
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
		SnakegameComponent,
		DigitalclockComponent,
		LoginComponent,
		SignupComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgIconsModule.withIcons({
			heroBolt, iconoirHomeSimple, matLogInOutline, simpleDiscord, heroMagnifyingGlass,
			heroSwatch, matHomeOutline, matChevronRightOutline, heroPlayCircle, tablerSquareRoundedArrowRight,
			tablerSquareRoundedChevronsRight, tablerSquareRoundedChevronsLeft, tablerCircleDashed, heroPlus,
			heroMagnifyingGlassCircle, heroXMark, tablerTransitionRight, heroChevronRight, heroChevronLeft,
			tablerPointFilled, tablerHeartFilled, heroFunnel, heroArrowSmallRight, simpleTelegram, simpleIonic,
			simpleLaunchpad, matRestartAltOutline, tablerArrowBigUpLine, matLogoutOutline, iconoirHomeSimpleDoor,
			tablerCalendarDown, tablerCalendarUp, heroCalendarDaysSolid,
			simpleSoundcharts, heroNewspaper, heroIdentificationMini, simpleOpenstreetmap, tablerCalendarTime
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
