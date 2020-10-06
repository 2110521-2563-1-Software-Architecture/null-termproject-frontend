// see https://stackblitz.com/edit/ng-zorro-antd-ivy?file=src%2Fapp%2Fng-zorro-antd.module.ts
import { NgModule } from "@angular/core";

// add more antd modules below
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  exports: [
    NzButtonModule,
  ]
})
export class AntdModule {}