import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgIconsModule } from '@ng-icons/core'

import { LayoutComponent } from './layout/layout.component'

import { HomeComponent } from './pages/home/home.component'
import { TrendingComponent } from './pages/trending/trending.component'
import { RecentComponent } from './pages/recent/recent.component'
import { SearchComponent } from './pages/search/search.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { DetailsComponent } from './pages/details/details.component'

import { LoaderComponent } from './components/loader/loader.component'
import { FooterComponent } from './components/footer/footer.component'
import { CountdownComponent } from './components/countdown/countdown.component'

import {
	heroBolt, heroPlayCircle, heroMagnifyingGlass, heroXMark, heroNewspaper,
	heroMagnifyingGlassCircle, heroSwatch, heroChevronRight, heroChevronLeft
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
	tablerCircleDashed, tablerTransitionRight, tablerCaretRight, tablerCaretLeft
} from '@ng-icons/tabler-icons'
import { FormsModule } from '@angular/forms';


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
		DetailsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		NgIconsModule.withIcons({
			heroBolt, iconoirHomeSimple, heroArrowRightOnRectangleMini, simpleDiscord, heroMagnifyingGlass,
			heroSwatch, matHomeOutline, matChevronRightOutline, heroPlayCircle, tablerSquareRoundedArrowRight,
			tablerSquareRoundedChevronsRight, tablerSquareRoundedChevronsLeft, tablerCircleDashed,
			heroMagnifyingGlassCircle, heroXMark, tablerTransitionRight, heroChevronRight, heroChevronLeft,
			iconoirHomeSimpleDoor, simpleSoundcharts, heroNewspaper, heroIdentificationMini, simpleOpenstreetmap, tablerCalendarTime
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
