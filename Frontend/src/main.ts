import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/utils/app.config';
import { LayoutComponent } from './app/components/layout-area/layout/layout.component';
import { interceptors } from './app/utils/Interceptors';

interceptors.listen();
bootstrapApplication(LayoutComponent, appConfig)
    .catch((err) => console.error(err));
