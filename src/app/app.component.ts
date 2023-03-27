import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'varivas-frontend';
  deviceInfo: any = null;
  isMobile: boolean = false;

  getDeviceType() {
    this.isMobile = this.deviceService.isMobile();
  }

  constructor(private deviceService: DeviceDetectorService) {
    this.getDeviceType();
  }
}
