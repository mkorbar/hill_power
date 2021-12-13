import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hill_power';

  hillGrade: FormControl;
  weight: FormControl;
  cda: FormControl;
  speedKmh: FormControl;
  torque: FormControl;

  speed = 0;

  row: any;

  climb = 0;
  power = 0;
  aero_drag = 0;
  roll_drag = 0;
  total_power = 0;
  rpm = 0;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.hillGrade = this.formBuilder.control(5);
    this.weight = this.formBuilder.control(1450);
    this.cda = this.formBuilder.control(0.6);
    this.speedKmh = this.formBuilder.control(50);
    this.torque = this.formBuilder.control(140);

    this.hillGrade.valueChanges.subscribe(() => {
      this.recalculate();
    });
    this.weight.valueChanges.subscribe(() => {
      this.recalculate();
    });
    this.cda.valueChanges.subscribe(() => {
      this.recalculate();
    });
    this.speedKmh.valueChanges.subscribe(() => {
      this.recalculate();
    });
    this.torque.valueChanges.subscribe(() => {
      this.recalculate();
    });

    this.recalculate();
  }

  recalculate() {
    // console.log('recalculating');

    this.speed = this.speedKmh.value / 3.6;

    this.climb = this.speed * this.hillGrade.value / 100;
    this.power = this.climb * this.weight.value * 9.81;
    this.aero_drag = 0.5 * 1.225 * Math.pow(this.speed, 3) * this.cda.value;
    this.roll_drag = 137 * this.speed;
    this.total_power = this.power + this.aero_drag + this.roll_drag;
    this.rpm = this.total_power / this.torque.value * 9.54;
  }

}
