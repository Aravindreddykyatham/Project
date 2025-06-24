import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DecimalPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  city: string = '';
  temperature: number = 0;
  humedity: number = 0;
  weather: string = '';
  query: boolean = false;
  error: boolean = false;

  constructor(private weatherService: WeatherService) {

  }

  getWeather() {

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.query = true
        this.temperature = data.main.temp - 272;
        this.humedity = data.main.humidity;
        this.weather = data.weather[0].main;
      },
      error: (e) => {
        this.error = true;
        this.city = '';

        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    })
  }



}
