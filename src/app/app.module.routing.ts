import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatComponent } from './views/chat/chat.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserComponent } from './views/user/user.component';

@NgModule({
  declarations: [ 
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot([
        { 
            path: 'user', 
            component: UserComponent 
        },
        { 
            path: 'page-not-found', 
            component: PageNotFoundComponent 
        },
        { 
            path: '**', 
            redirectTo: 'page-not-found' 
        }
    ])
  ],
  exports: [ RouterModule ],
  providers: [],

})
export class AppRoutingModule {}


