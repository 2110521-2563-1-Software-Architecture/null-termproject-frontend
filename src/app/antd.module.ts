// see https://stackblitz.com/edit/ng-zorro-antd-ivy?file=src%2Fapp%2Fng-zorro-antd.module.ts
import { NgModule } from "@angular/core";

// add more antd modules below
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  exports: [
    NzButtonModule,
    NzMenuModule,
    NzFormModule,
    NzIconModule
  ]
})
export class AntdModule {}