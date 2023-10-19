import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { TrendingComponent } from './pages/trending/trending.component'
import { RecentComponent } from './pages/recent/recent.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SearchComponent } from './pages/search/search.component'
import { DetailsComponent } from './pages/details/details.component'
import { WatchComponent } from './pages/watch/watch.component'

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'trending',
		component: TrendingComponent
	},
	{
		path: 'recent',
		component: RecentComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'details',
		component: DetailsComponent
	},
	{
		path: 'watch',
		component: WatchComponent
	},
	{
		path: '**',
		redirectTo: 'home'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
