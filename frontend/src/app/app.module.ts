import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { NgIconsModule } from '@ng-icons/core'
import { LayoutComponent } from './layout/layout.component'
import { TrendingComponent } from './trending/trending.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';

import {
	heroBolt, heroSquares2x2, heroArrowRightOnRectangle, heroShare, heroMagnifyingGlassCircle,
	heroHomeModern, heroPresentationChartLine, heroTicket, heroIdentification, heroCubeTransparent, heroCalendarDays
} from '@ng-icons/heroicons/outline';


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
			heroBolt, heroSquares2x2, heroArrowRightOnRectangle, heroShare, heroMagnifyingGlassCircle,
			heroHomeModern, heroPresentationChartLine, heroTicket, heroIdentification, heroCubeTransparent, heroCalendarDays
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
