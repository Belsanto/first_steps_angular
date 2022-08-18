import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { NotFoundComponent } from './../not-found/not-found.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
   {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    canActivate: [ AuthGuard, AdminGuard ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
